import { Briefcase } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card py-10">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Briefcase className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold">JobFlow</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} JobFlow. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
