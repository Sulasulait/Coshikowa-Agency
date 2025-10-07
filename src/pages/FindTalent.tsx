import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Briefcase, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import employersImg from "@/assets/employers.jpg";
import { Helmet } from "react-helmet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { callEdgeFunction } from "@/lib/api";

const FindTalent = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    industry: "",
    position: "",
    requirements: "",
    urgency: "",
    jobCategory: "",
    ageRange: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await callEdgeFunction('send-hiring-request', formData);

      toast({
        title: "Request Submitted!",
        description: "We'll get back to you within 24 hours with suitable candidates.",
      });

      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        industry: "",
        position: "",
        requirements: "",
        urgency: "",
        jobCategory: "",
        ageRange: "",
      });
    } catch (error: any) {
      console.error("Error submitting hiring request:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Find Talent - Coshikowa Agency | Hire Qualified Professionals in Kenya</title>
        <meta name="description" content="Access verified, pre-screened professionals across Kenya. Find the perfect talent for your business with Coshikowa Agency's expert recruitment services." />
        <meta name="keywords" content="hire talent Kenya, recruitment agency Kenya, find employees Kenya, verified candidates, professional hiring" />
      </Helmet>
      <Navbar />

      <main className="flex-1">
        <section className="relative h-80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 z-10" />
          <img
            src={employersImg}
            alt="Employers hiring talent"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="container mx-auto px-4 relative z-20 h-full flex items-center">
            <div className="text-center w-full">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Find the Perfect Talent for Your Business
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
                Access a pool of verified, qualified professionals across Kenya ready to join your team
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="p-8 md:p-10 mb-8 shadow-xl">
              <div className="text-center mb-10">
                <div className="inline-block p-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mb-4">
                  <Briefcase className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Submit Your Hiring Request</h2>
                <p className="text-muted-foreground text-lg">
                  Tell us about your hiring needs and we'll match you with qualified candidates
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-sm font-semibold">Company Name *</Label>
                    <Input
                      id="companyName"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPerson" className="text-sm font-semibold">Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                      placeholder="Full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="company@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold">Phone Number *</Label>
                    <Input
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+254..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobCategory" className="text-sm font-semibold">Job Category / Industry *</Label>
                    <Select
                      value={formData.jobCategory}
                      onValueChange={(value) => setFormData({...formData, jobCategory: value, industry: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT & Technology">IT & Technology</SelectItem>
                        <SelectItem value="Finance & Accounting">Finance & Accounting</SelectItem>
                        <SelectItem value="Sales & Marketing">Sales & Marketing</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Construction">Construction</SelectItem>
                        <SelectItem value="Hospitality & Tourism">Hospitality & Tourism</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="Logistics & Supply Chain">Logistics & Supply Chain</SelectItem>
                        <SelectItem value="Legal">Legal</SelectItem>
                        <SelectItem value="Human Resources">Human Resources</SelectItem>
                        <SelectItem value="Customer Service">Customer Service</SelectItem>
                        <SelectItem value="Media & Communications">Media & Communications</SelectItem>
                        <SelectItem value="Agriculture">Agriculture</SelectItem>
                        <SelectItem value="Real Estate">Real Estate</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-sm font-semibold">Position to Fill *</Label>
                    <Input
                      id="position"
                      required
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                      placeholder="Job title"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-sm font-semibold">Job Requirements & Qualifications *</Label>
                  <Textarea
                    id="requirements"
                    required
                    value={formData.requirements}
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                    placeholder="Describe the skills, experience, and qualifications needed..."
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency" className="text-sm font-semibold">How Soon Do You Need to Hire? *</Label>
                  <Input
                    id="urgency"
                    required
                    value={formData.urgency}
                    onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                    placeholder="e.g., Immediately, Within 2 weeks, Within a month"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ageRange" className="text-sm font-semibold">Preferred Age Range</Label>
                  <Select
                    value={formData.ageRange}
                    onValueChange={(value) => setFormData({...formData, ageRange: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-25">18-25 years</SelectItem>
                      <SelectItem value="26-35">26-35 years</SelectItem>
                      <SelectItem value="36-45">36-45 years</SelectItem>
                      <SelectItem value="46-55">46-55 years</SelectItem>
                      <SelectItem value="56+">56+ years</SelectItem>
                      <SelectItem value="no-preference">No Preference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
                  disabled={isLoading}
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
              </form>
            </Card>

            <Card className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">What You Get</h2>
                <p className="text-muted-foreground">
                  We maintain a curated database of verified professionals actively seeking employment
                </p>
              </div>

              <div className="space-y-8">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200">
                  <h3 className="text-xl font-semibold mb-4 text-emerald-700">What You Get:</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-600 font-bold text-lg">✓</span>
                      <span>Access to verified profiles with detailed work history and skills</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-600 font-bold text-lg">✓</span>
                      <span>Candidates across all industries and experience levels</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-600 font-bold text-lg">✓</span>
                      <span>Direct contact information for immediate outreach</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-600 font-bold text-lg">✓</span>
                      <span>Pre-screened candidates ready for interviews</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-600 font-bold text-lg">✓</span>
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
