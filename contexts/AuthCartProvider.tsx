"use client";

import React, { createContext, useState, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import UserCard from "@/components/ui/user-card";
import { Expand, Mail, RefreshCcw, UserCircleIcon } from "lucide-react";
import { Lock } from "lucide-react";
import { Icon } from "@iconify/react";

interface AuthCardProps {
  onExpand?: () => void;
}

const AuthContext = createContext<boolean>(false);

const GlamourousAuthCard: React.FC<AuthCardProps> = ({ onExpand }) => {
  const { user, error, loading, login, logout, signin, signup, verify } =
    useAuth();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      setIsLoggedIn(!isLoggedIn);
      },
    [],
  );
  
  const handleLogout = useCallback(() => {
    logout();
    setIsLoggedIn(false)
  }, [logout]);


  const handleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
    if (onExpand) onExpand();
  }, [isExpanded, onExpand]);

  const handleEmailLogin = useCallback(async () => {
    await signin({
      email: loginCredentials.email,
      password: loginCredentials.password,
    });
  }, [loginCredentials, signin]);

  const handleEmailSignup = useCallback(async () => {
    await signup({
      email: loginCredentials.email,
      password: loginCredentials.password,
    });
  }, [loginCredentials, signup]);

  const authMethods = [
    {
      name: "google",
      template: (
        <button onClick={() => login("google")} className="">
          <Icon icon="logos:google-icon" />
        </button>
      ),
    },
    {
      name: "facebook",
      template: (
        <button onClick={() => login("facebook")} className="">
          <Icon icon="logos:facebook-icon" />
        </button>
      ),
    },
  ];

  return (
    <AuthContext.Provider value={isLoggedIn}>
      {loading ? (
        <div className="fixed bottom-4 left-4 z-50 w-80 h-32 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-2xl shadow-2xl flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : isLoggedIn ? (
        <UserCard user={user!} logout={logout} />
      ) : (
        <div
          className={`fixed bottom-4 left-4 z-50 transition-all duration-500 ${isExpanded ? "w-96 h-auto" : "w-80 h-32"}`}
        >
          <div className="relative w-full h-full perspective-1000">
            <div
              className={`absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-700 ${isFlipped ? "rotate-y-180" : ""}`}
            >
              {/* Front Side - User Profile or Login Options */}
              <div
                className={`absolute inset-0 p-6 flex flex-col justify-between transform transition-transform duration-700 backface-hidden ${isFlipped ? "rotate-y-180 opacity-0" : "opacity-100"}`}
              >
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="Profile"
                          className="w-12 h-12 rounded-full border-2 border-white/30 object-cover"
                        />
                      ) : (
                        <UserCircleIcon />
                      )}
                      <div>
                        <p className="text-white/90 font-semibold">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-white/60 text-sm">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleExpand}
                        className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transform transition-transform duration-300 hover:scale-110 active:scale-90"
                      >
                        <Expand />
                      </button>
                      <button
                        onClick={logout}
                        className="bg-red-500/30 hover:bg-red-500/50 text-white p-2 rounded-full transform transition-transform duration-300 hover:scale-110 active:scale-90"
                      >
                        <Icon icon="mdi:exit-to-app" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <div className="flex space-x-4">
                      {authMethods.map((method) => method.template)}
                    </div>
                    {error && (
                      <div className="text-red-400 text-sm text-center">
                        {error}
                      </div>
                    )}
                    <div className="text-center text-white/60 text-sm">
                      Sign in to access your account
                    </div>
                  </div>
                )}
              </div>

              {/* Back Side - Login Form */}
              <div
                className={`absolute inset-0 p-6 flex flex-col justify-between transform transition-transform duration-700 backface-hidden ${isFlipped ? "opacity-100" : "rotate-y-180 opacity-0"}`}
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
                    onClick={handleEmailSignup}
                    className="flex-1 bg-blue-500/30 hover:bg-blue-500/50 text-white py-2 rounded-lg transform transition-transform duration-300 hover:scale-110 active:scale-90"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={handleEmailLogin}
                    className="flex-1 bg-green-500/30 hover:bg-green-500/50 text-white py-2 rounded-lg transform transition-transform duration-300 hover:scale-110 active:scale-90"
                  >
                    Login
                  </button>
                </div>
              </div>

              {/* Flip Button */}
              <button
                onClick={handleCardToggle}
                className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transform transition-transform duration-300 hover:scale-110 active:scale-90"
              >
                <RefreshCcw />
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default GlamourousAuthCard;
