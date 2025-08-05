import { useState } from "react";
import CompanyCard from "./CompanyCard";
import CompanyDetailSidebar from "./CompanyDetailSidebar";

const CompanyList = ({ companies }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCardClick = (company) => {
    setSelectedCompany(company);
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };
;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company, index) => (
          <CompanyCard
            key={company.id || index}
            company={{
              logo: "", // or a default logo URL if you have
              name: company.companyName,
              status: "Active", // or compute based on business logic
              description: company.descriptions,
              tags: [company.industry], // optional
              foundedYear: new Date(company.createdAt).getFullYear(), // e.g., 2025
              employeeRange: company.noOfEmployee,
              valuation: "N/A", // optional
            }}
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      {selectedCompany && (
        <CompanyDetailSidebar
          company={selectedCompany}
          isOpen={sidebarOpen}
          onClose={handleCloseSidebar}
        />
      )}
    </>
  );
};

export default CompanyList;
