import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react";

const jobOpenings = [
  {
    id: 1,
    title: "Software Developer",
    company: "Tech Solutions Ltd",
    location: "Nairobi",
    salary: "80,000 - 120,000",
    type: "Full-time",
    description: "We're looking for a skilled software developer with experience in React and Node.js.",
  },
  {
    id: 2,
    title: "Sales Executive",
    company: "Retail Innovators",
    location: "Mombasa",
    salary: "50,000 - 70,000",
    type: "Full-time",
    description: "Join our dynamic sales team to drive business growth across the coastal region.",
  },
  {
    id: 3,
    title: "Accountant",
    company: "Finance Pro Kenya",
    location: "Nakuru",
    salary: "60,000 - 90,000",
    type: "Full-time",
    description: "Experienced accountant needed for a growing financial services firm.",
  },
  {
    id: 4,
    title: "Marketing Manager",
    company: "Brand Builders",
    location: "Nairobi",
    salary: "90,000 - 130,000",
    type: "Full-time",
    description: "Lead our marketing initiatives and drive brand awareness across Kenya.",
  },
  {
    id: 5,
    title: "Customer Service Representative",
    company: "Support Hub",
    location: "Kisumu",
    salary: "35,000 - 50,000",
    type: "Full-time",
    description: "Provide excellent customer service and support to our growing client base.",
  },
  {
    id: 6,
    title: "Graphic Designer",
    company: "Creative Studios",
    location: "Nairobi",
    salary: "45,000 - 75,000",
    type: "Contract",
    description: "Create stunning visual designs for diverse clients across various industries.",
  },
];

export const JobOpeningsSection = () => {
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
                    <span>KSH {job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="secondary">{job.type}</Badge>
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
      </div>
    </section>
  );
};
