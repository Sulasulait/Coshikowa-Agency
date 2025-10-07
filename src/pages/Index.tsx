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
      <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/85 to-pink-500/80 z-10" />
        <div className="absolute inset-0 z-0">
          <HeroCarousel />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-[5]">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 inline-block">
              <div className="text-sm font-semibold text-yellow-300 bg-yellow-500/20 px-6 py-2 rounded-full border border-yellow-400/30 backdrop-blur-sm">
                ✨ Kenya's Premier Employment Platform
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 animate-fade-in drop-shadow-2xl leading-tight">
              Connect. Hire. Succeed.
            </h1>

            <p className="text-xl md:text-3xl text-white/95 mb-10 max-w-3xl mx-auto drop-shadow-lg font-light leading-relaxed">
              Your Gateway to Career Success in Kenya
            </p>

            <p className="text-lg md:text-xl text-white/85 mb-12 max-w-2xl mx-auto">
              Whether you're seeking your dream job or searching for top talent, we make meaningful connections happen
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/get-hired">
                <Button variant="hero" size="lg" className="text-lg px-10 py-7 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-200 border-2 border-white/20">
                  <Briefcase className="mr-3 h-6 w-6" />
                  Find Your Dream Job
                </Button>
              </Link>
              <Link to="/find-talent">
                <Button variant="hero" size="lg" className="text-lg px-10 py-7 bg-white text-blue-600 hover:bg-gray-50 shadow-2xl hover:shadow-white/50 transform hover:scale-105 transition-all duration-200 border-2 border-white/30">
                  <Users className="mr-3 h-6 w-6" />
                  Hire Top Talent
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/90">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-yellow-300">1000+</div>
                <div className="text-sm">Active Job Seekers</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-yellow-300">500+</div>
                <div className="text-sm">Verified Employers</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-yellow-300">95%</div>
                <div className="text-sm">Success Rate</div>
              </div>
            </div>
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
            <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-blue-500 bg-gradient-to-b from-blue-50 to-white">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-blue-900">Verified Profiles</h3>
              <p className="text-muted-foreground">
                All job seekers are verified to ensure quality connections
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-emerald-500 bg-gradient-to-b from-emerald-50 to-white">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-emerald-900">Fast Processing</h3>
              <p className="text-muted-foreground">
                Quick approval and matching within 24 hours
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-purple-500 bg-gradient-to-b from-purple-50 to-white">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-purple-900">Wide Opportunities</h3>
              <p className="text-muted-foreground">
                Access to diverse job positions across Kenya
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-pink-500 bg-gradient-to-b from-pink-50 to-white">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-pink-900">Expert Support</h3>
              <p className="text-muted-foreground">
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
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">For Job Seekers</h3>
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold flex items-center justify-center">1</span>
                    <span>Fill out your detailed profile with skills and experience</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold flex items-center justify-center">2</span>
                    <span>Pay the one-time registration fee of KSH 1,500</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold flex items-center justify-center">3</span>
                    <span>Get matched with employers looking for your skills</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold flex items-center justify-center">4</span>
                    <span>Start your new career journey!</span>
                  </li>
                </ol>
                <Link to="/get-hired">
                  <Button variant="accent" size="lg" className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
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
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">For Employers</h3>
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center">1</span>
                    <span>Browse verified profiles of qualified candidates</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center">2</span>
                    <span>Filter by skills, experience, and location</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center">3</span>
                    <span>Contact candidates directly for interviews</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center">4</span>
                    <span>Hire the perfect fit for your team!</span>
                  </li>
                </ol>
                <Link to="/find-talent">
                  <Button variant="default" size="lg" className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
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
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-10 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 drop-shadow-lg">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto drop-shadow-md">
            Join thousands of Kenyans who have found their perfect match through Coshikowa Agency
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/get-hired">
              <Button variant="hero" size="lg" className="bg-white text-blue-600 hover:bg-gray-50 shadow-2xl transform hover:scale-105 transition-all duration-200 text-lg px-10 py-7 font-semibold">
                Register as Job Seeker
              </Button>
            </Link>
            <Link to="/find-talent">
              <Button variant="hero" size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-2xl transform hover:scale-105 transition-all duration-200 text-lg px-10 py-7 font-semibold border-2 border-white/20">
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
