import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest Job Openings
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                    <p className="text-muted-foreground text-sm">{job.company}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>KSH {job.salary_range}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="secondary">{job.job_type}</Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {job.description}
                  </p>

                  <Button variant="default" className="w-full" asChild>
                    <a href="/get-hired">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Apply Now
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
