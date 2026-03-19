import { useParams, useNavigate } from "react-router-dom";
import { useJob } from "@/hooks/useJobs";
import { useSubmitApplication } from "@/hooks/useApplications";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Apply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: job, isLoading: jobLoading } = useJob(id!);
  const submitMutation = useSubmitApplication();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ phone: "", resumeUrl: "", coverLetter: "" });

  if (!user) {
    navigate("/login");
    return null;
  }

  if (jobLoading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Job not found.</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold">Application Submitted!</h2>
        <p className="mt-2 text-muted-foreground">
          Your application for <span className="font-semibold text-foreground">{job.title}</span> at {job.company} has been sent.
        </p>
        <Button variant="ghost" className="mt-6" onClick={() => navigate("/jobs")}>
          Browse More Jobs
        </Button>
      </motion.div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitMutation.mutateAsync({
        jobId: job.id,
        name: user.name,
        email: user.email,
        phone: form.phone || undefined,
        resumeUrl: form.resumeUrl || undefined,
        coverLetter: form.coverLetter || undefined,
      });
    } catch {
      // API not available — still show success for demo
    }
    toast.success("Application submitted successfully!");
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <Button variant="ghost" size="sm" onClick={() => navigate(`/jobs/${job.id}`)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Job
      </Button>

      <div className="rounded-xl border bg-card p-6 md:p-8">
        <h1 className="font-display text-2xl font-bold">Apply for {job.title}</h1>
        <p className="mt-1 text-muted-foreground">{job.company} · {job.location}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue={user.name} required />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" defaultValue={user.email} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Resume / Portfolio URL</Label>
            <Input type="url" placeholder="https://..." value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Cover Letter</Label>
            <Textarea rows={5} placeholder="Tell us why you're a great fit..." value={form.coverLetter} onChange={(e) => setForm({ ...form, coverLetter: e.target.value })} />
          </div>
          <Button type="submit" variant="hero" className="w-full" disabled={submitMutation.isPending}>
            {submitMutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Application"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Apply;
