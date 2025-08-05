import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BuildingIcon } from "lucide-react";

const CompanyCard = ({ company,onSelectCompany }) => {
  return (
    <Card 
    className="cursor-pointer mb-3 transition-all hover:shadow-md"
    onClick={() => onSelectCompany(company)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <BuildingIcon className="h-6 w-6 text-primary" />
          <span className="text-sm text-primary">
            {company.location || "Location not specified"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">{company.companyName}</h3>
            <p className="text-primary/50 text-sm">{company.descriptions}</p>
            <Badge variant="secondary" className="mt-1 bg-purple-700 text-white">
              {company.industry}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
