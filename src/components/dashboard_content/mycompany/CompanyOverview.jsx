import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  MapPin,
  Users,
  Calendar,
  Building2,
  MapPinCheckIcon,
  Mail,
} from "lucide-react";

const CompanyOverview = ({ company }) => {
  if (!company) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground text-center">
          Select a company to view details
        </p>
      </Card>
    );
  }

  return (
    <>
      <Card className="py-6">
        <CardContent className="space-y-6">
          {/* Company Image Section */}

          <div className="flex justify-center">
            {company.companyImageURL.url ? (
              <img
                src={company.companyImageURL.url}
                alt={company.companyName}
                className="h-64 w-full object-cover rounded-lg border border-gray-200 shadow-sm"
              />
            ) : (
              <div className="h-32 w-32 bg-muted rounded-lg flex items-center justify-center border border-gray-200 shadow-sm">
                <span className="text-4xl font-semibold text-gray-500">
                  {company.companyName}
                </span>
              </div>
            )}
          </div>

          {/* Company Name and Industry */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {company.companyName}
            </h2>
            <Badge variant="secondary" className="mt-2 text-sm px-3 py-1">
              {company.industry}
            </Badge>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-gray-500" />
              About
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {company.descriptions || "No description available."}
            </p>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                Location
              </h3>
              <p className="text-gray-600">
                {company.location || "Not specified"}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-500" />
                Employees
              </h3>
              <p className="text-gray-600">
                {company.noOfEmployee || "Not specified"}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-500" />
                Contact Email
              </h3>
              <p className="text-gray-600">
                {company.contactEmail || "Not specified"}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Globe className="h-5 w-5 text-gray-500" />
                Website
              </h3>
              <p className="text-gray-600">Not specified</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CompanyOverview;
