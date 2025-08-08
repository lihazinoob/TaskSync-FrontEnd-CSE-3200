import React, { useState, useEffect } from 'react';
import { Users, RefreshCw, Loader2, MessageSquare, UserCheck } from "lucide-react";
import { getAcceptedConnectionsWithUserInfo } from '@/service/api/connections';
import { useAuth } from '@/contexts/AuthProvider';
import { toast } from 'sonner';

const AcceptedConnections = ({ refreshTrigger }) => {
  const { user: currentUser } = useAuth();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load accepted connections
  const loadConnections = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching accepted connections...');
      const response = await getAcceptedConnectionsWithUserInfo();
      
      if (response.success) {
        setConnections(response.data);
        console.log('Accepted connections loaded successfully:', response.data);
      } else {
        setError(response.message || 'Failed to fetch connections');
        console.error('Failed to fetch connections:', response.message);
      }
    } catch (err) {
      console.error('Error fetching connections:', err);
      setError('Error fetching connections');
      toast.error('Failed to load connections');
    } finally {
      setLoading(false);
    }
  };

  // Load connections on component mount and when refreshTrigger changes
  useEffect(() => {
    loadConnections();
  }, [currentUser, refreshTrigger]);

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
    const company = user.company || 'TaskSync';
    return `${jobTitle} at ${company}`;
  };

  // Handle message user (placeholder for future implementation)
  const handleMessage = (user) => {
    console.log('Message user:', user);
    toast.info('Messaging feature coming soon!');
  };

  // Handle view profile (placeholder for future implementation)
  const handleViewProfile = (user) => {
    console.log('View profile:', user);
    toast.info('Profile view feature coming soon!');
  };

  // Loading state
  if (loading) {
    return (
      <div className="rounded-xl bg-card p-5 h-full flex flex-col">
        <h3 className="text-lg font-semibold mb-4">My Connections</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-muted/30 rounded-lg p-4 animate-pulse">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-muted rounded-full mb-3"></div>
                <div className="h-4 w-24 bg-muted rounded mb-2"></div>
                <div className="h-3 w-32 bg-muted rounded mb-3"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-20 bg-muted rounded"></div>
                  <div className="h-8 w-8 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading connections...
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-xl bg-card p-5 h-full flex flex-col">
        <h3 className="text-lg font-semibold mb-4">My Connections</h3>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <Users className="h-12 w-12 text-muted-foreground/50 mb-3" />
          <h4 className="font-medium mb-2">Failed to load connections</h4>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <button
            onClick={loadConnections}
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
  if (connections.length === 0) {
    return (
      <div className="rounded-xl bg-card p-5 h-full flex flex-col">
        <h3 className="text-lg font-semibold mb-4">My Connections</h3>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <Users className="h-12 w-12 text-muted-foreground/50 mb-3" />
          <h4 className="font-medium mb-2">No connections yet</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Start connecting with colleagues and professionals to build your network.
          </p>
          <button
            onClick={loadConnections}
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
        <h3 className="text-lg font-semibold">My Connections</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {connections.length} {connections.length === 1 ? 'connection' : 'connections'}
          </span>
          <button
            onClick={loadConnections}
            className="p-1 rounded-md hover:bg-muted transition-colors"
            title="Refresh connections"
          >
            <RefreshCw size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-1">
        {connections.map((connection) => (
          <div key={connection.id} className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <div className="flex flex-col items-center text-center">
              <img
                src={connection.connectedUser.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(getUserDisplayName(connection.connectedUser))}&background=random`}
                alt={getUserDisplayName(connection.connectedUser)}
                className="h-16 w-16 rounded-full object-cover mb-3"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(getUserDisplayName(connection.connectedUser))}&background=random`;
                }}
              />
              
              <h4 className="font-medium truncate w-full mb-1">
                {getUserDisplayName(connection.connectedUser)}
              </h4>
              <p className="text-sm text-muted-foreground truncate w-full mb-3">
                {getUserInfo(connection.connectedUser)}
              </p>
              
              <div className="flex items-center gap-1 mb-3">
                <UserCheck size={12} className="text-green-600 dark:text-green-400" />
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">Connected</span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 w-full">
                <button 
                  onClick={() => handleViewProfile(connection.connectedUser)}
                  className="flex-1 px-3 py-2 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                >
                  View Profile
                </button>
                <button 
                  onClick={() => handleMessage(connection.connectedUser)}
                  className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  title={`Message ${getUserDisplayName(connection.connectedUser)}`}
                >
                  <MessageSquare size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {connections.length > 8 && (
        <div className="mt-4 text-center">
          <button 
            onClick={() => {
              // TODO: Implement view all functionality
              console.log('View all connections');
              toast.info('View all functionality coming soon!');
            }}
            className="text-sm text-primary font-medium hover:underline"
          >
            View all {connections.length} connections
          </button>
        </div>
      )}
    </div>
  );
};

export default AcceptedConnections;