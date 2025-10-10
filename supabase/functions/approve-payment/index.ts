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
    const frontendUrl = Deno.env.get("FRONTEND_URL") || "https://coshikowa.netlify.app";

    if (!token) {
      return new Response(null, {
        status: 302,
        headers: {
          "Location": `${frontendUrl}/approval-success?error=no-token`,
        },
      });
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
      return new Response(null, {
        status: 302,
        headers: {
          "Location": `${frontendUrl}/approval-success?token=${token}`,
        },
      });
    }

    if (payment.payment_status === "completed") {
      return new Response(null, {
        status: 302,
        headers: {
          "Location": `${frontendUrl}/approval-success?token=${token}`,
        },
      });
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
          <div class=\"header\">
            <h1>✓ Payment Approved</h1>
          </div>
          <div class=\"content\">
            <p>Hello,</p>
            <div class=\"success-box\">
              <h3 style=\"margin-top: 0; color: #059669;\">Your payment has been approved!</h3>
              <p style=\"margin-bottom: 0;\">Your ${payment.payment_type === "job_application" ? "job application" : "hiring request"} has been successfully submitted to our team. We'll review it and get back to you shortly.</p>
            </div>
            <p><strong>Payment Details:</strong></p>
            <ul>
              <li>Amount: KES ${payment.amount_kes.toLocaleString()}</li>
              <li>Payment Method: ${payment.payment_method === 'mpesa' ? 'M-Pesa' : 'Bank Transfer'}</li>
              <li>Status: Approved</li>
            </ul>
            <p>Thank you for choosing Coshikowa Agency!</p>
          </div>
          <div class=\"footer\">
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

    return new Response(null, {
      status: 302,
      headers: {
        "Location": `${frontendUrl}/approval-success?token=${token}`,
      },
    });
  } catch (error: unknown) {
    console.error("Error:", error);
    const frontendUrl = Deno.env.get("FRONTEND_URL") || "https://coshikowa.netlify.app";
    return new Response(null, {
      status: 302,
      headers: {
        "Location": `${frontendUrl}/approval-success?error=processing-failed`,
      },
    });
  }
});