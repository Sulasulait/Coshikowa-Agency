import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import jobSeekersImg from "@/assets/job-seekers.jpg";
import { Helmet } from "react-helmet-async";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { callEdgeFunction } from "@/lib/api";

const GetHired = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
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
    dobDay: "",
    dobMonth: "",
    dobYear: "",
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

    const finalPosition = formData.desiredPosition === "Other"
      ? formData.customPosition
      : formData.desiredPosition;

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
      const dateOfBirth = formData.dobDay && formData.dobMonth && formData.dobYear
        ? `${formData.dobDay}/${formData.dobMonth}/${formData.dobYear}`
        : undefined;

      await callEdgeFunction('send-job-application', {
        ...formData,
        desiredPosition: finalPosition,
        dateOfBirth,
      });

      toast({
        title: "Application Submitted!",
        description: "We've received your application and will contact you within 24 hours.",
      });

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
        dobDay: "",
        dobMonth: "",
        dobYear: "",
      });
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
          <Card className="p-8 md:p-10 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="pb-4 border-b border-border">
                  <h2 className="text-2xl font-bold text-primary">Personal Information</h2>
                  <p className="text-sm text-muted-foreground mt-1">Tell us about yourself</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-semibold">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">Email Address *</Label>
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

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold">Phone Number *</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-semibold">Location (City/County)</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Nairobi, Kenya"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Date of Birth</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <Select
                      value={formData.dobDay}
                      onValueChange={(value) => setFormData({...formData, dobDay: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                          <SelectItem key={day} value={day.toString().padStart(2, '0')}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={formData.dobMonth}
                      onValueChange={(value) => setFormData({...formData, dobMonth: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          { value: '01', label: 'January' },
                          { value: '02', label: 'February' },
                          { value: '03', label: 'March' },
                          { value: '04', label: 'April' },
                          { value: '05', label: 'May' },
                          { value: '06', label: 'June' },
                          { value: '07', label: 'July' },
                          { value: '08', label: 'August' },
                          { value: '09', label: 'September' },
                          { value: '10', label: 'October' },
                          { value: '11', label: 'November' },
                          { value: '12', label: 'December' },
                        ].map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={formData.dobYear}
                      onValueChange={(value) => setFormData({...formData, dobYear: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 70 }, (_, i) => new Date().getFullYear() - 18 - i).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="pb-4 border-b border-border">
                  <h2 className="text-2xl font-bold text-emerald-600">Professional Background</h2>
                  <p className="text-sm text-muted-foreground mt-1">Share your experience and skills</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education" className="text-sm font-semibold">Highest Education Level</Label>
                  <Input
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="Bachelor's Degree in Computer Science"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-sm font-semibold">Work Experience (Years)</Label>
                  <Input
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g., 3 years in Software Development"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-sm font-semibold">Key Skills (comma separated)</Label>
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

              <div className="space-y-6">
                <div className="pb-4 border-b border-border">
                  <h2 className="text-2xl font-bold text-blue-600">Job Preferences</h2>
                  <p className="text-sm text-muted-foreground mt-1">What kind of role are you looking for?</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="desiredPosition" className="text-sm font-semibold">Desired Job Position *</Label>
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
                  <div className="space-y-2">
                    <Label htmlFor="customPosition" className="text-sm font-semibold">Specify Your Position *</Label>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="salary" className="text-sm font-semibold">Expected Salary Range (KSH)</Label>
                    <Input
                      id="salary"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="50,000 - 80,000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability" className="text-sm font-semibold">Availability</Label>
                    <Input
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      placeholder="Immediate / 2 weeks notice"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo" className="text-sm font-semibold">Additional Information</Label>
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

              <div className="pt-8 border-t border-border">
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-lg mb-6 border border-emerald-200">
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
