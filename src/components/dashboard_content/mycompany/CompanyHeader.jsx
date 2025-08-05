import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const CompanyHeader = ({ onCreateClick }) => {
  return (
    <div className="flex justify-end items-center pb-4 w-full">
      <Button onClick={onCreateClick} className="h-11 w-20 md:w-auto">
        <PlusCircle className="mr-2 h-4 w-4" /> Create Company
      </Button>
    </div>
  );
};

export default CompanyHeader;
