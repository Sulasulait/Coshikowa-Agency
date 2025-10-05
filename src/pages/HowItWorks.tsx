import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, CreditCard, FileText, Users } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              How Kenya Jobs Works
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Simple, secure, and effective job matching in just a few steps
            </p>
          </div>
        </section>

        {/* For Job Seekers */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">For Job Seekers</h2>
              <p className="text-muted-foreground text-lg">
                Get hired in 4 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-2">Step 1</div>
                <h3 className="font-semibold text-lg mb-2">Fill Your Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Complete a detailed form with your skills, experience, and job preferences
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-accent" />
                </div>
                <div className="text-2xl font-bold text-accent mb-2">Step 2</div>
                <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
                <p className="text-sm text-muted-foreground">
                  Pay a one-time registration fee of KSH 1,500 via secure payment gateway
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-2">Step 3</div>
                <h3 className="font-semibold text-lg mb-2">Get Verified</h3>
                <p className="text-sm text-muted-foreground">
                  Your profile is verified and added to our employer-facing database within 24 hours
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <div className="text-2xl font-bold text-accent mb-2">Step 4</div>
                <h3 className="font-semibold text-lg mb-2">Get Matched</h3>
                <p className="text-sm text-muted-foreground">
                  Employers contact you directly when they find you're a good fit for their roles
                </p>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Link to="/get-hired">
                <Button variant="hero" size="lg">
                  Start Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* For Employers */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">For Employers</h2>
              <p className="text-muted-foreground text-lg">
                Find the perfect candidate effortlessly
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">📧</div>
                <div className="text-2xl font-bold text-primary mb-2">Step 1</div>
                <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
                <p className="text-sm text-muted-foreground">
                  Send us your job requirements and ideal candidate profile
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <div className="text-2xl font-bold text-accent mb-2">Step 2</div>
                <h3 className="font-semibold text-lg mb-2">Review Matches</h3>
                <p className="text-sm text-muted-foreground">
                  We send you profiles of candidates that match your criteria
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">✅</div>
                <div className="text-2xl font-bold text-primary mb-2">Step 3</div>
                <h3 className="font-semibold text-lg mb-2">Hire Directly</h3>
                <p className="text-sm text-muted-foreground">
                  Contact candidates directly and conduct your hiring process
                </p>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Link to="/find-talent">
                <Button variant="default" size="lg">
                  Find Talent Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Why is there a registration fee for job seekers?</h3>
                <p className="text-muted-foreground">
                  The KSH 1,500 fee helps us maintain a high-quality database of serious job seekers, 
                  verify profiles thoroughly, and provide excellent matching services to both candidates and employers.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Is my payment secure?</h3>
                <p className="text-muted-foreground">
                  Yes! We use Stripe, a world-class payment processor trusted by millions. Your payment 
                  information is encrypted and never stored on our servers.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">How long until I hear from employers?</h3>
                <p className="text-muted-foreground">
                  Once your profile is verified (within 24 hours), employers can start viewing and contacting you. 
                  The timeline varies based on your profile and current job market demand.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">Do employers pay to access profiles?</h3>
                <p className="text-muted-foreground">
                  Employers contact us directly and receive curated candidate profiles based on their specific 
                  needs. This ensures you're only contacted for relevant opportunities.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">What happens after payment?</h3>
                <p className="text-muted-foreground">
                  After successful payment, you'll receive a confirmation email. Your profile is then verified 
                  and added to our database. You'll also receive email notifications when employers express interest.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
