import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building } from "lucide-react";
import CompanyCard from "./CompanyCard";
import CompanyHeader from "./CompanyHeader";

const CompanyLeftPanel = ({ companies, handleOpenDialog, onSelectCompany,selectedCompany}) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-center gap-2">
          <Building className="h-8 w-8" />
          <h2 className="text-xl font-semibold">Companies</h2>
          <CompanyHeader onCreateClick={handleOpenDialog} />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <ScrollArea className="h-[calc(100vh-220px)]">
          {companies && companies.length > 0 ? (
            companies.map((company) => (
              <CompanyCard 
              key={company.id} 
              company={company}
              onSelectCompany={onSelectCompany}
              isSelected={selectedCompany?.id === company.id}              
              />
            ))
          ) : (
            <p className="text-muted-foreground text-center py-4">
              No companies found
            </p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CompanyLeftPanel;
