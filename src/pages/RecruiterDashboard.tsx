import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, Eye, TrendingUp, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const mockPostedJobs = [
  { id: "p1", title: "Senior Frontend Developer", applicants: 24, views: 312, status: "Active" },
  { id: "p2", title: "Product Designer", applicants: 18, views: 245, status: "Active" },
  { id: "p3", title: "Backend Engineer", applicants: 31, views: 420, status: "Closed" },
];

const mockApplicants = [
  { name: "Alice Johnson", role: "Senior Frontend Developer", date: "Mar 15, 2026", status: "New" },
  { name: "Bob Martinez", role: "Senior Frontend Developer", date: "Mar 14, 2026", status: "Reviewed" },
  { name: "Carol Chen", role: "Product Designer", date: "Mar 13, 2026", status: "Shortlisted" },
  { name: "David Kim", role: "Backend Engineer", date: "Mar 12, 2026", status: "New" },
];

const statusColors: Record<string, string> = {
  Active: "bg-success/10 text-success",
  Closed: "bg-muted text-muted-foreground",
  New: "bg-accent/10 text-accent",
  Reviewed: "bg-primary/10 text-primary",
  Shortlisted: "bg-success/10 text-success",
};

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPostForm, setShowPostForm] = useState(false);

  if (!user || user.role !== "recruiter") {
    navigate("/login");
    return null;
  }

  const stats = [
    { icon: Briefcase, label: "Posted Jobs", value: "3" },
    { icon: Users, label: "Total Applicants", value: "73" },
    { icon: Eye, label: "Total Views", value: "977" },
    { icon: TrendingUp, label: "Hire Rate", value: "12%" },
  ];

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Job posted successfully!");
    setShowPostForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>
        <Button variant="hero" onClick={() => setShowPostForm(!showPostForm)}>
          <Plus className="h-4 w-4" /> Post a Job
        </Button>
      </div>

      {/* Post form */}
      {showPostForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-8 rounded-xl border bg-card p-6"
        >
          <h2 className="font-display text-xl font-semibold mb-4">Post New Job</h2>
          <form onSubmit={handlePost} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Job Title</Label><Input placeholder="e.g. Senior Developer" required /></div>
              <div className="space-y-2"><Label>Company</Label><Input placeholder="Your company" required /></div>
              <div className="space-y-2"><Label>Location</Label><Input placeholder="City, State" required /></div>
              <div className="space-y-2"><Label>Salary Range</Label><Input placeholder="$100k – $150k" /></div>
            </div>
            <div className="space-y-2"><Label>Description</Label><Textarea rows={4} placeholder="Describe the role..." required /></div>
            <div className="flex gap-2">
              <Button type="submit" variant="accent">Publish Job</Button>
              <Button type="button" variant="ghost" onClick={() => setShowPostForm(false)}>Cancel</Button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border bg-card p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <s.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Posted Jobs */}
      <div className="mt-10">
        <h2 className="font-display text-xl font-semibold mb-4">Your Job Listings</h2>
        <div className="space-y-3">
          {mockPostedJobs.map((job) => (
            <div key={job.id} className="flex flex-col gap-3 rounded-xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.applicants} applicants · {job.views} views</p>
              </div>
              <Badge className={`${statusColors[job.status]} border-0 w-fit`}>{job.status}</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Applicants */}
      <div className="mt-10">
        <h2 className="font-display text-xl font-semibold mb-4">Recent Applicants</h2>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-secondary/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Applied For</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockApplicants.map((a, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{a.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{a.role}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{a.date}</td>
                  <td className="px-4 py-3">
                    <Badge className={`${statusColors[a.status]} border-0`}>{a.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
