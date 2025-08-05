import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const statusBadge = (status) => {
  if (status === "Active")
    return (
      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
        Active
      </Badge>
    );
  if (status === "Inactive")
    return (
      <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
        Inactive
      </Badge>
    );
  return (
    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
      {status}
    </Badge>
  );
};

export default function CompanyDetailSidebar({ company, isOpen, onClose }) {
  const [tab, setTab] = useState("overview");
  if (!isOpen || !company) return null;
  const {
    logo,
    name,
    status,
    description,
    tags,
    foundedYear,
    employeeRange,
    valuation,
    headquarters = "New York, USA",
    website = "https://example.com",
    contact = {
      email: "info@company.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business Ave, Suite 100, New York, NY 10001",
    },
  } = company;

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      direction="right"
    >
      <DrawerContent className="sm:max-w-sm w-full">
        <DrawerHeader className="flex flex-row items-center justify-between border-b border-border">
          <DrawerTitle>Company Details</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close sidebar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            {logo ? (
              <img
                src={logo}
                alt={`${name} logo`}
                className="w-24 h-24 object-contain mb-4"
              />
            ) : (
              <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center mb-4">
                <span className="text-muted-foreground text-2xl font-bold">
                  {name.charAt(0)}
                </span>
              </div>
            )}
            <div className="flex w-full justify-between items-center mb-2">
              <span className="text-xl font-bold">{name}</span>
              {statusBadge(status)}
            </div>
            <div className="flex flex-wrap gap-1 w-full mb-4">
              {tags &&
                tags.map((tag, i) => (
                  <Badge key={i} variant="secondary">
                    {tag}
                  </Badge>
                ))}
            </div>
          </div>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="overview" className="flex-1">
                Overview
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex-1">
                Contact
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    About
                  </div>
                  <div className="text-sm">{description}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Founded
                    </div>
                    <div className="text-sm">{foundedYear}</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Employees
                    </div>
                    <div className="text-sm">{employeeRange}</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Headquarters
                    </div>
                    <div className="text-sm">{headquarters}</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Valuation
                    </div>
                    <div className="text-sm">${valuation}</div>
                  </div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Website
                  </div>
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {website}
                  </a>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="contact">
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Email
                  </div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {contact.email}
                  </a>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Phone
                  </div>
                  <a href={`tel:${contact.phone}`} className="text-sm">
                    {contact.phone}
                  </a>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Address
                  </div>
                  <div className="text-sm">{contact.address}</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
