import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const FindTalent = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Find the Perfect Talent for Your Business
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Access a pool of verified, qualified professionals across Kenya ready to join your team
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">How to Access Our Talent Pool</h2>
                <p className="text-muted-foreground">
                  We maintain a curated database of verified professionals actively seeking employment
                </p>
              </div>

              <div className="space-y-8">
                <div className="bg-accent/5 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-accent">What You Get:</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Access to verified profiles with detailed work history and skills</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Candidates across all industries and experience levels</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Direct contact information for immediate outreach</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Pre-screened candidates ready for interviews</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Ongoing support in the hiring process</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-border pt-8">
                  <h3 className="text-xl font-semibold mb-4">Industries We Cover:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-muted-foreground">
                    <div className="bg-muted p-3 rounded text-center">IT & Technology</div>
                    <div className="bg-muted p-3 rounded text-center">Finance & Accounting</div>
                    <div className="bg-muted p-3 rounded text-center">Sales & Marketing</div>
                    <div className="bg-muted p-3 rounded text-center">Healthcare</div>
                    <div className="bg-muted p-3 rounded text-center">Hospitality</div>
                    <div className="bg-muted p-3 rounded text-center">Construction</div>
                    <div className="bg-muted p-3 rounded text-center">Education</div>
                    <div className="bg-muted p-3 rounded text-center">Manufacturing</div>
                    <div className="bg-muted p-3 rounded text-center">Retail</div>
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Get Started Today</h3>
                  <p className="text-muted-foreground mb-6">
                    Contact us to discuss your hiring needs and get access to our talent database. 
                    We'll match you with the right candidates for your specific requirements.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-foreground">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="font-medium">Email:</span>
                      <a href="mailto:sulaite256@gmail.com" className="text-primary hover:underline">
                        sulaite256@gmail.com
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3 text-foreground">
                      <Phone className="h-5 w-5 text-primary" />
                      <span className="font-medium">Phone:</span>
                      <span className="text-muted-foreground">Available via email request</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <a href="mailto:sulaite256@gmail.com?subject=Employer Inquiry - Find Talent">
                      <Button variant="default" size="lg" className="w-full md:w-auto">
                        Contact Us Now
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="text-center pt-6">
                  <p className="text-sm text-muted-foreground">
                    Our team will respond within 24 hours to discuss your hiring needs and 
                    provide you with suitable candidate profiles.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">Why Employers Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-semibold text-lg mb-2">Fast Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Get matched with qualified candidates within 24-48 hours
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="font-semibold text-lg mb-2">Pre-Screened</h3>
                <p className="text-sm text-muted-foreground">
                  All candidates are verified and background-checked
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-semibold text-lg mb-2">Perfect Match</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered matching based on skills and requirements
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

export default FindTalent;
