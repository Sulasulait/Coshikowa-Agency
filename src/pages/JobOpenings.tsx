import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface JobOpening {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_range: string;
  job_type: string;
  description: string;
  requirements: string | null;
}

export const JobOpeningsSection = () => {
  const { data: jobOpenings = [], isLoading } = useQuery({
    queryKey: ['job-openings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_openings')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as JobOpening[];
    },
  });
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
              ✨ Fresh Opportunities
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Latest Job Openings
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse through our current job opportunities from verified employers across Kenya
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading job openings...</p>
          </div>
        ) : jobOpenings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No job openings available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {jobOpenings.map((job, index) => {
              const colors = [
                { border: 'border-blue-400', bg: 'from-blue-50', icon: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
                { border: 'border-emerald-400', bg: 'from-emerald-50', icon: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
                { border: 'border-purple-400', bg: 'from-purple-50', icon: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' },
                { border: 'border-pink-400', bg: 'from-pink-50', icon: 'text-pink-600', badge: 'bg-pink-100 text-pink-700' },
                { border: 'border-orange-400', bg: 'from-orange-50', icon: 'text-orange-600', badge: 'bg-orange-100 text-orange-700' },
                { border: 'border-teal-400', bg: 'from-teal-50', icon: 'text-teal-600', badge: 'bg-teal-100 text-teal-700' },
              ];
              const colorScheme = colors[index % colors.length];

              return (
                <Card key={job.id} className={`p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 ${colorScheme.border} bg-gradient-to-b ${colorScheme.bg} to-white`}>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{job.title}</h3>
                      <p className="text-muted-foreground text-sm font-medium">{job.company}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className={`h-4 w-4 ${colorScheme.icon}`} />
                        <span className="font-medium">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className={`h-4 w-4 ${colorScheme.icon}`} />
                        <span className="font-medium">KSH {job.salary_range}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className={`h-4 w-4 ${colorScheme.icon}`} />
                        <Badge className={colorScheme.badge}>{job.job_type}</Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {job.description}
                    </p>

                    <Button variant="default" className={`w-full bg-gradient-to-r ${colorScheme.border.replace('border', 'from')}-500 to-${colorScheme.border.replace('border-', '').replace('-400', '')}-600 hover:shadow-lg transform hover:scale-[1.02] transition-all`} asChild>
                      <a href="/get-hired" style="color: blue;">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Apply Now
                      </a>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

const JobOpenings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <JobOpeningsSection />
      </main>
      <Footer />
    </div>
  );
};

export default JobOpenings;
