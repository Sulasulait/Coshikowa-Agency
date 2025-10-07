const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface JobApplicationRequest {
  fullName: string;
  dateOfBirth: string;
  idNumber: string;
  email: string;
  phone: string;
  location?: string;
  education?: string;
  experience?: string;
  skills?: string;
  jobCategory: string;
  desiredPosition?: string;
  customPosition?: string;
  salary?: string;
  availability?: string;
  additionalInfo?: string;
  idDocumentUrl?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    });
  }

  try {
    const applicationData: JobApplicationRequest = await req.json();

    // Determine the actual position applied for
    const appliedPosition = applicationData.jobCategory === "Others"
      ? applicationData.customPosition
      : applicationData.desiredPosition || applicationData.jobCategory;

    // Format the email content for admin
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; border-bottom: 3px solid #4CAF50; padding-bottom: 10px;">New Job Application</h1>

        <h2 style="color: #4CAF50; margin-top: 30px;">Personal Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Full Name:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${applicationData.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date of Birth:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${applicationData.dateOfBirth}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>ID Number:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${applicationData.idNumber}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${applicationData.email}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${applicationData.phone}</td>
          </tr>
          ${applicationData.location ? `
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Location:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${applicationData.location}</td>
          </tr>
          ` : ''}
        </table>

        ${applicationData.idDocumentUrl ? `
        <div style="margin-top: 20px; padding: 15px; background-color: #e8f5e9; border-radius: 5px;">
          <p style="margin: 0;"><strong>ID Document:</strong></p>
          <a href="${applicationData.idDocumentUrl}" style="color: #4CAF50; text-decoration: none; font-weight: bold;">Download ID Document</a>
        </div>
        ` : ''}

        <h2 style="color: #4CAF50; margin-top: 30px;">Professional Background</h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${applicationData.education ? `
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Education:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${applicationData.education}</td>
          </tr>
          ` : ''}
          ${applicationData.experience ? `
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Experience:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${applicationData.experience}</td>
          </tr>
          ` : ''}
          ${applicationData.skills ? `
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Skills:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${applicationData.skills}</td>
          </tr>
          ` : ''}
        </table>

        <h2 style="color: #4CAF50; margin-top: 30px;">Job Preferences</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Job Category:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${applicationData.jobCategory}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Desired Position:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${appliedPosition}</td>
          </tr>
          ${applicationData.salary ? `
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Expected Salary:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">KSH ${applicationData.salary}</td>
          </tr>
          ` : ''}
          ${applicationData.availability ? `
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Availability:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${applicationData.availability}</td>
          </tr>
          ` : ''}
        </table>

        ${applicationData.additionalInfo ? `
          <h2 style="color: #4CAF50; margin-top: 30px;">Additional Information</h2>
          <div style="padding: 15px; background-color: #f5f5f5; border-left: 4px solid #4CAF50;">
            <p style="margin: 0;">${applicationData.additionalInfo}</p>
          </div>
        ` : ''}
      </div>
    `;

    // Send email to employer
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Coshikowa Agency <onboarding@resend.dev>",
        to: ["sulaite256@gmail.com"],
        subject: `New Job Application - ${appliedPosition} - ${applicationData.fullName}`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error("Failed to send email to employer:", error);
      throw new Error("Failed to send email to employer");
    }

    console.log("Application email sent successfully");

    // Send confirmation email to applicant
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4CAF50; margin-bottom: 10px;">Application Received!</h1>
          <div style="width: 60px; height: 4px; background-color: #4CAF50; margin: 0 auto;"></div>
        </div>

        <p style="font-size: 18px; color: #333;">Dear <strong>${applicationData.fullName}</strong>,</p>

        <p style="color: #666; line-height: 1.6;">
          Thank you for submitting your job application with <strong>Coshikowa Agency</strong>!
        </p>

        <div style="background-color: #f5f5f5; border-left: 4px solid #4CAF50; padding: 20px; margin: 20px 0;">
          <p style="margin: 0; color: #333;"><strong>Position Applied:</strong> ${appliedPosition}</p>
          <p style="margin: 10px 0 0 0; color: #333;"><strong>Application Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <h3 style="color: #4CAF50; margin-top: 30px;">What Happens Next?</h3>
        <ol style="color: #666; line-height: 1.8;">
          <li>Our team will carefully review your application and qualifications</li>
          <li>We will match your profile with suitable employers in our network</li>
          <li>You will receive an update from us within <strong>24 hours</strong></li>
          <li>If selected, we will contact you to schedule an interview</li>
        </ol>

        <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin: 30px 0;">
          <p style="margin: 0; color: #333; font-weight: bold;">📧 Keep an eye on your email</p>
          <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">We recommend checking your spam/junk folder to ensure you don't miss our response.</p>
        </div>

        <p style="color: #666; line-height: 1.6;">
          If you have any questions or need to update your application, please don't hesitate to contact us at <a href="mailto:sulaite256@gmail.com" style="color: #4CAF50; text-decoration: none;">sulaite256@gmail.com</a>
        </p>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #eee;">
          <p style="color: #666; margin: 0;">Best regards,</p>
          <p style="color: #4CAF50; font-weight: bold; margin: 5px 0;">The Coshikowa Agency Team</p>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            Coshikowa Agency - Connecting Talent with Opportunity across Kenya
          </p>
        </div>
      </div>
    `;

    const confirmationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Coshikowa Agency <onboarding@resend.dev>",
        to: [applicationData.email],
        subject: "Application Received - Coshikowa Agency",
        html: confirmationHtml,
      }),
    });

    if (!confirmationResponse.ok) {
      const error = await confirmationResponse.text();
      console.error("Failed to send confirmation email:", error);
      // Don't throw here, as the main email was sent successfully
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
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