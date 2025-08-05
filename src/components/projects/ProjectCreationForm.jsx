import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar1Icon } from "lucide-react";
import { format } from "date-fns";
const ProjectCreationForm = ({
  isOpen,
  onClose,
  formData,
  onInputChange,
  onDateChange,
  onSubmit,
}) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Create Project
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Project Name */}
            <div className="space-y-4">
              <label htmlFor="projectName" className="text-sm font-medium">
                Project Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="projectName"
                name="name"
                placeholder="Enter project name"
                className="input"
                value={formData.name}
                onChange={onInputChange}
              />
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <label
                htmlFor="projectDescription"
                className="text-sm font-medium"
              >
                Project Description
              </label>
              <Textarea
                id="projectDescription"
                name="description"
                placeholder="Enter project description"
                className="textarea"
                value={formData.description}
                onChange={onInputChange}
              />
            </div>
            {/* Calendar date picker for the start date */}
            <div>
              <label htmlFor="startDate" className="text-sm font-medium">
                Start Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar1Icon className="mr-2 h-4 w-4" />
                    <span>
                    {formData.startDate
                        ? format(formData.startDate, "PPP")
                        : "Select Start Date"}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => onDateChange("startDate", date)}
                    className="p-4"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Calendar date picker for the end date */}
            <div>
              <label htmlFor="startDate" className="text-sm font-medium">
                Start Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar1Icon className="mr-2 h-4 w-4" />
                    <span>
                      {formData.endDate
                        ? format(formData.endDate, "PPP")
                        : "Select End Date"}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => onDateChange("endDate",date)}
                    className="p-4"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick = {onSubmit}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectCreationForm;
