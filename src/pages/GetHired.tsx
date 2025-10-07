import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CalendarIcon } from "lucide-react";
import jobSeekersImg from "@/assets/job-seekers.jpg";
import { Helmet } from "react-helmet-async";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { callEdgeFunction } from "@/lib/api";

const GetHired = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    education: "",
    experience: "",
    skills: "",
    desiredPosition: "",
    customPosition: "",
    salary: "",
    availability: "",
    additionalInfo: "",
  });

  const jobCategories = [
    "Software Developer",
    "Accountant",
    "Sales Manager",
    "Marketing Manager",
    "Customer Service Representative",
    "Administrative Assistant",
    "Human Resources Manager",
    "Graphic Designer",
    "Data Analyst",
    "Project Manager",
    "Nurse",
    "Teacher",
    "Civil Engineer",
    "Mechanical Engineer",
    "Other",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determine final position
    const finalPosition = formData.desiredPosition === "Other" 
      ? formData.customPosition 
      : formData.desiredPosition;

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone || !finalPosition) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await callEdgeFunction('send-job-application', {
        ...formData,
        desiredPosition: finalPosition,
        dateOfBirth: dateOfBirth ? format(dateOfBirth, "PPP") : undefined,
      });

      toast({
        title: "Application Submitted!",
        description: "We've received your application and will contact you within 24 hours.",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        education: "",
        experience: "",
        skills: "",
        desiredPosition: "",
        customPosition: "",
        salary: "",
        availability: "",
        additionalInfo: "",
      });
      setDateOfBirth(undefined);
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Get Hired - Coshikowa Agency | Find Your Dream Job in Kenya</title>
        <meta name="description" content="Register for free and connect with top employers across Kenya. Verified profiles, fast matching, and expert career support." />
        <meta name="keywords" content="get hired Kenya, job application Kenya, find employment, career opportunities Kenya, job registration" />
      </Helmet>
      <Navbar />
      
      {/* Header with Image */}
      <section className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-accent/70 z-10" />
        <img 
          src={jobSeekersImg} 
          alt="Job seekers success" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container mx-auto px-4 relative z-20 h-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-accent-foreground mb-4">
              Get Hired Today
            </h1>
            <p className="text-xl text-accent-foreground/90">
              Fill out your profile and get matched with top employers in Kenya - completely free!
            </p>
          </div>
        </div>
      </section>
      
      <main className="flex-1 py-12 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl">

          <Card className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+254 712 345 678"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location (City/County)</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Nairobi, Kenya"
                  />
                </div>

                <div>
                  <Label>Date of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateOfBirth && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateOfBirth}
                        onSelect={setDateOfBirth}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Professional Background</h2>
                
                <div>
                  <Label htmlFor="education">Highest Education Level</Label>
                  <Input
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="Bachelor's Degree in Computer Science"
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Work Experience (Years)</Label>
                  <Input
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g., 3 years in Software Development"
                  />
                </div>

                <div>
                  <Label htmlFor="skills">Key Skills (comma separated)</Label>
                  <Textarea
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="JavaScript, React, Node.js, Communication, Team Leadership"
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Job Preferences</h2>
                
                <div>
                  <Label htmlFor="desiredPosition">Desired Job Position *</Label>
                  <Select
                    value={formData.desiredPosition}
                    onValueChange={(value) => setFormData({...formData, desiredPosition: value})}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a job category" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.desiredPosition === "Other" && (
                  <div>
                    <Label htmlFor="customPosition">Specify Your Position *</Label>
                    <Input
                      id="customPosition"
                      name="customPosition"
                      value={formData.customPosition}
                      onChange={handleChange}
                      placeholder="Enter your desired position"
                      required
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salary">Expected Salary Range (KSH)</Label>
                    <Input
                      id="salary"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="50,000 - 80,000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Input
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      placeholder="Immediate / 2 weeks notice"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    placeholder="Tell us more about yourself, your achievements, or any special requirements..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="bg-primary/5 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold mb-2">Next Steps:</h3>
                  <ol className="text-sm text-muted-foreground space-y-1">
                    <li>1. Review your information</li>
                    <li>2. Submit your application</li>
                    <li>3. Receive confirmation email</li>
                    <li>4. Get matched with employers within 24 hours</li>
                  </ol>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GetHired;
