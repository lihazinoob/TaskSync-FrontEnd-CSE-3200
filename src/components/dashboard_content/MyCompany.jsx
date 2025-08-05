import { createCompany } from "@/service/api/company";
import { Building2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DashboardHeader from "./common/DashboardHeader";
import TabTitle from "./common/TabTitle";
import CompanyBoard from "./mycompany/CompanyBoard";
import CompanyForm from "./mycompany/CompanyForm";
import { uploadToCloudinary } from "@/service/utils/uploadToCloudinary";

// Industry options for the select dropdown
const industryOptions = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Media",
  "Transportation",
  "Construction",
  "Other",
];

const MyCompany = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [companyAdded, setCompanyAdded] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    descriptions: "",
    industry: "",
    location: "",
    contactEmail: "",
    numberofEmployees: "",
    companyImage: null,
  });
  const [errors, setErrors] = useState({
    companyName: "",
    descriptions: "",
    industry: "",
    location: "",
    numberofEmployees: "",
    contactEmail: "",
  });

  const validateField = (name, value) => {
    switch (name) {
      case "companyName":
        return value.trim() ? "" : "Company name is required";
      case "descriptions":
        return value.trim() ? "" : "Description is required";
      case "industry":
        return value ? "" : "Please select an industry";
      case "location":
        return value.trim() ? "" : "Location is required";
      case "numberofEmployees":
        return value.trim() ? "" : "Number of employees is required";
      case "contactEmail": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return "Email is required";
        if (!emailRegex.test(value)) return "Please enter a valid email";
        return "";
      }
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {
      companyName: validateField("companyName", formData.companyName),
      descriptions: validateField("descriptions", formData.descriptions),
      industry: validateField("industry", formData.industry),
      location: validateField("location", formData.location),
      numberofEmployees: validateField(
        "numberofEmployees",
        formData.numberofEmployees
      ),
      contactEmail: validateField("contactEmail", formData.contactEmail),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleIndustryChange = (value) => {
    setFormData({ ...formData, industry: value });
    setErrors({ ...errors, industry: validateField("industry", value) });
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setFormData({
      companyName: "",
      descriptions: "",
      industry: "",
      location: "",
      numberofEmployees: "",
      contactEmail: "",
    });
    setErrors({
      companyName: "",
      descriptions: "",
      industry: "",
      location: "",
      numberofEmployees: "",
      contactEmail: "",
    });
    setIsDialogOpen(false);
  };

  const handleCompanyAdded = () => {
    setCompanyAdded((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      let imageURL = "";
      if (formData.companyImage) {
        imageURL = await uploadToCloudinary(formData.companyImage);
      }

      const { companyImage, ...restFormData } = formData;

      const payload = {
        ...restFormData,
        companyImageURL: imageURL,
      };
      console.log("Payload to create company:", payload);

      const response = await createCompany(payload);
      if (response.success) {
        toast.success("Company created successfully!");
        setFormData({
          companyName: "",
          descriptions: "",
          industry: "",
          location: "",
          numberofEmployees: "",
          contactEmail: "",
        });
        setIsDialogOpen(false);
        handleCompanyAdded();
      } else {
        toast.error(response.message || "Failed to create company.");
        console.error("Failed to create company:", response.message);
      }
    } catch (error) {
      toast.error("An error occurred while creating the company.");
      console.error("Error creating company:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <DashboardHeader title="Company" breadcrumb="All Companies" />
      <div className="flex flex-col gap-4 p-4 pt-0">
        <TabTitle title="My Company" icon={<Building2 />} />

        <CompanyBoard
          refreshTrigger={companyAdded}
          onCreateClick={handleOpenDialog}
        />

        <CompanyForm
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          formData={formData}
          errors={errors}
          isLoading={isLoading}
          industryOptions={industryOptions}
          handleChange={handleChange}
          handleIndustryChange={handleIndustryChange}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default MyCompany;
