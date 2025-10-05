import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Target, Heart, Zap } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About Us - Coshikowa Agency | Leading Employment Agency in Kenya</title>
        <meta name="description" content="Learn about Coshikowa Agency's mission to empower Kenyans with meaningful employment opportunities and help businesses discover exceptional talent." />
        <meta name="keywords" content="about Coshikowa Agency, employment agency Kenya, recruitment agency, job portal Kenya" />
      </Helmet>
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section with Image */}
        <section className="relative h-80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 z-10" />
          <img 
            src={heroBackground} 
            alt="About Coshikowa Agency" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="container mx-auto px-4 relative z-20 h-full flex items-center">
            <div className="text-center w-full">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                About Coshikowa Agency
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
                Empowering Kenyans to find meaningful work and helping businesses discover exceptional talent
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Coshikowa Agency, we believe every Kenyan deserves access to quality employment opportunities,
                and every business deserves to find the right talent. We're bridging the gap between job 
                seekers and employers through a streamlined, affordable, and effective platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Our Vision</h3>
                <p className="text-sm text-muted-foreground">
                  To be Kenya's most trusted job matching platform, connecting talent with opportunity across all sectors
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Our Values</h3>
                <p className="text-sm text-muted-foreground">
                  Integrity, accessibility, and excellence guide everything we do for our job seekers and employers
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Our Approach</h3>
                <p className="text-sm text-muted-foreground">
                  Fast, verified, and personalized matching powered by dedicated professionals who care
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <Card className="p-8">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Kenya Jobs was born from a simple observation: talented Kenyans struggling to find 
                  meaningful employment, while businesses couldn't easily access the right candidates. 
                  We saw an opportunity to make a difference.
                </p>
                <p>
                  We created a platform that removes traditional barriers. For job seekers, we offer an 
                  affordable way to showcase their skills to verified employers. For businesses, we provide 
                  access to a curated pool of pre-screened, motivated professionals.
                </p>
                <p>
                  Our team is dedicated to maintaining the highest standards of service, ensuring every 
                  profile is verified, every employer is legitimate, and every connection has the potential 
                  to transform lives and businesses.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Kenya Jobs?</h2>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Affordable Access
                </h3>
                <p className="text-muted-foreground ml-7">
                  At just KSH 1,500, we make professional job placement accessible to all Kenyans, 
                  regardless of their financial situation.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  Verified Quality
                </h3>
                <p className="text-muted-foreground ml-7">
                  Every profile undergoes verification to ensure employers receive quality candidates 
                  and job seekers connect with legitimate opportunities.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Fast Matching
                </h3>
                <p className="text-muted-foreground ml-7">
                  Our streamlined process ensures profiles are active within 24 hours, and employers 
                  receive candidate recommendations promptly.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  Dedicated Support
                </h3>
                <p className="text-muted-foreground ml-7">
                  Our team is always available to help both job seekers and employers navigate the 
                  platform and optimize their experience.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Local Expertise
                </h3>
                <p className="text-muted-foreground ml-7">
                  We understand the Kenyan job market deeply, allowing us to make better matches and 
                  provide relevant guidance to all our users.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Have questions? We're here to help. Reach out to us anytime.
            </p>
            <Card className="p-6">
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  <a href="mailto:sulaite256@gmail.com" className="text-primary hover:underline">
                    sulaite256@gmail.com
                  </a>
                </div>
                <div>
                  <span className="font-semibold">Location:</span>{" "}
                  <span className="text-muted-foreground">Nairobi, Kenya</span>
                </div>
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    We typically respond within 24 hours on business days
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
