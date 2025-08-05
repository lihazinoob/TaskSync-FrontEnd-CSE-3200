import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const LeftPane = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-6">
      <Button size="lg" asChild>
        <Link to="/signup">Get Started</Link>
      </Button>
      <Button variant="outline" size="lg" asChild>
        <Link to="/login">
          Explore Features
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default LeftPane; 