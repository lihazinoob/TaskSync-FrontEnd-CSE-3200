import { useAuth } from "@/contexts/AuthProvider";
import { fetchCompanies as fetchCompaniesAPI } from "@/service/api/company";
import { Loader } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import CompanyLeftPanel from "./CompanyLeftPanel";
import CompanyRightPanel from "./CompanyRightPanel";
import { toast } from "sonner";
import { fetchCompaniesCreatedByUser } from "@/service/api/company";

const CompanyBoard = ({ refreshTrigger, onCreateClick }) => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  // state for tracking which company is selected
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { user } = useAuth();

  const userId = user ? user.id : null;

  const fetchCompanies = useCallback(async () => {
    setIsLoading(true);
    try {
          const response = await fetchCompaniesCreatedByUser(userId);
          const data = response.data || [];
          console.log("Fetched companies of a kazi is", data);

          if (response.success) {
            setCompanies(data);
            if (data.length > 0 && !selectedCompany) {
              setSelectedCompany(data[0]);
            }
          } else {
            toast.error(data.message || "Failed to fetch companies.");
            console.error("Failed to fetch companies:", data.message);
            setCompanies([]);
            setSelectedCompany(null);
          }
        } catch (error) {
          toast.error("An error occurred while fetching companies.");
          console.error("Error fetching companies:", error);
          setCompanies([]);
          setSelectedCompany(null);
        } finally {
          setIsLoading(false);
        }
  }, [userId]);

  // function to handle company selection
  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
  };

  useEffect(() => {
    if (userId) {
      fetchCompanies();
    } else {
      setCompanies([]);
      setSelectedCompany(null);
      setIsLoading(false);
    }
  }, [userId, fetchCompanies, refreshTrigger]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="h-8 w-8 animate-spin text-primary" />{" "}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 p-4">
      {/* Left panel - 1/3 width */}
      <div className="w-full lg:w-1/3">
        <CompanyLeftPanel
          companies={companies}
          handleOpenDialog={onCreateClick}
          onSelectCompany={handleCompanySelect}
          selectedCompany={selectedCompany}
        />
      </div>

      {/* Right panel - 2/3 width */}
      <div className="w-full lg:w-2/3">
        <CompanyRightPanel selectedCompany={selectedCompany} />{" "}
      </div>
    </div>
  );
};

export default CompanyBoard;
