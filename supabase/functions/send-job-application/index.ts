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
      <h1>New Job Application</h1>
      
      <h2>Personal Information</h2>
      <p><strong>Full Name:</strong> ${applicationData.fullName}</p>
      <p><strong>Email:</strong> ${applicationData.email}</p>
      <p><strong>Phone:</strong> ${applicationData.phone}</p>
      ${applicationData.location ? `<p><strong>Location:</strong> ${applicationData.location}</p>` : ''}
      ${applicationData.dateOfBirth ? `<p><strong>Date of Birth:</strong> ${applicationData.dateOfBirth}</p>` : ''}
      
      <h2>Professional Background</h2>
      ${applicationData.education ? `<p><strong>Education:</strong> ${applicationData.education}</p>` : ''}
      ${applicationData.experience ? `<p><strong>Experience:</strong> ${applicationData.experience}</p>` : ''}
      ${applicationData.skills ? `<p><strong>Skills:</strong> ${applicationData.skills}</p>` : ''}
      
      <h2>Job Preferences</h2>
      <p><strong>Desired Position:</strong> ${applicationData.desiredPosition}</p>
      ${applicationData.salary ? `<p><strong>Expected Salary:</strong> KSH ${applicationData.salary}</p>` : ''}
      ${applicationData.availability ? `<p><strong>Availability:</strong> ${applicationData.availability}</p>` : ''}
      
      ${applicationData.additionalInfo ? `
        <h2>Additional Information</h2>
        <p>${applicationData.additionalInfo}</p>
      ` : ''}
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
          <h1>Thank you for your application, ${applicationData.fullName}!</h1>
          <p>We have received your job application for the position of <strong>${applicationData.desiredPosition}</strong>.</p>
          <p>Our team will review your application and get back to you within 24 hours.</p>
          <p>Best regards,<br>Coshikowa Agency Team</p>
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
  } catch (error: any) {
    console.error("Error in send-job-application function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

Deno.serve(handler);