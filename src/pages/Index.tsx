import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, Users, Shield, Zap } from "lucide-react";
import jobSeekersImg from "@/assets/job-seekers.jpg";
import employersImg from "@/assets/employers.jpg";
import { HeroCarousel } from "@/components/HeroCarousel";
import { JobOpeningsSection } from "./JobOpenings";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Coshikowa Agency - Your Gateway to Career Success in Kenya</title>
        <meta name="description" content="Connect with top employers in Kenya or find qualified talent for your business. Verified profiles, fast matching, and expert support for job seekers and employers." />
        <meta name="keywords" content="Kenya jobs, job seekers Kenya, find talent Kenya, employment agency Kenya, Nairobi jobs, Mombasa jobs, career opportunities Kenya" />
        <link rel="canonical" href="https://yourwebsite.com/" />
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 to-secondary/85 z-10" />
        <div className="absolute inset-0 z-0">
          <HeroCarousel />
        </div>
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in drop-shadow-lg">
            Welcome to Coshikowa Agency
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground mb-8 max-w-3xl mx-auto drop-shadow-md">
            Your Gateway to Career Success in Kenya - Connect with top employers or find the perfect talent
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-hired">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6 bg-accent hover:bg-accent/90">
                <Briefcase className="mr-2 h-5 w-5" />
                I'm Looking for Work
              </Button>
            </Link>
            <Link to="/find-talent">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Users className="mr-2 h-5 w-5" />
                I'm Hiring
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Coshikowa Agency?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Verified Profiles</h3>
              <p className="text-muted-foreground text-sm">
                All job seekers are verified to ensure quality connections
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Processing</h3>
              <p className="text-muted-foreground text-sm">
                Quick approval and matching within 24 hours
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Wide Opportunities</h3>
              <p className="text-muted-foreground text-sm">
                Access to diverse job positions across Kenya
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Expert Support</h3>
              <p className="text-muted-foreground text-sm">
                Dedicated team to help you every step of the way
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img 
                  src={jobSeekersImg} 
                  alt="Job seekers celebrating success" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-accent">For Job Seekers</h3>
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">1.</span>
                    <span>Fill out your detailed profile with skills and experience</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">2.</span>
                    <span>Pay the one-time registration fee of KSH 1,500</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">3.</span>
                    <span>Get matched with employers looking for your skills</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">4.</span>
                    <span>Start your new career journey!</span>
                  </li>
                </ol>
                <Link to="/get-hired">
                  <Button variant="accent" size="lg" className="mt-6">
                    Get Started Now
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img 
                  src={employersImg} 
                  alt="Employers reviewing candidates" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">For Employers</h3>
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">1.</span>
                    <span>Browse verified profiles of qualified candidates</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">2.</span>
                    <span>Filter by skills, experience, and location</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">3.</span>
                    <span>Contact candidates directly for interviews</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary">4.</span>
                    <span>Hire the perfect fit for your team!</span>
                  </li>
                </ol>
                <Link to="/find-talent">
                  <Button variant="default" size="lg" className="mt-6">
                    Find Talent Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <JobOpeningsSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of Kenyans who have found their perfect match through Coshikowa Agency
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-hired">
              <Button variant="hero" size="lg" className="bg-accent hover:bg-accent/90">
                Register as Job Seeker
              </Button>
            </Link>
            <Link to="/find-talent">
              <Button variant="hero" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
