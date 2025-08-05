import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchCountryInformations } from "@/service/utils/fetchCountryInformation";


const PersonalInformationForm = ({
  isOpen,
  onClose,
  formData,
  handleChange,
  onSubmit,
}) => {

  // state to track the countryInformations
  const [countries, setCountries] = React.useState([]);
  // useEffect to fetch country information
  React.useEffect(()=>{
    const getCountries = async () => {
      const countryResult = await fetchCountryInformations();
      setCountries(countryResult);
    };
    getCountries();
  },[])



  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Personal Information</DialogTitle>
          </DialogHeader>

          {/* Parent Form Container */}
          <div className="grid gap-4 py-4">
            {/* First Name */}
            <div>
              <label className="text-sm font-medium">First Name</label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                // disabled={isLoading}
              />
            </div>
            {/* Last Name */}
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                // disabled={isLoading}
              />
            </div>

            {/* UserName */}
            <div>
              <label className="text-sm font-medium">Username</label>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                // disabled={isLoading}
              />
            </div>

            {/* Country */}
            <div>
              <label className="text-sm font-medium">Country</label>
              <Select
                value={formData.country}
                onValueChange={(value) =>
                  handleChange({ target: { name: "country", value } })
                }
              >
                <SelectTrigger className={"w-full"}>
                  <SelectValue placeholder="Select a Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.label}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                // disabled={isLoading}
              />
            </div>

            {/* Industry */}
            <div>
              <label className="text-sm font-medium">Industry</label>
              <Input
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                // disabled={isLoading}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant={"outline"} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onSubmit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PersonalInformationForm;
