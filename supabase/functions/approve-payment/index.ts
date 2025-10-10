import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return new Response(
        `<!DOCTYPE html>
        <html>
          <head>
            <title>Invalid Request</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f9fafb; }
              .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .error { color: #dc2626; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1 class="error">Invalid Request</h1>
              <p>No approval token provided.</p>
            </div>
          </body>
        </html>`,
        {
          status: 400,
          headers: { "Content-Type": "text/html" },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

    const { createClient } = await import("npm:@supabase/supabase-js@2");
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: payment, error: fetchError } = await supabase
      .from("payments")
      .select("*")
      .eq("approval_token", token)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (!payment) {
      return new Response(
        `<!DOCTYPE html>
        <html>
          <head>
            <title>Invalid Token</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f9fafb; }
              .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .error { color: #dc2626; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1 class="error">Invalid or Expired Token</h1>
              <p>This approval link is invalid or has already been used.</p>
            </div>
          </body>
        </html>`,
        {
          status: 404,
          headers: { "Content-Type": "text/html" },
        }
      );
    }

    if (payment.payment_status === "completed") {
      return new Response(
        `<!DOCTYPE html>
        <html>
          <head>
            <title>Already Approved</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f9fafb; }
              .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .success { color: #10b981; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1 class="success">✓ Already Approved</h1>
              <p>This payment has already been approved and processed.</p>
            </div>
          </body>
        </html>`,
        {
          status: 200,
          headers: { "Content-Type": "text/html" },
        }
      );
    }

    const { error: updateError } = await supabase
      .from("payments")
      .update({
        payment_status: "completed",
        reviewed_by: "admin_email",
        reviewed_at: new Date().toISOString(),
        completed_at: new Date().toISOString(),
        admin_notes: "Approved via email",
      })
      .eq("id", payment.id);

    if (updateError) throw updateError;

    const edgeFunctionUrl = payment.payment_type === "job_application"
      ? `${supabaseUrl}/functions/v1/send-job-application`
      : `${supabaseUrl}/functions/v1/send-hiring-request`;

    const functionResponse = await fetch(edgeFunctionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify(payment.form_data),
    });

    if (!functionResponse.ok) {
      console.error("Error calling edge function:", await functionResponse.text());
    }

    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .success-box { background: #d1fae5; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>✓ Payment Approved</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <div class="success-box">
              <h3 style="margin-top: 0; color: #059669;">Your payment has been approved!</h3>
              <p style="margin-bottom: 0;">Your ${payment.payment_type === "job_application" ? "job application" : "hiring request"} has been successfully submitted to our team. We'll review it and get back to you shortly.</p>
            </div>
            <p><strong>Payment Details:</strong></p>
            <ul>
              <li>Amount: KES ${payment.amount_kes.toLocaleString()}</li>
              <li>Payment Method: ${payment.payment_method === 'mpesa' ? 'M-Pesa' : 'Bank Transfer'}</li>
              <li>Status: Approved</li>
            </ul>
            <p>Thank you for choosing Coshikowa Agency!</p>
          </div>
          <div class="footer">
            <p>Coshikowa Agency - Your trusted recruitment partner</p>
          </div>
        </body>
      </html>
    `;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Coshikowa Agency <onboarding@resend.dev>",
        to: [payment.email],
        subject: "Payment Approved - Application Submitted",
        html: customerEmailHtml,
      }),
    }).catch((error) => {
      console.error("Error sending customer notification:", error);
    });

    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <title>Payment Approved</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 50px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0;
            }
            .container {
              max-width: 500px;
              background: white;
              padding: 50px;
              border-radius: 20px;
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            .success-icon {
              width: 80px;
              height: 80px;
              background: #10b981;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 20px;
              font-size: 50px;
              color: white;
            }
            h1 {
              color: #059669;
              margin: 20px 0;
            }
            p {
              color: #6b7280;
              line-height: 1.6;
            }
            .details {
              background: #f9fafb;
              padding: 20px;
              border-radius: 10px;
              margin: 20px 0;
              text-align: left;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success-icon">✓</div>
            <h1>Payment Approved Successfully!</h1>
            <p>The payment has been approved and the application has been submitted.</p>
            <div class="details">
              <div class="detail-row">
                <strong>Type:</strong>
                <span>${payment.payment_type === "job_application" ? "Job Application" : "Hiring Request"}</span>
              </div>
              <div class="detail-row">
                <strong>Amount:</strong>
                <span>KES ${payment.amount_kes.toLocaleString()}</span>
              </div>
              <div class="detail-row">
                <strong>Customer:</strong>
                <span>${payment.email}</span>
              </div>
            </div>
            <p style="margin-top: 30px;">
              <strong>The customer has been notified via email.</strong>
            </p>
          </div>
        </body>
      </html>`,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-cache, no-store, must-revalidate"
        },
      }
    );
  } catch (error: unknown) {
    console.error("Error:", error);
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f9fafb; }
            .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .error { color: #dc2626; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="error">Error</h1>
            <p>An error occurred while processing the approval.</p>
            <p style="color: #6b7280; font-size: 14px;">${error instanceof Error ? error.message : String(error)}</p>
          </div>
        </body>
      </html>`,
      {
        status: 500,
        headers: { "Content-Type": "text/html" },
      }
    );
  }
});