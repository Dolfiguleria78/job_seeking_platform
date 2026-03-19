import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Building2, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useFeaturedJobs } from "@/hooks/useJobs";
import JobCard from "@/components/JobCard";

const stats = [
  { icon: Building2, label: "Companies", value: "2,500+" },
  { icon: Users, label: "Job Seekers", value: "150k+" },
  { icon: TrendingUp, label: "Jobs Posted", value: "10k+" },
];

const Index = () => {
  const navigate = useNavigate();
  const { data: featuredJobs = [], isLoading } = useFeaturedJobs();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Find Your <span className="text-accent">Dream Career</span> Today
            </h1>
            <p className="mt-5 text-lg text-muted-foreground md:text-xl">
              Discover thousands of job opportunities from top companies. Your next chapter starts here.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button variant="hero" size="lg" onClick={() => navigate("/jobs")}>
                <Search className="h-5 w-5" />
                Browse Jobs
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/signup")}>
                For Recruiters
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="mx-auto mb-2 h-6 w-6 text-accent" />
                <p className="font-display text-2xl font-bold md:text-3xl">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">Featured Jobs</h2>
              <p className="mt-1 text-muted-foreground">Handpicked opportunities from top employers</p>
            </div>
            <Button variant="ghost" onClick={() => navigate("/jobs")}>
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-40 animate-pulse rounded-xl bg-secondary" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
