import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getEmployeesOfCompany } from "@/service/api/company";
import { format } from "date-fns";
import React, { useEffect,useState } from "react";
import { toast } from "sonner";

const CompanyemployeeList = ({ companyId }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!companyId) return;

    const fetchEmployees = async () => {
      setLoading(true);
      const response = await getEmployeesOfCompany(companyId);
      if (response.success) {
        setEmployees(response.data);
      } else {
        toast.error("Failed to load employees", {
          description: response.message,
        });
        console.error("Failed to fetch employees:", response.message);
      }
      setLoading(false);
    };

    fetchEmployees();
  }, [companyId]);

  if (loading) {
    return (
      <div className="rounded-xl bg-card p-5 h-full flex flex-col">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 p-2 animate-pulse">
              <div className="h-10 w-10 bg-secondary rounded-full"></div>
              <div className="flex-1">
                <div className="h-5 w-1/3 bg-secondary rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-secondary/60 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="rounded-xl bg-card p-5 h-full flex flex-col">
        <p className="text-muted-foreground">
          No employees found for this company.
        </p>
      </div>
    );
  }
  

  return (
    <div className="rounded-xl bg-card p-5 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Company Employees</h3>

      <div className="flex flex-col gap-4 flex-1">
        {employees.map((employee) => (
          <div key={employee.id} className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={employee.profileImage} alt={employee.username} />
              <AvatarFallback>
                {employee.username?.charAt(0).toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{employee.username}</p>
              <p className="text-sm text-muted-foreground truncate">
                {employee.jobTitle} ({employee.role}) - Hired on{" "}
                {format(new Date(employee.hiringDate), "MMM d, yyyy")}
              </p>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default CompanyemployeeList;
