import React, { useState, useCallback, useMemo } from "react";
import { User, UserInfo, IdTokenResult } from "firebase/auth";
import { LogOutIcon, RefreshCcw, UserCircleIcon } from "lucide-react";

// Icons for various actions and states
const icons = {
  defaultUser: <UserCircleIcon />,
  reload: <RefreshCcw />,
  logout: <LogOutIcon />,
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
    <div key={provider.providerId} className="bg-white/5 rounded-lg p-2 mb-2">
      <div className="flex justify-between">
        <span className="text-xs font-semibold text-white/70">Provider:</span>
        <span className="text-xs text-white/80">{provider.providerId}</span>
      </div>
      {provider.displayName && (
        <div className="flex justify-between">
          <span className="text-xs text-white/70">Display Name:</span>
          <span className="text-xs text-white/80">{provider.displayName}</span>
        </div>
      )}
      {provider.email && (
        <div className="flex justify-between">
          <span className="text-xs text-white/70">Email:</span>
          <span className="text-xs text-white/80">{provider.email}</span>
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
      rounded-2xl p-6 text-white shadow-2xl max-w-md w-full ${className}`}
    >
      {/* User Profile Header */}
      <div className="flex items-center space-x-4 mb-4">
        {/* Profile Picture */}
        <div className="relative">
          {userDetails.photoURL ? (
            <img
              src={userDetails.photoURL}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              {icons.defaultUser}
            </div>
          )}
          {/* Verification Badge */}
          {user.emailVerified && (
            <span
              className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full w-5 h-5 
              flex items-center justify-center text-xs"
            >
              ✓
            </span>
          )}
        </div>

        {/* User Name and Email */}
        <div>
          <h2 className="text-xl font-semibold">{userDetails.displayName}</h2>
          <p className="text-white/70">{userDetails.email}</p>
        </div>
      </div>

      {/* User Status Information */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-white/5 rounded-lg p-2">
          <span className="text-xs text-white/70 block">Email Verified</span>
          <span
            className={`font-semibold ${user.emailVerified ? "text-green-400" : "text-yellow-400"}`}
          >
            {user.emailVerified ? "Verified" : "Unverified"}
          </span>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <span className="text-xs text-white/70 block">Account Type</span>
          <span
            className={`font-semibold ${user.isAnonymous ? "text-yellow-400" : "text-blue-400"}`}
          >
            {user.isAnonymous ? "Anonymous" : "Authenticated"}
          </span>
        </div>
      </div>

      {/* Expandable Details Section */}
      <div className="space-y-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg 
            transform transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          {isExpanded ? "Hide Details" : "Show More Details"}
        </button>

        {isExpanded && (
          <div className="mt-2 space-y-2">
            {/* Provider Information */}
            <div>
              <h3 className="text-sm font-semibold mb-2 text-white/70">
                Connected Providers
              </h3>
              {userDetails.providers.length > 0 ? (
                userDetails.providers.map(renderProviderDetails)
              ) : (
                <p className="text-xs text-white/50">
                  No provider information available
                </p>
              )}
            </div>

            {/* User Metadata */}
            <div className="bg-white/5 rounded-lg p-3">
              <h3 className="text-sm font-semibold mb-2 text-white/70">
                Account Metadata
              </h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-white/70">Creation Time:</span>
                  <span className="text-xs text-white/80">
                    {formatDate(new Date(user.metadata.creationTime!))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/70">Last Sign-In:</span>
                  <span className="text-xs text-white/80">
                    {formatDate(new Date(user.metadata.lastSignInTime!))}
                  </span>
                </div>
                {user.tenantId && (
                  <div className="flex justify-between">
                    <span className="text-xs text-white/70">Tenant ID:</span>
                    <span className="text-xs text-white/80">
                      {user.tenantId}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={fetchTokenInfo}
                disabled={isLoading}
                className="bg-blue-500/30 hover:bg-blue-500/50 text-white py-2 rounded-lg 
                  transform transition-transform duration-300 hover:scale-105 active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? "Loading..." : "Get Token Info"}
              </button>
              <button
                onClick={handleReload}
                disabled={isLoading}
                className="bg-green-500/30 hover:bg-green-500/50 text-white py-2 rounded-lg 
                  transform transition-transform duration-300 hover:scale-105 active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? "Processing..." : "Reload User"}
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-500/20 text-red-300 p-2 rounded-lg text-xs text-center">
                {error}
              </div>
            )}

            {/* Token Information */}
            {tokenInfo && (
              <div className="bg-white/5 rounded-lg p-3">
                <h3 className="text-sm font-semibold mb-2 text-white/70">
                  Token Information
                </h3>
                <pre className="text-xs overflow-auto max-h-40 text-white/80">
                  {JSON.stringify(tokenInfo, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full bg-red-500/30 hover:bg-red-500/50 text-white py-2 rounded-lg mt-2
            transform transition-transform duration-300 hover:scale-105 active:scale-95
            flex items-center justify-center space-x-2"
        >
          {icons.logout}
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserCard;
