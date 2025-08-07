import React from "react";
import { CalendarIcon, Plus } from "lucide-react";

// shadcn components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { set } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";

const CreateSubTaskModal = ({
  isOpen,
  onClose,
  parentTask,
  employees = [],
}) => {
  // state to manage the input data of the form
  const [createSubTaskFormData, setCreateSubTaskFormData] = React.useState({
    title: "",
    description: "",
    assignee: "unassigned",
    dueDate: undefined,
  });

  // state to manage the errors in the form
  const [formErrors, setFormErrors] = React.useState({});
  // state to show loader when creating subtask
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  console.log("In Create Sub Task Modal", employees);

  // function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setCreateSubTaskFormData({});
    setFormErrors({});

    // Here the actual sending data to the server will happen
    alert("Subtask created!");
    console.log("Subtask created with data:", createSubTaskFormData);
    onClose(); // Close the modal after submission

    setIsSubmitting(false);
  };

  // Helper function to display the selected user name
  const displaySelectedUser = (value) => {
    if(value === "unassigned") {
      return "Unassigned"
    }
    else{
      const employee = employees.find(emp => emp.userId == value);
      return employee ? employee.username : value
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create SubTask
          </DialogTitle>
          <DialogDescription>
            Create a subtask for "{parentTask?.title || "this task"}". Subtasks
            help break down complex tasks into smaller, manageable pieces.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={() => alert("Subtask created!")}
          className="flex flex-col gap-4"
        >
          {/* SubTask title */}
          <label htmlFor="title">
            Title <span className="text-red-500">*</span>
            <Input
              id="title"
              placeholder="Enter subtask title"
              required
              onChange={(e) =>
                setCreateSubTaskFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </label>

          {/* SubTask description */}
          <label htmlFor="description">
            Description <span className="text-red-500">*</span>
            <Textarea
              id="description"
              placeholder="Enter subtask description"
              required
              value={createSubTaskFormData.description}
              onChange={(e) =>
                setCreateSubTaskFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </label>

          {/* Assignee and Due Date Row */}
          <div className="flex gap-4">
            {/* Assignee */}
            <div className="space-y-2">
              <label htmlFor="assignee">
                Assignee <span className="text-red-500">*</span>
              </label>
              <Select
                value={createSubTaskFormData.assignee}
                onValueChange={(value) =>
                  setCreateSubTaskFormData((prev) => ({
                    ...prev,
                    assignee: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select assignee">
                    {displaySelectedUser(createSubTaskFormData.assignee)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {/* Replace with actual user options */}
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {employees.map((employee) => (
                    <SelectItem key={employee.userId} value={employee.userId}>
                      {employee.username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <label htmlFor="dueDate">
                Due Date <span className="text-red-500">*</span>
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full pl-3 text-left font-normal"
                  >
                    {createSubTaskFormData.dueDate ? (
                      createSubTaskFormData.dueDate.toDateString()
                    ) : (
                      <span>Select due date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={createSubTaskFormData.dueDate}
                    onSelect={(date) =>
                      setCreateSubTaskFormData((prev) => ({
                        ...prev,
                        dueDate: date,
                      }))
                    }
                    disabled={(date) => date < new Date()}
                    initialfocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create SubTask"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubTaskModal;
