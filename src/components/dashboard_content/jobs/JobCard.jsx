import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar, 
  Building2,
  User,
  Send,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/contexts/AuthProvider';
import { applyToJob, checkApplicationStatus } from '@/service/api/jobApplications';
import { toast } from 'sonner';

const JobCard = ({ job }) => {
  const { user: currentUser } = useAuth();
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  // Check if current user is the job creator
  const isJobCreator = currentUser && (
    currentUser.id === job.createdBy ||
    currentUser.id === job.userId ||
    currentUser.id === job.creator?.id
  );

  // Check application status on component mount
  useEffect(() => {
    const checkStatus = async () => {
      if (!job.id || isJobCreator) {
        setIsCheckingStatus(false);
        return;
      }

      try {
        const response = await checkApplicationStatus(job.id);
        if (response.success) {
          setApplicationStatus(response.data);
        }
      } catch (error) {
        console.error('Error checking application status:', error);
      } finally {
        setIsCheckingStatus(false);
      }
    };

    checkStatus();
  }, [job.id, isJobCreator]);

  // Handle job application
  const handleApply = async () => {
    if (isJobCreator) {
      toast.error("You cannot apply to your own job posting!");
      return;
    }

    if (applicationStatus?.hasApplied) {
      toast.info("You have already applied to this job!");
      return;
    }

    setIsApplying(true);

    try {
      const response = await applyToJob(job.id);

      if (response.success) {
        toast.success("Successfully applied to the job!");
        setApplicationStatus({ hasApplied: true, appliedAt: new Date().toISOString() });
      } else {
        toast.error(response.message || "Failed to apply to job");
      }
    } catch (error) {
      console.error('Error applying to job:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsApplying(false);
    }
  };

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

  // Render apply button based on status
  const renderApplyButton = () => {
    if (isCheckingStatus) {
      return (
        <Button disabled className="w-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Checking...
        </Button>
      );
    }

    if (isJobCreator) {
      return (
        <Button disabled variant="outline" className="w-full">
          <User className="mr-2 h-4 w-4" />
          Your Job Posting
        </Button>
      );
    }

    if (applicationStatus?.hasApplied) {
      return (
        <Button disabled variant="outline" className="w-full">
          <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
          Applied
        </Button>
      );
    }

    return (
      <Button 
        onClick={handleApply}
        disabled={isApplying}
        className="w-full"
      >
        {isApplying ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Applying...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Apply Now
          </>
        )}
      </Button>
    );
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        {/* Job Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 line-clamp-1">
              {job.jobTitle}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Building2 size={16} />
              <span>{job.companyName || 'Company'}</span>
            </div>
            {job.creator && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User size={14} />
                <span>Posted by {job.creator.firstName && job.creator.lastName 
                  ? `${job.creator.firstName} ${job.creator.lastName}`
                  : job.creator.username
                }</span>
              </div>
            )}
          </div>
          
          {isJobCreator && (
            <Badge variant="secondary" className="ml-2">
              Your Job
            </Badge>
          )}
        </div>

        {/* Job Description */}
        <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {job.jobDescription}
        </p>

        {/* Job Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {/* Salary */}
          <div className="flex items-center gap-2 text-sm">
            <DollarSign size={16} className="text-green-600" />
            <span>{formatSalary(job.lowerSalary, job.upperSalary)}</span>
          </div>

          {/* Location */}
          {job.location && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-blue-600" />
              <span>{job.location}</span>
            </div>
          )}

          {/* Application Deadline */}
          {job.applicationDeadline && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-orange-600" />
              <span>Apply by {new Date(job.applicationDeadline).toLocaleDateString()}</span>
            </div>
          )}

          {/* Posted Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={16} />
            <span>{formatPostedDate(job.createdAt)}</span>
          </div>
        </div>

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Required Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 5).map((skillItem, index) => (
                <Badge
                  key={skillItem.skill?.skillId || index}
                  variant="outline"
                  className={`text-xs px-2 py-1 ${getProficiencyColor(skillItem.proficiencyLevel)}`}
                >
                  {skillItem.skill?.skillName || skillItem.skillName} ({skillItem.proficiencyLevel?.toLowerCase()})
                </Badge>
              ))}
              {job.skills.length > 5 && (
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  +{job.skills.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Job Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-border/50">
          <Badge variant={getJobTypeBadgeVariant(job.jobType)} className="text-sm">
            {formatJobType(job.jobType)}
          </Badge>
          
          <div className="flex-1 ml-4">
            {renderApplyButton()}
          </div>
        </div>

        {/* Application Status Info */}
        {applicationStatus?.hasApplied && applicationStatus?.appliedAt && (
          <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-400">
              ✓ Applied {formatDistanceToNow(new Date(applicationStatus.appliedAt), { addSuffix: true })}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobCard;