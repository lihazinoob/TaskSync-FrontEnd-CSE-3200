import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";

const InvitePeopleDialog = ({ isOpen, onClose, users = [], onInvite,companyId }) => {
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Invite People</DialogTitle>
          <DialogDescription>
            Select people to add to your company.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-80 pr-2">
          <div className="space-y-4">
            {users.map((user) => (
                
              <div
                key={user.id}
                className="flex items-center justify-between p-3 border rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={user.profileImage || undefined}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                    <AvatarFallback>
                      {user.firstName?.charAt(0).toUpperCase() ??
                        user.username?.charAt(0).toUpperCase() ??
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onInvite(user.id)}
                  disabled = {!companyId} // Disable if no company ID is provided
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvitePeopleDialog;
