import React, { useState, useEffect } from 'react';
import { UserCheck, Loader2, Users, RefreshCw, Clock } from "lucide-react";
import { getConnectionRequests, acceptConnectionRequest } from '@/service/api/connections';
import { getAllUsers } from '@/service/api/user';
import { useAuth } from '@/contexts/AuthProvider';
import { toast } from 'sonner';

const ConnectionRequests = ({ onConnectionAccepted }) => { // Add callback prop
  const { user: currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingRequests, setProcessingRequests] = useState(new Set());

  // Load connection requests and users
  const loadConnectionRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching connection requests and users...');
      
      // Fetch requests and users concurrently
      const [requestsResponse, usersResponse] = await Promise.all([
        getConnectionRequests(),
        getAllUsers()
      ]);

      if (!requestsResponse.success) {
        setError(requestsResponse.message || 'Failed to fetch connection requests');
        return;
      }

      if (!usersResponse.success) {
        console.warn('Failed to fetch users, requests will show without complete user info');
      }

      // Filter requests where current user is user2 (receiving the request)
      const filteredRequests = requestsResponse.data.filter(request => 
        request.user2 === currentUser?.username && request.status === 'PENDING'
      );

      // Create users map for quick lookup
      const usersMap = new Map();
      if (usersResponse.success) {
        usersResponse.data.forEach(user => {
          usersMap.set(user.username, user);
        });
      }

      // Enhance requests with user information
      const enhancedRequests = filteredRequests.map(request => {
        const senderUser = usersMap.get(request.user1);
        
        return {
          ...request,
          sender: senderUser ? {
            id: senderUser.id,
            username: senderUser.username,
            firstName: senderUser.firstName,
            lastName: senderUser.lastName,
            profileImage: senderUser.profileImage,
            jobTitle: senderUser.jobTitle || senderUser.industry,
            email: senderUser.email
          } : {
            username: request.user1,
            firstName: null,
            lastName: null,
            profileImage: null,
            jobTitle: 'User'
          }
        };
      });

      setRequests(enhancedRequests);
      setUsers(usersResponse.data || []);
      
      console.log('Connection requests loaded successfully:', enhancedRequests);
    } catch (err) {
      console.error('Error fetching connection requests:', err);
      setError('Error fetching connection requests');
      toast.error('Failed to load connection requests');
    } finally {
      setLoading(false);
    }
  };

  // Load requests on component mount
  useEffect(() => {
    loadConnectionRequests();
  }, [currentUser]);

  // Handle accept request
  const handleAccept = async (request) => {
    if (processingRequests.has(request.id)) return;

    try {
      setProcessingRequests(prev => new Set([...prev, request.id]));
      
      console.log('Accepting connection request:', request);
      const response = await acceptConnectionRequest(request.id); // Use request.id as connectionId

      if (response.success) {
        // Remove the request from the list
        setRequests(prev => prev.filter(req => req.id !== request.id));
        
        toast.success(
          `You are now connected with ${getUserDisplayName(request.sender)}!`,
          {
            description: "You can now see their posts and activities."
          }
        );

        // Notify parent component that a connection was accepted
        if (onConnectionAccepted) {
          onConnectionAccepted(request.sender);
        }
      } else {
        toast.error(response.message || 'Failed to accept connection request');
      }
    } catch (error) {
      console.error('Error accepting connection request:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(request.id);
        return newSet;
      });
    }
  };

  // Get user display name
  const getUserDisplayName = (user) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.username || 'Unknown User';
  };

  // Get user position/company info
  const getUserInfo = (user) => {
    const jobTitle = user.jobTitle || 'Professional';
    return jobTitle;
  };

  // Loading state
  if (loading) {
    return (
      <div className="rounded-xl bg-card p-5 h-full flex flex-col">
        <h3 className="text-lg font-semibold mb-4">Connection Requests</h3>
        
        <div className="flex flex-col gap-4 flex-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="h-10 w-10 bg-muted rounded-full"></div>
              <div className="flex-1 min-w-0">
                <div className="h-4 w-24 bg-muted rounded mb-1"></div>
                <div className="h-3 w-32 bg-muted rounded"></div>
              </div>
              <div className="h-8 w-8 bg-muted rounded-full"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading requests...
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-xl bg-card p-5 h-full flex flex-col">
        <h3 className="text-lg font-semibold mb-4">Connection Requests</h3>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <Users className="h-12 w-12 text-muted-foreground/50 mb-3" />
          <h4 className="font-medium mb-2">Failed to load requests</h4>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <button
            onClick={loadConnectionRequests}
            className="flex items-center gap-2 text-sm text-primary font-medium hover:underline"
          >
            <RefreshCw size={14} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (requests.length === 0) {
    return (
      <div className="rounded-xl bg-card p-5 h-full flex flex-col">
        <h3 className="text-lg font-semibold mb-4">Connection Requests</h3>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <Users className="h-12 w-12 text-muted-foreground/50 mb-3" />
          <h4 className="font-medium mb-2">No pending requests</h4>
          <p className="text-sm text-muted-foreground mb-4">
            You don't have any connection requests at the moment.
          </p>
          <button
            onClick={loadConnectionRequests}
            className="flex items-center gap-2 text-sm text-primary font-medium hover:underline"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-card p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Connection Requests</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {requests.length} pending
          </span>
          <button
            onClick={loadConnectionRequests}
            className="p-1 rounded-md hover:bg-muted transition-colors"
            title="Refresh requests"
          >
            <RefreshCw size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
        {requests.map((request) => {
          const isProcessing = processingRequests.has(request.id);
          
          return (
            <div key={request.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <img
                src={request.sender.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(getUserDisplayName(request.sender))}&background=random`}
                alt={getUserDisplayName(request.sender)}
                className="h-10 w-10 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(getUserDisplayName(request.sender))}&background=random`;
                }}
              />
              
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{getUserDisplayName(request.sender)}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {getUserInfo(request.sender)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Pending request</span>
                </div>
              </div>
              
              {/* Accept Button Only */}
              <button 
                onClick={() => handleAccept(request)}
                disabled={isProcessing}
                className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                title="Accept connection request"
              >
                {isProcessing ? (
                  <Loader2 size={16} className="animate-spin text-green-600" />
                ) : (
                  <UserCheck size={16} className="text-green-600 dark:text-green-400" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {requests.length > 5 && (
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Showing {Math.min(requests.length, 5)} of {requests.length} requests
          </p>
        </div>
      )}
    </div>
  );
};

export default ConnectionRequests;