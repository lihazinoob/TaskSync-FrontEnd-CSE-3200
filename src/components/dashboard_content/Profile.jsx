import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import PersonalInformationForm from "./myprofile/PersonalInformationForm";
import { useAuth } from "@/contexts/AuthProvider";
import {
  Clock,
  FileText,
  Languages,
  Layers,
  MapPin,
  Phone,
  Plus,
  Sparkles,
  Star,
  User,
  UserCheck,
  Verified,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DashboardHeader from "./common/DashboardHeader";
import TabTitle from "./common/TabTitle";
import { Button } from "../ui/button";
import { updateUserStatus, uploadProfilePicture } from "@/service/api/user";
import { uploadToCloudinary } from "@/service/utils/uploadToCloudinary";
import { toast } from "sonner";

// Component to display a field with icon, even if null
const ProfileField = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 p-3 rounded-md border">
    <Icon className="text-muted-foreground h-5 w-5 shrink-0" />
    <div className="w-full">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value !== null ? value : "Not available"}</p>
    </div>
  </div>
);

const Profile = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  // state to track if the PersonalInformationForm is open or not
  const [isPersoanlInformationFormOpen, setIsPersoanlInformationFormOpen] =
    useState(false);

  // state to track the profile Image
  const [profileImage, setProfileImage] = useState(user.profileImage || null);

  // refernece to the file input for profile image upload
  const fileInputRef = useRef(null);

  // function to handle the click on the plus icon to open file input
  const handlePlusClick = () => {
    fileInputRef.current?.click();
  };

  // function to handle the image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    // If no file is selected, do nothing
    if (!file) {
      return;
    }

    // view the image before uploading
    const previewUrl = URL.createObjectURL(file);

    // upload the image to Cloudinary
    try {
      const cloudinaryResponse = await uploadToCloudinary(file);
      // Update the user profile image with the uploaded image URL
      const profileImageUploadResponse = await uploadProfilePicture(
        cloudinaryResponse.url
      );
      if (profileImageUploadResponse.success) {
        setProfileImage(previewUrl);
        toast.success(profileImageUploadResponse.message);
      }
      else {
        // If upload fails, revert to the original profile image
        setProfileImage(user.profileImage || null);
        URL.revokeObjectURL(previewUrl);
        toast.error(profileImageUploadResponse.message);
      }
    } catch (error) {
      // revert to the original profile image if upload fails
      setProfileImage(user.profileImage || null);
      URL.revokeObjectURL(previewUrl);
      console.error("Image upload failed:", error);
      toast.error("Failed to upload profile image. Please try again.");
    }
  };

  // state to track the formData of personal Information
  const [personalInformationFormData, setPersonalInformationFormData] =
    useState({
      firstName: "",
      lastName: "",
      username: "",
      country: "",
      phoneNumber: "",
      industry: "",
    });

  // state to track the formData of status Information
  const [statusInformationData, setIsStatusInformationData] = useState({
    accountStatus: "",
    availabilityStatus: "",
    experienceYears: "",
    preferredWorkingHours: "", // e.g., "09:00-17:00 EST"
    preferredStartTime: "", // e.g., "09:00"
    preferredStartPeriod: "", // e.g., "AM" or "PM"
    preferredEndTime: "", // e.g., "17:00"
    preferredEndPeriod: "", // e.g., "AM" or "PM"
    language: "",
  });

  // state to track the original status information with which the changed status information will be compared
  const [originalStatusInformationData, setOriginalStatusInformationData] =
    useState(null);

  // Parse API provided preferredWorking Hours
  const parsePreferredWorkingHours = (hoursString) => {
    if (!hoursString || typeof hoursString !== "string") {
      return {
        startTime: "09:00",
        startPeriod: "AM",
        endTime: "05:00",
        endPeriod: "PM",
      };
    }

    const regex = /^(\d{1,2}(?:AM|PM))-(\d{1,2}(?:AM|PM))\s*EST$/i;
    const match = hoursString.match(regex);
    if (!match) {
      return {
        startTime: "09:00",
        startPeriod: "AM",
        endTime: "05:00",
        endPeriod: "PM",
      };
    }
    const [, start, end] = match;

    const convertTo12Hour = (time) => {
      const [hour, period] = time.match(/(\d{1,2})(AM|PM)/).slice(1);
      const hourInt = parseInt(hour);
      if (hourInt === 12) hourInt = 0;
      return {
        time: `${hourInt.toString().padStart(2, "0")}:00`,
        period,
      };
    };
    const startParsed = convertTo12Hour(start);
    const endParsed = convertTo12Hour(end);

    return {
      startTime: startParsed.time,
      startPeriod: startParsed.period,
      endTime: endParsed.time,
      endPeriod: endParsed.period,
    };
  };

  // Normalize availabilityStatus to title case
  const normalizeAvailabilityStatus = (status) => {
    if (!status) return "Available";
    const statusMap = {
      available: "Available",
      busy: "Busy",
      "on leave": "On Leave",
    };
    return statusMap[status.toLowerCase()] || "Available";
  };

  // Set loading state when user data is available
  useEffect(() => {
    if (user) {
      console.log("User data loaded", user);
      setPersonalInformationFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        country: user.country || "",
        phoneNumber: user.phoneNumber || "",
        industry: user.industry || "",
      });
      const { startTime, startPeriod, endTime, endPeriod } =
        parsePreferredWorkingHours(user.preferredWorkingHours);

      const statusData = {
        accountStatus: user.accountStatus || "Active",
        availabilityStatus: user.availabilityStatus || "Available",
        experienceYears: user.experienceYears || 0,
        preferredWorkingHours: user.preferredWorkingHours || "9AM-5PM EST",
        preferredStartTime: startTime || "09:00",
        preferredStartPeriod: startPeriod || "AM",
        preferredEndTime: endTime || "17:00",
        preferredEndPeriod: endPeriod || "PM",
        language: user.language || "English",
      };

      setIsStatusInformationData(statusData);
      setOriginalStatusInformationData(statusData);
      setIsLoading(false);
    }
    console.log("Status Information Loaded", statusInformationData);
  }, [user]);

  // Format the inputted time into backend format
  const formatPreferredWorkingHours = (
    startTime,
    startPeriod,
    endTime,
    endPeriod
  ) => {
    if (!startTime || !endTime || !startPeriod || !endPeriod) {
      return "9AM-5PM EST";
    }
    const formatTime = (time, period) => {
      const [hour] = time.split(":").map(Number);
      const hour12 = hour === 0 ? 12 : hour;
      return `${hour12}${period}`;
    };
    return `${formatTime(startTime, startPeriod)}-${formatTime(
      endTime,
      endPeriod
    )} EST`;
  };

  // function to handle change in the personal information form
  const handlePersonalInformationChange = (e) => {
    const { name, value } = e.target;
    setPersonalInformationFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle changes in status information
  const handleStatusInformationChange = (field, value) => {
    setIsStatusInformationData((prevData) => {
      const newData = { ...prevData, [field]: value };
      if (
        field === "preferredStartTime" ||
        field === "preferredStartPeriod" ||
        field === "preferredEndTime" ||
        field === "preferredEndPeriod"
      ) {
        newData.preferredWorkingHours = formatPreferredWorkingHours(
          field === "preferredStartTime" ? value : prevData.preferredStartTime,
          field === "preferredStartPeriod"
            ? value
            : prevData.preferredStartPeriod,
          field === "preferredEndTime" ? value : prevData.preferredEndTime,
          field === "preferredEndPeriod" ? value : prevData.preferredEndPeriod
        );
      }
      return newData;
    });
  };

  // Detect changes in status information
  const hasStatusInformationChanged = () => {
    if (!originalStatusInformationData) return false;
    return Object.keys(statusInformationData).some((key) => {
      return (
        String(statusInformationData[key]).trim().toLowerCase() !==
        String(originalStatusInformationData[key]).trim().toLowerCase()
      );
    });
  };

  // function to handle personal information form submission
  const handlePersonalInformationSubmit = () => {
    // Here you would typically send the updated data to your backend
    console.log("Updated Personal Information:", personalInformationFormData);

    // Close the form dialog after submission
    setIsPersoanlInformationFormOpen(false);
  };

  // function to handle status information submission
  const handleStatusInformationSubmit = async () => {
    const submitData = {
      accountStatus: statusInformationData.accountStatus,
      availabilityStatus:
        statusInformationData.availabilityStatus.toLowerCase(),
      experienceYears: parseInt(statusInformationData.experienceYears) || 0,
      preferredWorkingHours: statusInformationData.preferredWorkingHours,
      language: statusInformationData.language,
    };
    console.log("Submitting Status Information:", submitData);
    // Here you would typically send the updated status information to your backend
    const result = await updateUserStatus(user.username, submitData);

    if (result.success) {
      console.log("Status updated successfully:", result.data);
      setOriginalStatusInformationData(statusInformationData);
    } else {
      console.error("Failed to update status:", result.message);
      // Optionally show an error message to the user
    }

    // Update the original status information to the new one after submission
    setOriginalStatusInformationData(statusInformationData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Format display name
  const displayName = `${personalInformationFormData.firstName || ""} ${
    personalInformationFormData.lastName || ""
  }`.trim();

  return (
    <>
      <DashboardHeader title="Profile" breadcrumb="Profile" />
      <div className="flex flex-col gap-8 p-4 pt-0">
        <TabTitle title="Profile" icon={<User />} />

        {/* Profile Banner & Image Section */}
        <div className="relative rounded-xl overflow-hidden bg-card border">
          <div className="h-40 bg-gradient-to-r from-primary/30 to-primary/10"></div>
          <div className="absolute top-24 left-6 border-4 border-background rounded-full bg-background">
            <div className="relative w-32 h-32 rounded-full flex items-center justify-center bg-primary/10 text-primary">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={displayName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User size={48} />
              )}
              <button
                className="absolute top-0 right-0 bg-background rounded-full p-1 border-2 border-primary"
                onClick={handlePlusClick}
                title="Upload Profile Image"
              >
                <Plus size={20} className="text-primary" />
              </button>
              {/* Hidden file input*/}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>
          <div className="pt-20 pb-6 px-6">
            <h2 className="text-2xl font-bold">
              {displayName || user.username}
            </h2>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-xs text-muted-foreground mt-1">
              User ID: {user.id}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Personal Information */}
          <Card className="lg:col-span-6">
            <CardHeader className="pb-3 flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" /> Personal Information
              </CardTitle>
              {/* A button will be here which will be used to show a dialogue to edit personal information */}
              <Button
                variant="outline"
                onClick={() => setIsPersoanlInformationFormOpen(true)}
                className="mt-2"
              >
                Edit
              </Button>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfileField
                  icon={User}
                  label="First Name"
                  value={
                    personalInformationFormData.firstName ||
                    user.firstName ||
                    ""
                  }
                />
                <ProfileField
                  icon={User}
                  label="Last Name"
                  value={
                    personalInformationFormData.lastName || user.lastName || ""
                  }
                />
                <ProfileField
                  icon={User}
                  label="Username"
                  value={
                    personalInformationFormData.username || user.username || ""
                  }
                />
                <ProfileField
                  icon={MapPin}
                  label="Country"
                  value={
                    personalInformationFormData.country || user.country || ""
                  }
                />
                <ProfileField
                  icon={Phone}
                  label="Phone Number"
                  value={
                    personalInformationFormData.phoneNumber ||
                    user.phoneNumber ||
                    ""
                  }
                />
                <ProfileField
                  icon={Layers}
                  label="Industry"
                  value={
                    personalInformationFormData.industry || user.industry || ""
                  }
                />
              </div>
            </CardContent>
          </Card>
          {/* Personal Information Form Dialog */}

          {/* Status Information */}
          <Card className="lg:col-span-6">
            <CardHeader className="pb-3 flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" /> Status & Experience
              </CardTitle>
              {hasStatusInformationChanged() && (
                <Button onClick={handleStatusInformationSubmit}>Save</Button>
              )}
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Account Status Information */}
                <div>
                  <label className="text-sm font-medium">Account Status</label>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded-full ${
                        statusInformationData.accountStatus === "Active"
                          ? "bg-green-500"
                          : statusInformationData.accountStatus === "Inactive"
                          ? "bg-yellow-500"
                          : statusInformationData.accountStatus === "Suspended"
                          ? "bg-red-500"
                          : "bg-gray-500" // Fallback for unexpected status
                      }`}
                    >
                      {statusInformationData.accountStatus}
                    </span>
                  </div>
                </div>

                {/* Availability Information */}
                <Select
                  value={statusInformationData.availabilityStatus}
                  onValueChange={(val) =>
                    handleStatusInformationChange("availabilityStatus", val)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Availability Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Busy">Busy</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>

                {/* Experience Information */}

                <div>
                  <label className="text-sm font-medium">
                    Experience (Years)
                  </label>
                  <Input
                    type="number"
                    value={statusInformationData.experienceYears}
                    onChange={(e) =>
                      handleStatusInformationChange(
                        "experienceYears",
                        e.target.value
                      )
                    }
                    min="0"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Language</label>
                  <Select
                    value={statusInformationData.language}
                    onValueChange={(val) =>
                      handleStatusInformationChange("language", val)
                    }
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Bengali">Bengali</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Preferred Working Hours */}

                <div>
                  <label className="text-sm font-medium">
                    Preferred Working Hours
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Input
                        type="time"
                        value={statusInformationData.preferredStartTime}
                        onChange={(e) =>
                          handleStatusInformationChange(
                            "preferredStartTime",
                            e.target.value
                          )
                        }
                        className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <Select
                        value={statusInformationData.preferredStartPeriod}
                        onValueChange={(val) =>
                          handleStatusInformationChange(
                            "preferredStartPeriod",
                            val
                          )
                        }
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AM">AM</SelectItem>
                          <SelectItem value="PM">PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <span className="text-muted-foreground">to</span>
                    <div className="flex items-center gap-1">
                      <Input
                        type="time"
                        value={statusInformationData.preferredEndTime}
                        onChange={(e) =>
                          handleStatusInformationChange(
                            "preferredEndTime",
                            e.target.value
                          )
                        }
                        className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <Select
                        value={statusInformationData.preferredEndPeriod}
                        onValueChange={(val) =>
                          handleStatusInformationChange(
                            "preferredEndPeriod",
                            val
                          )
                        }
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AM">AM</SelectItem>
                          <SelectItem value="PM">PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                {/* <ProfileField
                  icon={FileText}
                  label="Last Evaluation Date"
                  value={user.lastEvaluationDate}
                /> */}
              </div>
            </CardContent>
          </Card>

          {/* Projects & Performance */}
          {/* <Card className="lg:col-span-12">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" /> Projects & Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ProfileField
                  icon={Layers}
                  label="Ongoing Projects"
                  value={user.ongoingProjects}
                />
                <ProfileField
                  icon={Verified}
                  label="Completed Projects"
                  value={user.completedProjects}
                />
                <ProfileField
                  icon={Star}
                  label="Performance Rating"
                  value={
                    user.performanceRating
                      ? `${user.performanceRating}/10`
                      : null
                  }
                />
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>

      <PersonalInformationForm
        isOpen={isPersoanlInformationFormOpen}
        onClose={() => setIsPersoanlInformationFormOpen(false)}
        formData={personalInformationFormData}
        handleChange={handlePersonalInformationChange}
        onSubmit={handlePersonalInformationSubmit}
      />
    </>
  );
};

export default Profile;
