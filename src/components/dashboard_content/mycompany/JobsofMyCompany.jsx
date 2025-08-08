import React, { useState, useEffect } from "react";
import { Bookmark, Building2, MapPin, Clock, DollarSign, Calendar, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { fetchJobsByCompany } from "@/service/api/jobs";

const JobsofMyCompany = ({ selectedCompany }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load jobs for the selected company
  const loadCompanyJobs = async () => {
    if (!selectedCompany?.id) {
      setJobs([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching jobs for company:", selectedCompany.id);
      const response = await fetchJobsByCompany(selectedCompany.id);
      
      if (response.success) {
        setJobs(response.data);
        console.log("Company jobs fetched successfully:", response.data);
      } else {
        setError(response.message || "Failed to fetch company jobs");
        console.error("Failed to fetch company jobs:", response.message);
      }
    } catch (err) {
      console.error("Error fetching company jobs:", err);
      setError("Error fetching company jobs");
      toast.error("Failed to load company jobs");
    } finally {
      setLoading(false);
    }
  };

  // Load jobs when selectedCompany changes
  useEffect(() => {
    loadCompanyJobs();
  }, [selectedCompany?.id]);

  // Format job type for display
  const formatJobType = (jobType) => {
    const typeMap = {
      'FULL_TIME': 'Full-time',
      'PART_TIME': 'Part-time',
      'CONTRACT': 'Contract',
      'INTERNSHIP': 'Internship',
      'TEMPORARY': 'Temporary'
    };
    return typeMap[jobType] || jobType;
  };

  // Format salary range
  const formatSalary = (lowerSalary, upperSalary) => {
    if (!lowerSalary && !upperSalary) return "Salary not specified";
    if (lowerSalary && upperSalary) {
      return `$${(lowerSalary / 1000).toFixed(0)}K - $${(upperSalary / 1000).toFixed(0)}K`;
    }
    if (lowerSalary) return `From $${(lowerSalary / 1000).toFixed(0)}K`;
    if (upperSalary) return `Up to $${(upperSalary / 1000).toFixed(0)}K`;
  };

  // Format posted date
  const formatPostedDate = (createdAt) => {
    try {
      return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    } catch {
      return "Recently";
    }
  };

  // Get job type badge color
  const getJobTypeBadgeVariant = (jobType) => {
    switch (jobType) {
      case 'FULL_TIME':
        return 'default';
      case 'PART_TIME':
        return 'secondary';
      case 'CONTRACT':
        return 'outline';
      case 'INTERNSHIP':
        return 'destructive';
      case 'TEMPORARY':
        return 'secondary';
      default:
        return 'default';
    }
  };

  // Get proficiency badge color
  const getProficiencyColor = (level) => {
    switch (level) {
      case 'BEGINNER':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'INTERMEDIATE':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'EXPERT':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Handle job actions
  const handleEditJob = (job) => {
    console.log("Edit job:", job);
    toast.info("Edit job functionality coming soon!");
  };

  const handleDeleteJob = (job) => {
    console.log("Delete job:", job);
    toast.info("Delete job functionality coming soon!");
  };

  // No company selected
  if (!selectedCompany) {
    return (
      <div className="rounded-xl bg-card p-6 h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Building2 className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-lg font-medium text-muted-foreground mb-2">Select a company</p>
            <p className="text-sm text-muted-foreground">Choose a company from the list to view its job postings</p>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="rounded-xl bg-card p-5 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Jobs for {selectedCompany.companyName}</h3>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-xl bg-card p-5 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Jobs for {selectedCompany.companyName}</h3>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-red-500 mb-2">{error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={loadCompanyJobs}
              className="text-xs"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-card p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Jobs for {selectedCompany.companyName}</h3>
          <p className="text-sm text-muted-foreground">
            {jobs.length} job{jobs.length !== 1 ? 's' : ''} posted
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={loadCompanyJobs}
          disabled={loading}
          className="text-xs"
        >
          {loading ? "Loading..." : "Refresh"}
        </Button>
      </div>

      <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job.id}
              className="p-4 bg-muted/40 rounded-lg border border-border/50 hover:border-border/80 transition-colors"
            >
              {/* Job Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-base mb-1 line-clamp-1">
                    {job.jobTitle}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {job.jobDescription}
                  </p>
                </div>
                
              </div>

              {/* Job Details */}
              <div className="flex flex-col gap-2 mb-3">
                {/* Salary */}
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <DollarSign size={14} />
                  <span>{formatSalary(job.lowerSalary, job.upperSalary)}</span>
                </div>

                {/* Location */}
                {job.location && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin size={14} />
                    <span>{job.location}</span>
                  </div>
                )}

                {/* Application Deadline */}
                {job.applicationDeadline && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    <span>Apply by {new Date(job.applicationDeadline).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {/* Skills */}
              {job.skills && job.skills.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.slice(0, 3).map((skillItem, index) => (
                      <Badge
                        key={skillItem.skill.skillId || index}
                        variant="outline"
                        className={`text-xs px-2 py-0.5 ${getProficiencyColor(skillItem.proficiencyLevel)}`}
                      >
                        {skillItem.skill.skillName} ({skillItem.proficiencyLevel.toLowerCase()})
                      </Badge>
                    ))}
                    {job.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs px-2 py-0.5">
                        +{job.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Job Footer */}
              <div className="flex justify-between items-center pt-2 border-t border-border/50">
                <Badge variant={getJobTypeBadgeVariant(job.jobType)} className="text-xs">
                  {formatJobType(job.jobType)}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={12} />
                  <span>{formatPostedDate(job.createdAt)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Building2 className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-2">No jobs posted yet</p>
              <p className="text-xs text-muted-foreground">
                Create your first job posting for {selectedCompany.companyName}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsofMyCompany;