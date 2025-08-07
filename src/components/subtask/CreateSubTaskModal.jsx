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
import { Popover, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

const CreateSubTaskModal = ({ isOpen, onClose, parentTask }) => {
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

        <DialogDescription>
          <form
            onSubmit={() => alert("Subtask created!")}
            className="flex flex-col gap-4"
          >
            {/* SubTask title */}
            <label htmlFor="title">
              Title <span className="text-red-500">*</span>
              <Input id="title" placeholder="Enter subtask title" required />
            </label>

            {/* SubTask description */}
            <label htmlFor="description">
              Description <span className="text-red-500">*</span>
              <Input
                id="description"
                placeholder="Enter subtask description"
                required
              />
            </label>

            {/* Assignee and Due Date Row */}
            <div className="flex gap-4">
              {/* Assignee */}
              <div className="space-y-2">
                <label htmlFor="assignee">
                  Assignee <span className="text-red-500">*</span>
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Replace with actual user options */}
                    <SelectItem value="user1">User 1</SelectItem>
                    <SelectItem value="user2">User 2</SelectItem>
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
                      <span>Select due date</span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                </Popover>
              </div>
            </div>
          </form>
        </DialogDescription>

        <DialogFooter>
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Create SubTask</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubTaskModal;
