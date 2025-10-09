import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const jobSeekersImg = "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header with Image */}
      <section className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-accent/70 z-10" />
        <img
          src={jobSeekersImg}
          alt="Refund policy"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="container mx-auto px-4 relative z-20 h-full flex items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-accent-foreground">
            Refund Policy
          </h1>
        </div>
      </section>

      <main className="flex-1 py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8">
            <div className="prose prose-slate max-w-none">
              <p className="text-muted-foreground mb-6">
                Last Updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Registration Fees</h2>
                <p className="text-muted-foreground mb-4">
                  Coshikowa Agency charges a one-time registration fee for job seekers to access our platform and connect with potential employers. This fee covers administrative costs, profile verification, and ongoing platform maintenance.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Non-Refundable Policy</h2>
                <p className="text-muted-foreground mb-4">
                  <strong>All registration fees are non-refundable.</strong> Once payment is processed and your profile is activated, we cannot offer refunds under any circumstances. This policy is in place because:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4">
                  <li>Immediate access to our platform and database is granted upon payment</li>
                  <li>Profile verification and processing begins immediately</li>
                  <li>Administrative costs are incurred as soon as registration is complete</li>
                  <li>Our matching algorithms begin working on your profile immediately</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. Service Guarantee</h2>
                <p className="text-muted-foreground mb-4">
                  While we cannot guarantee employment, we guarantee that your profile will be:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4">
                  <li>Verified and activated within 24 hours of payment</li>
                  <li>Made available to our network of verified employers</li>
                  <li>Included in our matching system for relevant job opportunities</li>
                  <li>Maintained in our active database for a minimum of 12 months</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Cancellation Policy</h2>
                <p className="text-muted-foreground mb-4">
                  If you wish to cancel your registration before completing payment, you may do so without penalty. However, once payment is submitted and processed, cancellation requests will not result in a refund.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Exceptions</h2>
                <p className="text-muted-foreground mb-4">
                  Refunds may be considered only in the following exceptional circumstances:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4">
                  <li>Duplicate payment made in error (only the duplicate charge will be refunded)</li>
                  <li>Technical error resulting in payment without service activation</li>
                  <li>Fraudulent charges made without your authorization</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  All exception requests must be submitted within 7 days of payment and will be reviewed on a case-by-case basis.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. How to Request an Exception</h2>
                <p className="text-muted-foreground mb-4">
                  If you believe you qualify for a refund under the exceptions listed above, please contact us at:
                </p>
                <p className="text-muted-foreground mb-4">
                  Email: sulaite256@gmail.com
                </p>
                <p className="text-muted-foreground mb-4">
                  Include the following in your request:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4">
                  <li>Your full name and registration email</li>
                  <li>Payment reference number</li>
                  <li>Date of payment</li>
                  <li>Detailed explanation of why you believe you qualify for an exception</li>
                  <li>Any supporting documentation</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Processing Time</h2>
                <p className="text-muted-foreground mb-4">
                  If a refund is approved under exceptional circumstances, it will be processed within 14 business days and returned to the original payment method.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  For questions about our refund policy, please contact:
                </p>
                <p className="text-muted-foreground">
                  Email: sulaite256@gmail.com
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
                <p className="text-muted-foreground mb-4">
                  We reserve the right to modify this refund policy at any time. Changes will be posted on this page with an updated revision date. Your continued use of our services after any changes constitutes acceptance of the new policy.
                </p>
              </section>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RefundPolicy;
