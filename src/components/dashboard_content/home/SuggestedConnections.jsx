import React, { useState, useEffect } from 'react';
import { UserPlus, Loader2, Users, RefreshCw, Check } from "lucide-react";
import { getAllUsers } from '@/service/api/user';
import { sendConnectionRequest } from '@/service/api/connections';
import { useAuth } from '@/contexts/AuthProvider';
import { toast } from 'sonner';

const SuggestedConnections = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectingUsers, setConnectingUsers] = useState(new Set()); // Track which users are being connected
  const [connectedUsers, setConnectedUsers] = useState(new Set()); // Track which users are already connected

  // Load all users from API
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching all users...');
      const response = await getAllUsers();
      
      if (response.success) {
        // Filter out the current user from the list
        const filteredUsers = response.data.filter(user => 
          user.id !== currentUser?.id && user.username !== currentUser?.username
        );
        
        setUsers(filteredUsers);
        console.log('Users fetched successfully:', filteredUsers);
      } else {
        setError(response.message || 'Failed to fetch users');
        console.error('Failed to fetch users:', response.message);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Error fetching users');
      toast.error('Failed to load suggested connections');
    } finally {
      setLoading(false);
    }
  };

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, [currentUser]);

  // Handle connect button click
  const handleConnect = async (user) => {
    // Prevent multiple requests for the same user
    if (connectingUsers.has(user.id) || connectedUsers.has(user.id)) {
      return;
    }

    try {
      // Add user to connecting state
      setConnectingUsers(prev => new Set([...prev, user.id]));

      console.log('Sending connection request to user:', user);
      const response = await sendConnectionRequest(user.id);

      if (response.success) {
        // Add user to connected state
        setConnectedUsers(prev => new Set([...prev, user.id]));
        
        toast.success(
          `Connection request sent to ${getUserDisplayName(user)}!`,
          {
            description: "They'll be notified about your request."
          }
        );
        
        console.log('Connection request sent successfully:', response.data);
      } else {
        toast.error(
          response.message || 'Failed to send connection request',
          {
            description: "Please try again later."
          }
        );
        console.error('Failed to send connection request:', response.message);
      }
    } catch (error) {
      console.error('Error sending connection request:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      // Remove user from connecting state
      setConnectingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(user.id);
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
    const jobTitle = user.jobTitle || user.industry || 'Professional';
    const company = user.company || 'TaskSync';
    return `${jobTitle} at ${company}`;
  };

  // Get button state for user
  const getButtonState = (user) => {
    if (connectingUsers.has(user.id)) {
      return 'connecting';
    }
    if (connectedUsers.has(user.id)) {
      return 'connected';
    }
    return 'default';
  };

  // Loading state
  if (loading) {
    return (
      <div className="rounded-xl bg-card p-5 h-full flex flex-col">
        <h3 className="text-lg font-semibold mb-4">Suggested Connections</h3>
        
        <div className="flex flex-col gap-4 flex-1">
          {[1, 2, 3, 4].map((i) => (
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
          Loading connections...
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-xl bg-card p-5 h-full flex flex-col">
        <h3 className="text-lg font-semibold mb-4">Suggested Connections</h3>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <Users className="h-12 w-12 text-muted-foreground/50 mb-3" />
          <h4 className="font-medium mb-2">Failed to load connections</h4>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <button
            onClick={loadUsers}
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
  if (users.length === 0) {
    return (
      <div className="rounded-xl bg-card p-5 h-full flex flex-col">
        <h3 className="text-lg font-semibold mb-4">Suggested Connections</h3>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <Users className="h-12 w-12 text-muted-foreground/50 mb-3" />
          <h4 className="font-medium mb-2">No users found</h4>
          <p className="text-sm text-muted-foreground mb-4">
            It looks like you're the only user in the system.
          </p>
          <button
            onClick={loadUsers}
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
        <h3 className="text-lg font-semibold">Suggested Connections</h3>
        <button
          onClick={loadUsers}
          className="p-1 rounded-md hover:bg-muted transition-colors"
          title="Refresh connections"
        >
          <RefreshCw size={16} className="text-muted-foreground" />
        </button>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {users.slice(0, 5).map((user) => {
          const buttonState = getButtonState(user);
          
          return (
            <div key={user.id} className="flex items-center gap-3">
              <img
                src={user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(getUserDisplayName(user))}&background=random`}
                alt={getUserDisplayName(user)}
                className="h-10 w-10 rounded-full object-cover"
                onError={(e) => {
                  // Fallback to generated avatar if image fails to load
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(getUserDisplayName(user))}&background=random`;
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{getUserDisplayName(user)}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {getUserInfo(user)}
                </p>
              </div>
              
              {/* Dynamic Connect Button */}
              <button 
                onClick={() => handleConnect(user)}
                disabled={buttonState !== 'default'}
                className={`p-2 rounded-full transition-all duration-200 group ${
                  buttonState === 'connected'
                    ? 'bg-green-100 dark:bg-green-900/30 cursor-default'
                    : buttonState === 'connecting'
                    ? 'bg-muted cursor-not-allowed'
                    : 'bg-muted hover:bg-muted/80 hover:scale-105'
                }`}
                title={
                  buttonState === 'connected'
                    ? 'Connection request sent'
                    : buttonState === 'connecting'
                    ? 'Sending request...'
                    : `Connect with ${getUserDisplayName(user)}`
                }
              >
                {buttonState === 'connecting' ? (
                  <Loader2 size={16} className="animate-spin text-muted-foreground" />
                ) : buttonState === 'connected' ? (
                  <Check size={16} className="text-green-600 dark:text-green-400" />
                ) : (
                  <UserPlus size={16} className="group-hover:text-primary transition-colors" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {users.length > 5 && (
        <button 
          onClick={() => {
            // TODO: Implement view all functionality
            console.log('View all connections');
            toast.info('View all functionality coming soon!');
          }}
          className="mt-4 text-sm text-primary font-medium hover:underline self-center"
        >
          View all {users.length} connections
        </button>
      )}
    </div>
  );
};

export default SuggestedConnections;