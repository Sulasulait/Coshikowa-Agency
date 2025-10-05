import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import employersImg from "@/assets/employers.jpg";

const LegalDisclaimer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header with Image */}
      <section className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10" />
        <img 
          src={employersImg} 
          alt="Legal documentation" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container mx-auto px-4 relative z-20 h-full flex items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
            Legal Disclaimer
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
                <h2 className="text-2xl font-bold mb-4">1. General Information</h2>
                <p className="text-muted-foreground mb-4">
                  The information provided by Coshikowa Agency ("we," "us," or "our") on our website is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. No Employment Guarantee</h2>
                <p className="text-muted-foreground mb-4">
                  Coshikowa Agency serves as a platform to connect job seekers with potential employers. We do not guarantee employment or job placement for any candidate who registers on our platform. Employment decisions are solely at the discretion of the hiring employers.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. Verification of Information</h2>
                <p className="text-muted-foreground mb-4">
                  While we strive to verify the information provided by both job seekers and employers, we cannot guarantee the absolute accuracy of all profiles, job postings, or company information. Users are advised to conduct their own due diligence before making any employment-related decisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Third-Party Links</h2>
                <p className="text-muted-foreground mb-4">
                  Our website may contain links to third-party websites or services that are not owned or controlled by Coshikowa Agency. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Professional Advice Disclaimer</h2>
                <p className="text-muted-foreground mb-4">
                  The information on this website is not intended to constitute professional advice. Users should seek independent professional advice before making employment or hiring decisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Changes to This Disclaimer</h2>
                <p className="text-muted-foreground mb-4">
                  We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting on the website. Your continued use of the platform following any changes constitutes acceptance of those changes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Legal Disclaimer, please contact us at:
                </p>
                <p className="text-muted-foreground">
                  Email: sulaite256@gmail.com
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

export default LegalDisclaimer;
