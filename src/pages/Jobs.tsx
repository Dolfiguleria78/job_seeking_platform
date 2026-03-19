import { useState } from "react";
import { useJobs, categories } from "@/hooks/useJobs";
import JobCard from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { data: filtered = [], isLoading } = useJobs({ search, category });

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Browse Jobs</h1>
      <p className="mt-1 text-muted-foreground">Find your perfect role</p>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search jobs or companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                category === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-xl bg-secondary" />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job, i) => (
            <JobCard key={job.id} job={job} index={i} />
          ))}
        </div>
      )}
      {!isLoading && filtered.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">No jobs found. Try adjusting your filters.</p>
      )}
    </div>
  );
};

export default Jobs;
