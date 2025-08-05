import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BellRing, CheckCheck, Clock, Filter, Users } from "lucide-react";

const NotificationFilter = ({
  activeTab,
  setActiveTab,
  activeType,
  setActiveType,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full sm:w-auto"
      >
        <TabsList>
          <TabsTrigger value="all" className="flex items-center gap-1">
            <BellRing className="h-4 w-4" />
            <span className="hidden md:inline">All</span>
          </TabsTrigger>
          <TabsTrigger value="unread" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="hidden md:inline">Unread</span>
          </TabsTrigger>
          <TabsTrigger value="read" className="flex items-center gap-1">
            <CheckCheck className="h-4 w-4" />
            <span className="hidden md:inline">Read</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground hidden sm:inline">
          Filter by:
        </span>
        <ToggleGroup
          type="single"
          value={activeType}
          onValueChange={(value) => setActiveType(value || "all")}
          className="ml-2"
        >
          <ToggleGroupItem value="all" size="sm">
            All
          </ToggleGroupItem>
          <ToggleGroupItem value="system" size="sm">
            System
          </ToggleGroupItem>
          <ToggleGroupItem value="user" size="sm">
            <Users className="h-4 w-4 mr-1" />
            <span className="hidden md:inline">Users</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default NotificationFilter;
