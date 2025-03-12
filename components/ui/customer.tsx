import {
  Expand,
  GithubIcon,
  Lock,
  Mail,
  RefreshCcw,
  UserCircle2,
} from "lucide-react";
import React, { useState, useCallback } from "react";
import { Icon } from "@iconify/react";

interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
}

interface AuthMethod {
  name: string;
  icon: React.ReactNode;
  handler: () => Promise<void>;
}

interface AuthCardProps {
  user: User | null;
  authMethods: AuthMethod[];
  logOut: () => Promise<void>;
}

const GlamourousAuthCard: React.FC<AuthCardProps> = ({
  user,
  authMethods,
  logOut,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const handleCardToggle = useCallback(() => {
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  const handleCredentialChange = useCallback(
    (field: "email" | "password") =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginCredentials((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      },
    [],
  );

  const handleLogin = useCallback(async () => {
    // Validate credentials before attempting login
    if (loginCredentials.email && loginCredentials.password) {
      try {
        // Implement your login logic here
        console.log("Attempting login", loginCredentials);
      } catch (error) {
        console.error("Login failed", error);
      }
    }
  }, [loginCredentials]);

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 transition-all duration-500 
      ${isExpanded ? "w-96 h-auto" : "w-80 h-32"}`}
    >
      <div className="relative w-full h-full perspective-1000">
        <div
          className={`absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 
            backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden transform 
            transition-transform duration-700 ${isFlipped ? "rotate-y-180" : ""}`}
        >
          {/* Front Side - User Profile or Login Options */}
          <div
            className={`absolute inset-0 p-6 flex flex-col justify-between 
              transform transition-transform duration-700 backface-hidden 
              ${isFlipped ? "rotate-y-180 opacity-0" : "opacity-100"}`}
          >
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {user.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt="Profile"
                      className="w-12 h-12 rounded-full border-2 border-white/30 object-cover"
                    />
                  ) : (
                    <UserCircle2 />
                  )}
                  <div>
                    <p className="text-white/90 font-semibold">
                      {user.name || "User"}
                    </p>
                    <p className="text-white/60 text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full 
                      transform transition-transform duration-300 hover:scale-110 active:scale-90"
                  >
                    <Expand />
                  </button>
                  <button
                    onClick={logOut}
                    className="bg-red-500/30 hover:bg-red-500/50 text-white p-2 rounded-full 
                      transform transition-transform duration-300 hover:scale-110 active:scale-90"
                  >
                    <Icon icon="mdi:exit-to-app" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  {authMethods.map((method, index) => (
                    <button
                      key={index}
                      onClick={method.handler}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg 
                        flex items-center justify-center space-x-2 
                        transform transition-transform duration-300 hover:scale-110 active:scale-90"
                    >
                      {method.icon}
                      <span>{method.name}</span>
                    </button>
                  ))}
                </div>
                <div className="text-center text-white/60 text-sm">
                  Sign in to access your account
                </div>
              </div>
            )}
          </div>

          {/* Back Side - Login Form */}
          <div
            className={`absolute inset-0 p-6 flex flex-col justify-between 
              transform transition-transform duration-700 backface-hidden 
              ${isFlipped ? "opacity-100" : "rotate-y-180 opacity-0"}`}
          >
            <div className="space-y-4">
              {/* Email Input */}
              <div className="flex items-center bg-white/10 rounded-lg">
                <Mail />
                <input
                  type="email"
                  placeholder="Email"
                  value={loginCredentials.email}
                  onChange={handleCredentialChange("email")}
                  className="w-full bg-transparent p-2 text-white placeholder-white/50 focus:outline-none"
                />
              </div>

              {/* Password Input */}
              <div className="flex items-center bg-white/10 rounded-lg">
                <Lock />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginCredentials.password}
                  onChange={handleCredentialChange("password")}
                  className="w-full bg-transparent p-2 text-white placeholder-white/50 focus:outline-none"
                />
              </div>
            </div>

            {/* Login and Signup Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  /* Signup logic */
                }}
                className="flex-1 bg-blue-500/30 hover:bg-blue-500/50 text-white py-2 rounded-lg
                  transform transition-transform duration-300 hover:scale-110 active:scale-90"
              >
                Sign Up
              </button>
              <button
                onClick={handleLogin}
                className="flex-1 bg-green-500/30 hover:bg-green-500/50 text-white py-2 rounded-lg
                  transform transition-transform duration-300 hover:scale-110 active:scale-90"
              >
                Login
              </button>
            </div>
          </div>

          {/* Flip Button */}
          <button
            onClick={handleCardToggle}
            className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full
              transform transition-transform duration-300 hover:scale-110 active:scale-90"
          >
            <RefreshCcw />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlamourousAuthCard;

// Example usage component
export const AuthWrapper: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const authMethods = [
    {
      name: "Google",
      icon: <Icon icon="logos:google-icon" />,
      handler: async () => {
        // Implement Google login
        console.log("Google login");
      },
    },
    {
      name: "GitHub",
      icon: <GithubIcon />,
      handler: async () => {
        // Implement GitHub login
        console.log("GitHub login");
      },
    },
  ];

  const handleLogout = async () => {
    // Implement logout logic
    setUser(null);
  };

  return (
    <GlamourousAuthCard
      user={user}
      authMethods={authMethods}
      logOut={handleLogout}
    />
  );
};
