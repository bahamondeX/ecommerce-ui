import React, { useState, useCallback, useMemo } from "react";
import { User, UserInfo, IdTokenResult } from "firebase/auth";
import { LogOutIcon, RefreshCcw, UserCircleIcon, UserIcon, X } from "lucide-react";

// Icons for various actions and states
const icons = {
  defaultUser: <UserCircleIcon className="w-8 h-8 text-white/80" />,
  reload: <RefreshCcw className="w-4 h-4" />,
  logout: <LogOutIcon className="w-4 h-4" />,
};

// Detailed user card interface
interface UserCardProps {
  user: User;
  logout: () => void;
  onReload?: () => void;
  className?: string;
}

// Utility to format date
const formatDate = (date?: number | Date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleString();
};

// Main UserCard Component
const UserCard: React.FC<UserCardProps> = ({
  user,
  logout,
  onReload,
  className = "",
}) => {
  // State management
  const [tokenInfo, setTokenInfo] = useState<IdTokenResult | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [layoutVisible, setLayoutVisible] = useState(false);
  
  // Memoized user details for performance
  const userDetails = useMemo(
    () => ({
      displayName: user.displayName || "Anonymous User",
      email: user.email || "No email",
      photoURL: user.photoURL,
      providers: user.providerData,
    }),
    [user],
  );
            
  // Fetch token information
  const fetchTokenInfo = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const tokenResult = await user.getIdTokenResult();
      setTokenInfo(tokenResult);
    } catch (err) {
      setError("Failed to fetch token information");
      console.error("Error fetching token info:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Reload user information
  const handleReload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await user.reload();
      onReload?.();
    } catch (err) {
      setError("Failed to reload user");
      console.error("Error reloading user:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user, onReload]);

  // Render provider details
  const renderProviderDetails = (provider: UserInfo) => (
    <div key={provider.providerId} className="bg-white/10 rounded-lg p-3 mb-2 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
      <div className="flex justify-between">
        <span className="text-xs font-semibold text-white/80">Provider:</span>
        <span className="text-xs text-white/90">{provider.providerId}</span>
      </div>
      {provider.displayName && (
        <div className="flex justify-between">
          <span className="text-xs text-white/80">Display Name:</span>
          <span className="text-xs text-white/90">{provider.displayName}</span>
        </div>
      )}
      {provider.email && (
        <div className="flex justify-between">
          <span className="text-xs text-white/80">Email:</span>
          <span className="text-xs text-white/90">{provider.email}</span>
        </div>
      )}
    </div>
  );

  return (
    <>
      {!layoutVisible ? (
        <div className="cursor-pointer hover:scale-110 transition-transform duration-300">
          <UserIcon 
            onClick={() => setLayoutVisible(true)} 
            className="w-10 h-10 text-amber-500 hover:text-amber-400 bg-gray-800/50 rounded-full p-2 backdrop-blur-md border border-amber-600/30"
          />
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4">
          <div
            className={`bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl
              rounded-2xl p-6 text-white shadow-2xl max-w-md w-full overflow-y-auto
              border border-amber-600/20 animate-fadeIn ${className}`}
            style={{
              maxHeight: "90vh",
              boxShadow: "0 0 30px rgba(251, 191, 36, 0.15), 0 0 10px rgba(251, 191, 36, 0.1) inset"
            }}
          >
            {/* User Profile Header with improved styling */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center space-x-4">
                {/* Profile Picture with enhanced styling */}
                <div className="relative">
                  {userDetails.photoURL ? (
                    <div className="rounded-full p-1 bg-gradient-to-r from-amber-500 to-amber-700">
                      <img
                        src={userDetails.photoURL}
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-900"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-700 to-amber-500 flex items-center justify-center p-1">
                      <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                        {icons.defaultUser}
                      </div>
                    </div>
                  )}
                  {/* Verification Badge with improved visibility */}
                  {user.emailVerified && (
                    <span
                      className="absolute -bottom-1 -right-1 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-full w-6 h-6 
                      flex items-center justify-center text-xs border-2 border-gray-900"
                    >
                      ✓
                    </span>
                  )}
                </div>

                {/* User Name and Email */}
                <div>
                  <h2 className="text-xl font-semibold text-white">{userDetails.displayName}</h2>
                  <p className="text-white/80">{userDetails.email}</p>
                </div>
              </div>
              
              {/* Close button better positioned */}
              <button 
                onClick={() => setLayoutVisible(false)}
                className="text-white/70 hover:text-red-400 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* User Status Information with improved cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                <span className="text-xs text-white/70 block mb-1">Email Status</span>
                <span
                  className={`font-semibold flex items-center ${user.emailVerified ? "text-green-400" : "text-yellow-400"}`}
                >
                  {user.emailVerified ? "Verified" : "Unverified"}
                  {user.emailVerified && (
                    <span className="ml-1 bg-green-500/20 p-1 rounded-full">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </span>
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                <span className="text-xs text-white/70 block mb-1">Account Type</span>
                <span
                  className={`font-semibold ${user.isAnonymous ? "text-yellow-400" : "text-blue-400"}`}
                >
                  {user.isAnonymous ? "Anonymous" : "Authenticated"}
                </span>
              </div>
            </div>

            {/* Expandable Details Section with improved styling */}
            <div className="space-y-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-gradient-to-r from-amber-700 to-amber-500 text-white rounded-lg py-2 px-4 w-full
                  transform transition-all duration-300 hover:from-amber-600 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-700/30
                  focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none
                  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <span>{isExpanded ? "Hide Details" : "Show More Details"}</span>
                <svg 
                  className={`ml-2 h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isExpanded && (
                <div className="mt-4 space-y-4 animate-fadeIn">
                  {/* Provider Information with improved styling */}
                  <div className="bg-gradient-to-br from-white/10 to-transparent rounded-lg p-4 backdrop-blur-sm border border-white/10">
                    <h3 className="text-sm font-semibold mb-3 text-amber-400 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Connected Providers
                    </h3>
                    {userDetails.providers.length > 0 ? (
                      userDetails.providers.map(renderProviderDetails)
                    ) : (
                      <p className="text-xs text-white/50 italic">
                        No provider information available
                      </p>
                    )}
                  </div>

                  {/* User Metadata with improved styling */}
                  <div className="bg-gradient-to-br from-white/10 to-transparent rounded-lg p-4 backdrop-blur-sm border border-white/10">
                    <h3 className="text-sm font-semibold mb-3 text-amber-400 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Account Metadata
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between bg-white/5 p-2 rounded">
                        <span className="text-xs text-white/80">Creation Time:</span>
                        <span className="text-xs text-amber-300 font-medium">
                          {formatDate(new Date(user.metadata.creationTime!))}
                        </span>
                      </div>
                      <div className="flex justify-between bg-white/5 p-2 rounded">
                        <span className="text-xs text-white/80">Last Sign-In:</span>
                        <span className="text-xs text-amber-300 font-medium">
                          {formatDate(new Date(user.metadata.lastSignInTime!))}
                        </span>
                      </div>
                      {user.tenantId && (
                        <div className="flex justify-between bg-white/5 p-2 rounded">
                          <span className="text-xs text-white/80">Tenant ID:</span>
                          <span className="text-xs text-amber-300 font-medium">
                            {user.tenantId}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons with improved styling */}
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={handleReload}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-2 rounded-lg
                        transform transition-all duration-300 hover:from-blue-600 hover:to-blue-400 hover:shadow-lg hover:shadow-blue-700/20
                        focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none
                        disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isLoading ? (
                        <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <RefreshCcw className="h-5 w-5 mr-2" />
                      )}
                      {isLoading ? "Processing..." : "Reload User"}
                    </button>
                  </div>

                  {/* Error Display with improved styling */}
                  {error && (
                    <div className="bg-gradient-to-r from-red-500/30 to-red-500/10 text-red-300 p-3 rounded-lg text-sm border border-red-500/30 flex items-center">
                      <svg className="h-5 w-5 mr-2 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </div>
                  )}      
                </div>
              )}

              {/* Logout Button with improved styling */}
              <button
                onClick={logout}
                className="bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white py-2 rounded-lg px-4
                  transform transition-all duration-300 hover:shadow-lg hover:shadow-red-700/20
                  focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none
                  flex items-center justify-center space-x-2 mt-4 w-full"
              >
                <LogOutIcon className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;