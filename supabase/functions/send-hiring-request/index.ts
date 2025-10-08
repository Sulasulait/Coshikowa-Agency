import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

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
  dateOfBirth?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: HiringRequest = await req.json();

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { error: dbError } = await supabase
      .from('hiring_requests')
      .insert({
        company_name: requestData.companyName,
        contact_person: requestData.contactPerson,
        email: requestData.email,
        phone: requestData.phone,
        industry: requestData.industry,
        position: requestData.position,
        requirements: requestData.requirements,
        urgency: requestData.urgency,
      });

    if (dbError) {
      throw new Error(`Failed to save hiring request: ${JSON.stringify(dbError)}`);
    }

    console.log("Hiring request saved to database successfully");

    const emailHtml = `
      <h1>New Hiring Request</h1>
      
      <h2>Company Information</h2>
      <p><strong>Company Name:</strong> ${requestData.companyName}</p>
      <p><strong>Contact Person:</strong> ${requestData.contactPerson}</p>
      <p><strong>Email:</strong> ${requestData.email}</p>
      <p><strong>Phone:</strong> ${requestData.phone}</p>
      ${requestData.dateOfBirth ? `<p><strong>Date of Birth:</strong> ${requestData.dateOfBirth}</p>` : ''}
      
      <h2>Hiring Details</h2>
      <p><strong>Industry:</strong> ${requestData.industry}</p>
      <p><strong>Position to Fill:</strong> ${requestData.position}</p>
      <p><strong>Urgency:</strong> ${requestData.urgency}</p>
      
      <h2>Requirements</h2>
      <p>${requestData.requirements}</p>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
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
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Coshikowa Agency <onboarding@resend.dev>",
        to: [requestData.email],
        subject: "Hiring Request Received - Coshikowa Agency",
        html: `
          <h1>Thank you for your hiring request, ${requestData.contactPerson}!</h1>
          <p>We have received your request to hire for the position of <strong>${requestData.position}</strong>.</p>
          <p>Our team will review your requirements and get back to you within 24 hours with suitable candidates.</p>
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
    console.error("Error in send-hiring-request function:", error);
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