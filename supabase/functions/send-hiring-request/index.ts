import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const API_KEY = "re_USB4mTSP_GBpzjabwUuxzCX5Fpg6oy9XK";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface HiringRequest {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  position: string;
  requirements: string;
  urgency: string;
  jobCategory?: string;
  ageRange?: string;
  dateOfBirth?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: HiringRequest = await req.json();

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px; background-color: #f8f9fa;">
          <img src="https://i.ibb.co/SwJPbKH/coshikowa-logo.png" alt="Coshikowa Agency" style="max-width: 200px; height: auto;" />
        </div>

        <div style="padding: 30px; background-color: white;">
          <h1 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">New Hiring Request</h1>

          <h2 style="color: #0284c7; margin-top: 25px;">Company Information</h2>
          <p><strong>Company Name:</strong> ${requestData.companyName}</p>
          <p><strong>Contact Person:</strong> ${requestData.contactPerson}</p>
          <p><strong>Email:</strong> ${requestData.email}</p>
          <p><strong>Phone:</strong> ${requestData.phone}</p>

          <h2 style="color: #0284c7; margin-top: 25px;">Hiring Details</h2>
          <p><strong>Industry:</strong> ${requestData.industry}</p>
          <p><strong>Position to Fill:</strong> ${requestData.position}</p>
          <p><strong>Urgency:</strong> ${requestData.urgency}</p>
          ${requestData.ageRange ? `<p><strong>Preferred Age Range:</strong> ${requestData.ageRange}</p>` : ''}

          <h2 style="color: #0284c7; margin-top: 25px;">Requirements</h2>
          <p style="line-height: 1.6;">${requestData.requirements}</p>
        </div>

        <div style="text-align: center; padding: 20px; background-color: #f8f9fa; color: #6b7280; font-size: 12px;">
          <p>© 2025 Coshikowa Agency. All rights reserved.</p>
        </div>
      </div>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        from: "Coshikowa Agency <onboarding@resend.dev>",
        to: ["sulaite256@gmail.com"],
        subject: `New Hiring Request - ${requestData.position}`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      throw new Error(`Failed to send email: ${error}`);
    }

    console.log("Hiring request email sent successfully");

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        from: "Coshikowa Agency <onboarding@resend.dev>",
        to: [requestData.email],
        subject: "Hiring Request Received - Coshikowa Agency",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; padding: 20px; background-color: #f8f9fa;">
              <img src="https://i.ibb.co/SwJPbKH/coshikowa-logo.png" alt="Coshikowa Agency" style="max-width: 200px; height: auto;" />
            </div>

            <div style="padding: 30px; background-color: white;">
              <h1 style="color: #059669;">Thank you for your hiring request, ${requestData.contactPerson}!</h1>
              <p style="font-size: 16px; line-height: 1.6;">We have received your request to hire for the position of <strong>${requestData.position}</strong>.</p>
              <p style="font-size: 16px; line-height: 1.6;">Our team will review your requirements and get back to you within 24 hours with suitable candidates.</p>
              <p style="font-size: 16px; line-height: 1.6; margin-top: 30px;">Best regards,<br><strong>Coshikowa Agency Team</strong></p>
            </div>

            <div style="text-align: center; padding: 20px; background-color: #f8f9fa; color: #6b7280; font-size: 12px;">
              <p>© 2025 Coshikowa Agency. All rights reserved.</p>
            </div>
          </div>
        `,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in send-hiring-request function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "An error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

Deno.serve(handler);