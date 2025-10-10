import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestPayload {
  paymentId: string;
  paymentProofUrl: string;
  paymentMethod: string;
  email: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const payload: RequestPayload = await req.json();
    const { paymentId, paymentProofUrl, paymentMethod, email } = payload;

    const approvalToken = crypto.randomUUID();
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

    const { createClient } = await import("npm:@supabase/supabase-js@2");
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: payment, error: fetchError } = await supabase
      .from("payments")
      .select("*")
      .eq("id", paymentId)
      .single();

    if (fetchError) throw fetchError;

    const { error: updateError } = await supabase
      .from("payments")
      .update({ approval_token: approvalToken })
      .eq("id", paymentId);

    if (updateError) throw updateError;

    const approvalUrl = `${supabaseUrl}/functions/v1/approve-payment?token=${approvalToken}`;

    const paymentType = payment.payment_type === "job_application" ? "Job Application" : "Hiring Request";
    const amount = `KES ${payment.amount_kes.toLocaleString()}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border: 1px solid #e5e7eb;
            }
            .payment-details {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #667eea;
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
            .label {
              font-weight: 600;
              color: #6b7280;
            }
            .value {
              color: #111827;
            }
            .approve-button {
              display: inline-block;
              background: #10b981;
              color: white;
              padding: 16px 40px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              margin: 20px 0;
              text-align: center;
            }
            .approve-button:hover {
              background: #059669;
            }
            .proof-image {
              margin: 20px 0;
              text-align: center;
            }
            .proof-image img {
              max-width: 100%;
              border-radius: 8px;
              border: 2px solid #e5e7eb;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #6b7280;
              font-size: 14px;
            }
            .warning {
              background: #fef3c7;
              border-left: 4px solid #f59e0b;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>New Payment Proof Submitted</h1>
            <p style="margin: 0; opacity: 0.9;">Review and Approve Payment</p>
          </div>

          <div class="content">
            <p>Hello Joshua,</p>
            <p>A new payment proof has been submitted for review:</p>

            <div class="payment-details">
              <h3 style="margin-top: 0; color: #667eea;">Payment Details</h3>
              <div class="detail-row">
                <span class="label">Type:</span>
                <span class="value">${paymentType}</span>
              </div>
              <div class="detail-row">
                <span class="label">Amount:</span>
                <span class="value">${amount}</span>
              </div>
              <div class="detail-row">
                <span class="label">Payment Method:</span>
                <span class="value">${paymentMethod === 'mpesa' ? 'M-Pesa (+254 715957054)' : 'Bank Transfer (Equity 0286265672)'}</span>
              </div>
              <div class="detail-row">
                <span class="label">Customer Email:</span>
                <span class="value">${email}</span>
              </div>
              <div class="detail-row">
                <span class="label">Payment ID:</span>
                <span class="value">${paymentId}</span>
              </div>
            </div>

            <div class="proof-image">
              <p><strong>Payment Proof:</strong></p>
              <a href="${paymentProofUrl}" target="_blank">
                <img src="${paymentProofUrl}" alt="Payment Proof" />
              </a>
              <p style="font-size: 12px; color: #6b7280;">Click image to view full size</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${approvalUrl}" class="approve-button">
                ✓ APPROVE & SUBMIT APPLICATION
              </a>
            </div>

            <div class="warning">
              <strong>⚠️ Important:</strong> Clicking the approve button will:
              <ul style="margin: 10px 0;">
                <li>Mark the payment as completed</li>
                <li>Automatically submit the application to your email</li>
                <li>Notify the customer of approval</li>
              </ul>
            </div>

            <p style="font-size: 14px; color: #6b7280;">
              You can also review this payment in the admin dashboard:<br>
              <a href="https://your-app-url.com/admin/payments">Admin Dashboard</a>
            </p>
          </div>

          <div class="footer">
            <p>This is an automated notification from Coshikowa Agency</p>
            <p style="font-size: 12px; margin-top: 10px;">
              If you did not expect this email, please contact support immediately.
            </p>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Coshikowa Agency <onboarding@resend.dev>",
        to: ["sulaite256@gmail.com"],
        subject: `New Payment Proof - ${paymentType} (${amount})`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Email failed: ${errorData}`);
    }

    const emailResult = await emailResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment proof notification sent",
        emailId: emailResult.id,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: unknown) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});