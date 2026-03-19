import { useParams, useNavigate } from "react-router-dom";
import { useJob } from "@/hooks/useJobs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Clock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { data: job, isLoading } = useJob(id!);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 space-y-6">
        <div className="h-8 w-32 animate-pulse rounded bg-secondary" />
        <div className="h-12 w-2/3 animate-pulse rounded bg-secondary" />
        <div className="h-40 animate-pulse rounded-xl bg-secondary" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold">Job not found</h2>
          <Button variant="ghost" className="mt-4" onClick={() => navigate("/jobs")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-10">
      <Button variant="ghost" size="sm" onClick={() => navigate("/jobs")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground">
              {job.logo}
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold md:text-3xl">{job.title}</h1>
              <p className="mt-1 text-lg text-muted-foreground">{job.company}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary" className="gap-1"><MapPin className="h-3 w-3" />{job.location}</Badge>
            <Badge variant="secondary" className="gap-1"><DollarSign className="h-3 w-3" />{job.salary}</Badge>
            <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />{job.posted}</Badge>
            <Badge className="bg-accent/10 text-accent border-0">{job.type}</Badge>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold">About This Role</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{job.description}</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold">Requirements</h2>
            <ul className="mt-3 space-y-2">
              {job.requirements.map((r) => (
                <li key={r} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-display text-lg font-semibold">Apply Now</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {isAuthenticated ? "Submit your application for this position." : "Sign in to apply for this position."}
            </p>
            <Button
              variant="hero"
              className="mt-4 w-full"
              onClick={() => {
                if (isAuthenticated) navigate(`/apply/${job.id}`);
                else navigate("/login");
              }}
            >
              {isAuthenticated ? "Apply" : "Sign In to Apply"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetail;
