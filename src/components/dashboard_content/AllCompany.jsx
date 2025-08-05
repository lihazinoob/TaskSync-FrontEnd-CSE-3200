import { Building2 } from "lucide-react";
import { useState,useEffect } from "react";
import DashboardHeader from "./common/DashboardHeader";
import TabTitle from "./common/TabTitle";
import CompanyList from "./company/allcompany/CompanyList";
import { companyData } from "./company/allcompany/mockData";
import { fetchCompanies } from "@/service/api/company";

const AllCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    const getComapnies = async () =>{
      const result = await fetchCompanies();
      if(result.success){
        setCompanies(result.data);
      }
      setIsLoading(false);
    }
    getComapnies();
  },[])




  return (
    <>
      <DashboardHeader title="Company" breadcrumb="All Companies" />
      <div className="flex flex-col gap-4 p-4 pt-0">
        <TabTitle title="All Companies" icon={<Building2 />} />
        <CompanyList companies={companies} />
      </div>
    </>
  );
};

export default AllCompany;
