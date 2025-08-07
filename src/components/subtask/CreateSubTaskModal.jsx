import React from 'react';
import { Plus } from 'lucide-react';

// shadcn components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CreateSubTaskModal = ({ 
  isOpen, 
  onClose,
  parentTask 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create SubTask
          </DialogTitle>
          <DialogDescription>
            Create a subtask for "{parentTask?.title || 'this task'}". Subtasks help break down complex tasks into smaller, manageable pieces.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <div className="text-center text-muted-foreground">
            <div className="text-4xl mb-3">🔧</div>
            <p className="text-lg font-medium mb-2">Feature Under Development</p>
            <p className="text-sm">
              SubTask creation functionality will be available soon. 
              This will allow you to break down tasks into smaller, manageable pieces.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubTaskModal;