import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CalendarIcon, Plus, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { fetchAllSkills } from "@/service/api/skills";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthProvider";
import { createJob } from "@/service/api/jobs";

const JobTypeOptions = [
  { value: "FULL_TIME", label: "Full-Time" },
  { value: "PART_TIME", label: "Part-Time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "INTERNSHIP", label: "Internship" },
  { value: "TEMPORARY", label: "Temporary" },
];

const ProficiencyLevels = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "EXPERT", label: "Expert" },
];

const CreateJobModal = ({ isOpen, onClose, selectedCompany, onJobCreated }) => {
  
  const { user } = useAuth();
  
  // Skills state
  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [skillSearchTerm, setSkillSearchTerm] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    lowerSalary: "",
    upperSalary: "",
    jobType: "",
    applicationDeadline: null,
    skills: [], // Array of {skillId, skillName, proficiencyLevel}
  });

  // Loading and error states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch skills when modal opens
  useEffect(() => {
    const fetchSkills = async () => {
      if (!isOpen) return;
      
      setSkillsLoading(true);
      try {
        const response = await fetchAllSkills();
        if (response.success) {
          setSkills(response.data);
          console.log("Skills fetched:", response.data);
        } else {
          console.error("Failed to fetch skills:", response.message);
          toast.error("Failed to fetch skills");
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
        toast.error("Error fetching skills");
      } finally {
        setSkillsLoading(false);
      }
    };

    fetchSkills();
  }, [isOpen]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    // Clear error for the field
    if (errors[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }
  };

  // Handle skill selection
  const handleSkillToggle = (skill, isSelected) => {
    if (isSelected) {
      // Add skill with default proficiency
      const newSkill = {
        skillId: skill.skillId,
        skillName: skill.skillName,
        proficiencyLevel: "INTERMEDIATE", // Default proficiency
      };
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
    } else {
      // Remove skill
      setFormData(prev => ({
        ...prev,
        skills: prev.skills.filter(s => s.skillId !== skill.skillId)
      }));
    }
  };

  // Handle proficiency level change
  const handleProficiencyChange = (skillId, proficiencyLevel) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.skillId === skillId 
          ? { ...skill, proficiencyLevel }
          : skill
      )
    }));
  };

  // Remove selected skill
  const removeSkill = (skillId) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.skillId !== skillId)
    }));
  };

  // Check if skill is selected
  const isSkillSelected = (skillId) => {
    return formData.skills.some(skill => skill.skillId === skillId);
  };

  // Filter skills based on search
  const filteredSkills = skills.filter(skill =>
    skill.skillName.toLowerCase().includes(skillSearchTerm.toLowerCase())
  );

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }

    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = "Job description is required";
    }

    if (!formData.jobType) {
      newErrors.jobType = "Job type is required";
    }

    if (formData.lowerSalary && formData.upperSalary) {
      const lower = parseInt(formData.lowerSalary);
      const upper = parseInt(formData.upperSalary);
      if (lower >= upper) {
        newErrors.lowerSalary = "Lower salary must be less than upper salary";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    if (!selectedCompany) {
      toast.error("No company selected");
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare the exact payload format required by your API
      const payload = {
        jobTitle: formData.jobTitle,
        jobDescription: formData.jobDescription,
        lowerSalary: formData.lowerSalary ? parseInt(formData.lowerSalary) : null,
        upperSalary: formData.upperSalary ? parseInt(formData.upperSalary) : null,
        jobType: formData.jobType,
        applicationDeadline: formData.applicationDeadline 
          ? format(formData.applicationDeadline, "yyyy-MM-dd")
          : null,
        skills: formData.skills.map(skill => ({
          skillId: skill.skillId,
          proficiencyLevel: skill.proficiencyLevel
        }))
      };

      console.log("Creating job with payload:", payload);

      // TODO: Replace with your actual API call
      // const response = await createJob(payload);
      
      // Simulate API call for now
      const response = await createJob(payload, selectedCompany.id);

      if (response.success) {
        toast.success("Job posted successfully!");
        
        // Reset form
        setFormData({
          jobTitle: "",
          jobDescription: "",
          lowerSalary: "",
          upperSalary: "",
          jobType: "",
          applicationDeadline: null,
          skills: [],
        });
        setErrors({});
        setSkillSearchTerm("");

        // Call success callback
        if (onJobCreated) {
          onJobCreated(response.data);
        }
        
        onClose();
      } else {
        toast.error(response.message || "Failed to create job");
      }
    } catch (error) {
      console.error("Error creating job:", error);
      toast.error("Failed to create job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        jobTitle: "",
        jobDescription: "",
        lowerSalary: "",
        upperSalary: "",
        jobType: "",
        applicationDeadline: null,
        skills: [],
      });
      setErrors({});
      setSkillSearchTerm("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Job Posting
          </DialogTitle>
          <DialogDescription>
            Post a new job opening for{" "}
            <span className="font-semibold text-lg">
              {selectedCompany?.companyName || "your company"}
            </span>
            . Fill in the details below to attract the right candidates.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title *</Label>
            <Input
              id="jobTitle"
              placeholder="e.g. Senior Java Developer"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              className={errors.jobTitle ? "border-red-500" : ""}
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-sm">{errors.jobTitle}</p>
            )}
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description *</Label>
            <Textarea
              id="jobDescription"
              placeholder="Describe the role, responsibilities, and what makes this position exciting..."
              className={`min-h-[120px] ${errors.jobDescription ? "border-red-500" : ""}`}
              value={formData.jobDescription}
              onChange={(e) => handleInputChange("jobDescription", e.target.value)}
              rows={4}
            />
            {errors.jobDescription && (
              <p className="text-red-500 text-sm">{errors.jobDescription}</p>
            )}
          </div>

          {/* Salary Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lowerSalary">Lower Salary</Label>
              <Input
                id="lowerSalary"
                type="number"
                placeholder="e.g. 80000"
                value={formData.lowerSalary}
                onChange={(e) => handleInputChange("lowerSalary", e.target.value)}
                className={errors.lowerSalary ? "border-red-500" : ""}
              />
              {errors.lowerSalary && (
                <p className="text-red-500 text-sm">{errors.lowerSalary}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="upperSalary">Upper Salary</Label>
              <Input
                id="upperSalary"
                type="number"
                placeholder="e.g. 120000"
                value={formData.upperSalary}
                onChange={(e) => handleInputChange("upperSalary", e.target.value)}
                className={errors.upperSalary ? "border-red-500" : ""}
              />
              {errors.upperSalary && (
                <p className="text-red-500 text-sm">{errors.upperSalary}</p>
              )}
            </div>
          </div>

          {/* Job Type and Application Deadline */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type *</Label>
              <Select
                value={formData.jobType}
                onValueChange={(value) => handleInputChange("jobType", value)}
              >
                <SelectTrigger className={errors.jobType ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  {JobTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.jobType && (
                <p className="text-red-500 text-sm">{errors.jobType}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Application Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full pl-3 text-left font-normal"
                  >
                    {formData.applicationDeadline ? (
                      format(formData.applicationDeadline, "PPP")
                    ) : (
                      <span>Pick a deadline</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.applicationDeadline}
                    onSelect={(date) => handleInputChange("applicationDeadline", date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-4">
            <Label>Required Skills</Label>
            
            {/* Selected Skills Display */}
            {formData.skills.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Selected Skills ({formData.skills.length}):
                </p>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {formData.skills.map((skill) => (
                    <div key={skill.skillId} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <Badge variant="secondary" className="flex-shrink-0">
                        {skill.skillName}
                      </Badge>
                      <Select
                        value={skill.proficiencyLevel}
                        onValueChange={(value) => handleProficiencyChange(skill.skillId, value)}
                      >
                        <SelectTrigger className="w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ProficiencyLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(skill.skillId)}
                        className="ml-auto"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Selection */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search skills..."
                    value={skillSearchTerm}
                    onChange={(e) => setSkillSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              {skillsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-sm text-gray-500">Loading skills...</div>
                </div>
              ) : (
                <div className="max-h-48 overflow-y-auto border rounded-lg p-2 space-y-1">
                  {filteredSkills.length > 0 ? (
                    filteredSkills.map((skill) => (
                      <div key={skill.skillId} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                        <Checkbox
                          id={`skill-${skill.skillId}`}
                          checked={isSkillSelected(skill.skillId)}
                          onCheckedChange={(checked) => handleSkillToggle(skill, checked)}
                        />
                        <label
                          htmlFor={`skill-${skill.skillId}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                        >
                          {skill.skillName}
                        </label>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500 text-center py-4">
                      {skillSearchTerm ? "No skills found matching your search" : "No skills available"}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating Job..." : "Create Job"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobModal;