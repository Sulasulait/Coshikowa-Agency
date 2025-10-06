import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Mail, Phone, Briefcase } from "lucide-react";
import employersImg from "@/assets/employers.jpg";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";

const FindTalent = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [idFile, setIdFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    industry: "",
    position: "",
    requirements: "",
    urgency: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.email || !formData.phone || !formData.dateOfBirth || !formData.position || !idFile) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload your ID",
        variant: "destructive",
      });
      return;
    }

    if (!isPaid) {
      toast({
        title: "Payment Required",
        description: "Please complete the payment before submitting",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke("send-job-application", {
        body: { ...formData, type: "employer" },
      });

      if (error) throw error;

      toast({
        title: "Request Submitted!",
        description: "We've received your talent request and will contact you within 24 hours.",
      });

      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        industry: "",
        position: "",
        requirements: "",
        urgency: "",
      });
      setIdFile(null);
      setIsPaid(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error: any) {
      console.error("Error submitting request:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load PayPal script
  useState(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=AQswTt7epLeM9OBwF7YpbP87Hm2YnOu_vEYjOvQG8D8KY2vFJjHQx7pztP9Hl4SYIGQBvjfONNWvJo7d&currency=USD";
    script.async = true;
    script.onload = () => {
      if ((window as any).paypal) {
        (window as any).paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: "15.00"
                }
              }]
            });
          },
          onApprove: async (data: any, actions: any) => {
            return actions.order.capture().then(() => {
              setIsPaid(true);
              toast({
                title: "Payment Successful",
                description: "You can now submit your request",
              });
            });
          },
          onError: (err: any) => {
            toast({
              title: "Payment Failed",
              description: "There was an error processing your payment",
              variant: "destructive",
            });
          }
        }).render('#paypal-button-container-talent');
      }
    };
    document.body.appendChild(script);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Find Talent - Coshikowa Agency | Hire Qualified Professionals in Kenya</title>
        <meta name="description" content="Access verified, pre-screened professionals across Kenya. Find the perfect talent for your business with Coshikowa Agency's expert recruitment services." />
        <meta name="keywords" content="hire talent Kenya, recruitment agency Kenya, find employees Kenya, verified candidates, professional hiring" />
        <script src="https://www.paypal.com/sdk/js?client-id=AQswTt7epLeM9OBwF7YpbP87Hm2YnOu_vEYjOvQG8D8KY2vFJjHQx7pztP9Hl4SYIGQBvjfONNWvJo7d&currency=USD" async></script>
      </Helmet>
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section with Image */}
        <section className="relative h-64 md:h-80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 z-10" />
          <img 
            src={employersImg} 
            alt="Employers hiring talent" 
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="container mx-auto px-4 relative z-20 h-full flex items-center">
            <div className="text-center w-full">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 md:mb-6">
                Find the Perfect Talent for Your Business
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto">
                Access a pool of verified, qualified professionals across Kenya ready to join your team
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 md:py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="p-6 md:p-8 mb-8">
              <div className="text-center mb-8">
                <Briefcase className="h-12 w-12 mx-auto text-primary mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Submit Your Hiring Request</h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Tell us about your hiring needs and we'll match you with qualified candidates
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      name="contactPerson"
                      required
                      value={formData.contactPerson}
                      onChange={handleChange}
                      placeholder="Full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="company@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+254 712 345 678"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="idUpload">ID Upload (National ID, Driving License, or Passport) *</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="idUpload"
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        required
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full text-sm"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {idFile ? idFile.name : "Upload ID"}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="industry">Industry *</Label>
                    <Input
                      id="industry"
                      name="industry"
                      required
                      value={formData.industry}
                      onChange={handleChange}
                      placeholder="e.g., IT, Healthcare, Finance"
                    />
                  </div>

                  <div>
                    <Label htmlFor="position">Position to Fill *</Label>
                    <Input
                      id="position"
                      name="position"
                      required
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="Job title"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="requirements">Job Requirements & Qualifications *</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    required
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="Describe the skills, experience, and qualifications needed..."
                    className="min-h-[120px]"
                  />
                </div>

                <div>
                  <Label htmlFor="urgency">How Soon Do You Need to Hire? *</Label>
                  <Input
                    id="urgency"
                    name="urgency"
                    required
                    value={formData.urgency}
                    onChange={handleChange}
                    placeholder="e.g., Immediately, Within 2 weeks, Within a month"
                  />
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="bg-primary/5 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold mb-2">Payment Required:</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      A registration fee of KSH 1,500 is required to process your request.
                    </p>
                    <div id="paypal-button-container-talent" className="mb-4"></div>
                    {isPaid && (
                      <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-lg text-sm">
                        ✓ Payment successful! You can now submit your request.
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isLoading || !isPaid}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Hiring Request"
                    )}
                  </Button>
                </div>
              </form>
            </Card>

            <Card className="p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">What You Get</h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  We maintain a curated database of verified professionals actively seeking employment
                </p>
              </div>

              <div className="space-y-8">
                <div className="bg-accent/5 p-4 md:p-6 rounded-lg">
                  <h3 className="text-lg md:text-xl font-semibold mb-4 text-accent">What You Get:</h3>
                  <ul className="space-y-3 text-sm md:text-base text-muted-foreground">
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
                  <h3 className="text-lg md:text-xl font-semibold mb-4">Industries We Cover:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
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

                <div className="bg-primary/5 p-4 md:p-6 rounded-lg">
                  <h3 className="text-lg md:text-xl font-semibold mb-4">Get Started Today</h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-6">
                    Contact us to discuss your hiring needs and get access to our talent database. 
                    We'll match you with the right candidates for your specific requirements.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm md:text-base text-foreground">
                      <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-medium">Email:</span>
                      <a href="mailto:sulaite256@gmail.com" className="text-primary hover:underline break-all">
                        sulaite256@gmail.com
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm md:text-base text-foreground">
                      <Phone className="h-5 w-5 text-primary flex-shrink-0" />
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
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Our team will respond within 24 hours to discuss your hiring needs and 
                    provide you with suitable candidate profiles.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-8 md:py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Why Employers Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-semibold text-base md:text-lg mb-2">Fast Matching</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Get matched with qualified candidates within 24-48 hours
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="font-semibold text-base md:text-lg mb-2">Pre-Screened</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  All candidates are verified and background-checked
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-semibold text-base md:text-lg mb-2">Perfect Match</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
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
