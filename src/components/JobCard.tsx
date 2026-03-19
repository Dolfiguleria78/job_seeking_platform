import { Link } from "react-router-dom";
import { Job } from "@/data/jobs";
import { MapPin, Clock, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface JobCardProps {
  job: Job;
  index?: number;
}

const typeColors: Record<string, string> = {
  "Full-time": "bg-success/10 text-success",
  "Part-time": "bg-warning/10 text-warning",
  Contract: "bg-accent/10 text-accent",
  Remote: "bg-primary/10 text-primary",
};

const JobCard = ({ job, index = 0 }: JobCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, duration: 0.4 }}
  >
    <Link to={`/jobs/${job.id}`}>
      <div className="group rounded-xl border bg-card p-5 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground">
            {job.logo}
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-body text-base font-semibold text-foreground group-hover:text-accent transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-muted-foreground">{job.company}</p>
          </div>
          <Badge className={`${typeColors[job.type]} border-0 font-medium`}>
            {job.type}
          </Badge>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
          <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />{job.salary}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{job.posted}</span>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default JobCard;
