import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyOverview from "./CompanyOverview";
import { Button } from "@/components/ui/button";
import InvitePeopleDialog from "./InvitePeopleDialog";
import React from "react";
import { getAllUsers } from "@/service/api/user";
import { useAuth } from "@/contexts/AuthProvider";
import { toast } from "sonner";
import { sendInvitationtoPeopletoJoinCompany } from "@/service/api/company";
import CompanyemployeeList from "./CompanyemployeeList";
import JobSection from "./JobSection";


const CompanyRightPanel = ({ selectedCompany }) => {
  console.log("Selected Company in Right Panel:", selectedCompany);

  const [isInvitePeopleDialogeOpen, setIsInvitePeopleDialogOpen] =
    React.useState(false);
  // state to hold all users fetched from the API
  const [allUsers, setAllUsers] = React.useState([]);
  const {user} = useAuth() // Assuming you have a useAuth hook to get the current user
  


    // fetch all the users in a useEffect hook
    React.useEffect(() => {
      const fetchUsers = async () => {
        const response = await getAllUsers();
        console.log("Fetched Users:", response.data);
        if (response.success) {
          setAllUsers(response.data);
        } else {
          console.error("Failed to fetch users:", response.message);
        }
      }
      fetchUsers();
    },[]);

    // function to handle inviting people to a company
    const handlePeopleInvitationToCompany = async(userId)=>{
      if(!selectedCompany?.id) {
        toast.error("No company selected to invite people to.");
        console.error("No company selected to invite people to.");
        return;
      }


      const invitationData = {
        invitedUserId: userId,
        role:"EMPLOYEE",
        companyId: selectedCompany.id,
      }

      try {
        const response = await sendInvitationtoPeopletoJoinCompany(invitationData);
        if(response.success) {
          toast.success("Invitation sent successfully!");
          setIsInvitePeopleDialogOpen(false);
        }
        else{
          toast.error(response.message || "Failed to send invitation.");
          console.error("Failed to send invitation:", response.message);
        }
      } catch (error) {
        toast.error("An error occurred while sending the invitation.");
        console.error("Error sending invitation:", error);
      }
    }



  return (
    <Card className="h-full p-4">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <h2 className="text-xl font-semibold">Company Overview</h2>
          {selectedCompany ? (
            <CompanyOverview company={selectedCompany} />
          ) : (
            <p className="text-muted-foreground">
              Select a company to view its overview.
            </p>
          )}
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <JobSection selectedCompany={selectedCompany} />
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <h2 className="text-xl font-semibold">Applications</h2>
          <p>Job applications will be displayed here</p>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <h2 className="text-xl font-semibold">Statistics</h2>
          <p>Company statistics will be displayed here</p>
        </TabsContent>
        <TabsContent value="people" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">People</h2>
            <Button
            onClick={() => setIsInvitePeopleDialogOpen(true)}
            >Invite People</Button>
          </div>
          <CompanyemployeeList companyId={selectedCompany?.id}/>
        </TabsContent>
      </Tabs>
      <InvitePeopleDialog
        isOpen={isInvitePeopleDialogeOpen}
        onClose={() => setIsInvitePeopleDialogOpen(false)}
        users={allUsers.filter((u) => u.id !== user?.id)} // exclude self
        onInvite={handlePeopleInvitationToCompany}
        companyId={selectedCompany?.id} // pass selected company ID
      />
    </Card>
  );
};

export default CompanyRightPanel;
