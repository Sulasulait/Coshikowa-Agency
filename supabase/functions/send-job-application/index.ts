import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const API_KEY = "re_USB4mTSP_GBpzjabwUuxzCX5Fpg6oy9XK";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface JobApplicationRequest {
  fullName: string;
  email: string;
  phone: string;
  location?: string;
  education?: string;
  experience?: string;
  skills?: string;
  desiredPosition: string;
  salary?: string;
  availability?: string;
  additionalInfo?: string;
  dateOfBirth?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const applicationData: JobApplicationRequest = await req.json();
    console.log("Deployment v2 - API Key length:", API_KEY?.length || 0);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px; background-color: #f8f9fa;">
          <img src="https://i.ibb.co/SwJPbKH/coshikowa-logo.png" alt="Coshikowa Agency" style="max-width: 200px; height: auto;" />
        </div>

        <div style="padding: 30px; background-color: white;">
          <h1 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">New Job Application</h1>

          <h2 style="color: #0284c7; margin-top: 25px;">Personal Information</h2>
          <p><strong>Full Name:</strong> ${applicationData.fullName}</p>
          <p><strong>Email:</strong> ${applicationData.email}</p>
          <p><strong>Phone:</strong> ${applicationData.phone}</p>
          ${applicationData.location ? `<p><strong>Location:</strong> ${applicationData.location}</p>` : ''}
          ${applicationData.dateOfBirth ? `<p><strong>Date of Birth:</strong> ${applicationData.dateOfBirth}</p>` : ''}

          <h2 style="color: #0284c7; margin-top: 25px;">Professional Background</h2>
          ${applicationData.education ? `<p><strong>Education:</strong> ${applicationData.education}</p>` : ''}
          ${applicationData.experience ? `<p><strong>Experience:</strong> ${applicationData.experience}</p>` : ''}
          ${applicationData.skills ? `<p><strong>Skills:</strong> ${applicationData.skills}</p>` : ''}

          <h2 style="color: #0284c7; margin-top: 25px;">Job Preferences</h2>
          <p><strong>Desired Position:</strong> ${applicationData.desiredPosition}</p>
          ${applicationData.salary ? `<p><strong>Expected Salary:</strong> KSH ${applicationData.salary}</p>` : ''}
          ${applicationData.availability ? `<p><strong>Availability:</strong> ${applicationData.availability}</p>` : ''}

          ${applicationData.additionalInfo ? `
            <h2 style="color: #0284c7; margin-top: 25px;">Additional Information</h2>
            <p>${applicationData.additionalInfo}</p>
          ` : ''}
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
        subject: `New Job Application - ${applicationData.desiredPosition}`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      throw new Error(`Failed to send email: ${error}`);
    }

    console.log("Application email sent successfully");

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        from: "Coshikowa Agency <onboarding@resend.dev>",
        to: [applicationData.email],
        subject: "Application Received - Coshikowa Agency",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; padding: 20px; background-color: #f8f9fa;">
              <img src="https://i.ibb.co/SwJPbKH/coshikowa-logo.png" alt="Coshikowa Agency" style="max-width: 200px; height: auto;" />
            </div>

            <div style="padding: 30px; background-color: white;">
              <h1 style="color: #059669;">Thank you for your application, ${applicationData.fullName}!</h1>
              <p style="font-size: 16px; line-height: 1.6;">We have received your job application for the position of <strong>${applicationData.desiredPosition}</strong>.</p>
              <p style="font-size: 16px; line-height: 1.6;">Our team will review your application and get back to you within 24 hours.</p>
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
    console.error("Error in send-job-application function:", error);
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