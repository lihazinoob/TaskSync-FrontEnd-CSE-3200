import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Trash2 } from "lucide-react";

const CompanyForm = ({
  isOpen,
  onClose,
  formData,
  errors,
  isLoading,
  industryOptions,
  handleChange,
  handleIndustryChange,
  onSubmit,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create Company
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Company Name */}
          <div className="space-y-2">
            <label htmlFor="companyName" className="text-sm font-medium">
              Company Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              className={errors.companyName ? "border-red-500" : ""}
              aria-invalid={!!errors.companyName}
              disabled={isLoading}
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
            )}
          </div>

          {/* Company description */}
          <div className="space-y-2">
            <label htmlFor="descriptions" className="text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="descriptions"
              name="descriptions"
              value={formData.descriptions}
              onChange={handleChange}
              placeholder="Enter company description"
              className={errors.descriptions ? "border-red-500" : ""}
              aria-invalid={!!errors.descriptions}
              disabled={isLoading}
            />
            {errors.descriptions && (
              <p className="text-red-500 text-xs mt-1">{errors.descriptions}</p>
            )}
          </div>

          {/* Company Industry */}
          <div className="space-y-2">
            <label htmlFor="industry" className="text-sm font-medium">
              Industry <span className="text-red-500">*</span>
            </label>
            <Select
              value={formData.industry}
              onValueChange={handleIndustryChange}
              disabled={isLoading}
            >
              <SelectTrigger
                className={`w-full ${errors.industry ? "border-red-500" : ""}`}
                aria-invalid={!!errors.industry}
              >
                <SelectValue placeholder="Select an industry" />
              </SelectTrigger>
              <SelectContent>
                {industryOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.industry && (
              <p className="text-red-500 text-xs mt-1">{errors.industry}</p>
            )}
          </div>

          {/* Company Location */}
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location <span className="text-red-500">*</span>
            </label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter company location"
              className={errors.location ? "border-red-500" : ""}
              aria-invalid={!!errors.location}
              disabled={isLoading}
            />
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">{errors.location}</p>
            )}
          </div>

          {/* Number of employees field */}
          <div className="space-y-2">
            <label htmlFor="numberofEmployees" className="text-sm font-medium">
              Number of Employees <span className="text-red-500">*</span>
            </label>
            <Input
              id="numberofEmployees"
              name="numberofEmployees"
              type="number"
              value={formData.numberofEmployees}
              placeholder="Number of Employees"
              onChange={handleChange}
              className={errors.numberofEmployees ? "border-red-500" : ""}
              aria-invalid={!!errors.numberofEmployees}
              disabled={isLoading}
            ></Input>
          </div>

          {/* Contact Email */}
          <div className="space-y-2">
            <label htmlFor="contactEmail" className="text-sm font-medium">
              Contact Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="Enter contact email"
              className={errors.contactEmail ? "border-red-500" : ""}
              aria-invalid={!!errors.contactEmail}
              disabled={isLoading}
            />
            {errors.contactEmail && (
              <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>
            )}
          </div>

          {/* Company Image Upload */}

          <div className="space-y-2">
            <label htmlFor="companyImage" className="text-sm font-medium">
              Company Image
            </label>
            <div className="w-full h-48 border-2 border-dashed border-gray-300 flex items-center justify-center relative rounded-md">
              {formData.companyImage ? (
                <div className="h-full w-full relative">
                  <img
                    src={URL.createObjectURL(formData.companyImage)}
                    alt="comapnyImage"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-white  p-1 rounded-full"
                    onClick={() =>
                      handleChange({
                        target: { name: "companyImage", value: null },
                      })
                    }
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center text-gray-500 cursor-pointer">
                  <ImagePlus className="w-8 h-8 mb-2" />
                  <span>Add Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleChange({
                        target: { name: "companyImage", value: e.target.files?.[0] },
                      })
                    }
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Company"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyForm;
