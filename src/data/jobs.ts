export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  logo: string;
  category: string;
}

export const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechFlow Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$140k – $180k",
    posted: "2 days ago",
    description: "We're looking for a Senior Frontend Developer to lead the development of our next-generation web platform. You'll work closely with design and product teams to build beautiful, performant user interfaces.",
    requirements: ["5+ years React experience", "TypeScript proficiency", "Experience with design systems", "Strong CSS/Tailwind skills"],
    logo: "TF",
    category: "Engineering",
  },
  {
    id: "2",
    title: "Product Designer",
    company: "CreativeSpace",
    location: "New York, NY",
    type: "Full-time",
    salary: "$120k – $155k",
    posted: "1 day ago",
    description: "Join our design team to create intuitive and beautiful products that millions of people use every day. You'll own the end-to-end design process from research to high-fidelity prototypes.",
    requirements: ["3+ years product design", "Figma expertise", "User research skills", "Design system experience"],
    logo: "CS",
    category: "Design",
  },
  {
    id: "3",
    title: "Backend Engineer",
    company: "DataPulse",
    location: "Austin, TX",
    type: "Remote",
    salary: "$130k – $170k",
    posted: "3 days ago",
    description: "Build scalable microservices and APIs that power our data analytics platform. You'll work with cutting-edge technologies and handle millions of events per second.",
    requirements: ["Node.js or Python", "PostgreSQL/MongoDB", "AWS/GCP experience", "API design"],
    logo: "DP",
    category: "Engineering",
  },
  {
    id: "4",
    title: "Marketing Manager",
    company: "GrowthLab",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$95k – $125k",
    posted: "5 days ago",
    description: "Drive our growth strategy across multiple channels. You'll be responsible for planning and executing marketing campaigns that increase brand awareness and drive customer acquisition.",
    requirements: ["5+ years marketing experience", "Data-driven mindset", "Team leadership", "Content strategy"],
    logo: "GL",
    category: "Marketing",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "CloudNine Systems",
    location: "Seattle, WA",
    type: "Contract",
    salary: "$150k – $190k",
    posted: "1 week ago",
    description: "Automate and optimize our cloud infrastructure. You'll design CI/CD pipelines, manage Kubernetes clusters, and ensure 99.99% uptime for our platform.",
    requirements: ["Kubernetes expertise", "Terraform/IaC", "CI/CD pipelines", "Monitoring & observability"],
    logo: "CN",
    category: "Engineering",
  },
  {
    id: "6",
    title: "Data Scientist",
    company: "InsightAI",
    location: "Boston, MA",
    type: "Remote",
    salary: "$135k – $175k",
    posted: "4 days ago",
    description: "Apply machine learning and statistical methods to solve complex business problems. You'll work with large datasets to uncover insights that drive strategic decisions.",
    requirements: ["Python/R proficiency", "ML frameworks (PyTorch/TensorFlow)", "SQL expertise", "Statistical modeling"],
    logo: "IA",
    category: "Data Science",
  },
];

export const categories = ["All", "Engineering", "Design", "Marketing", "Data Science"];
