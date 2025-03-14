"use client";

import React, { useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { useAuth } from '@/hooks/use-auth';
import UserCard from '@/components/ui/user-card';
import { AuthContext } from '@/contexts/AuthContext';
import { Lock, Mail, UserIcon, X } from 'lucide-react';

interface AuthCardProps {
  onExpand?: () => void;
}
  
const GlamourousAuthCard: React.FC<AuthCardProps> = ({ onExpand }) => {
  const { user, error, loading, login, logout, signin, signup } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: ''
  });

  const handleCardToggle = useCallback(() => {
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  const handleCredentialChange = useCallback(
    (field: 'email' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginCredentials((prev) => ({
        ...prev,
        [field]: e.target.value
      }));
    },
    []
  );


  const handleEmailLogin = useCallback(async () => {
    await signin({ email: loginCredentials.email, password: loginCredentials.password });
  }, [loginCredentials, signin]);

  const handleEmailSignup = useCallback(async () => {
    await signup({ email: loginCredentials.email, password: loginCredentials.password });
  }, [loginCredentials, signup]);

  const toggleAuthForm = () => {
    setShowAuthForm(!showAuthForm);
  }

  const authMethods = [
    {
      name: 'Google',
      icon: (
        <Icon
          icon="logos:google-icon"
          className="h-16 w-16 p-2 cursor-pointer mx-auto rounded-lg hover:scale-110 transition-transform"
          onClick={() => login('google')}
        />
      ),
      handler: () => login('google')
    },
    {
      name: 'Facebook',
      icon: (
        <Icon
          icon="logos:facebook"
          className="h-16 w-16 p-2  mx-auto rounded-lg cursor-pointer hover:scale-110 transition-transform"
          onClick={() => login('facebook')}
        />
      ),
      handler: () => login('facebook')
    }
  ];

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, logout }}>
          {user ? (
            // User is authenticated - show user card
            <UserCard user={user} logout={logout} />
          ) : (
            // User is not authenticated - show login icon or auth form
            <>
              {!showAuthForm ? (
                // Show login icon when auth form is not visible
                <div className="flex justify-center">
                  <UserIcon
                    className="h-8 w-8 cursor-pointer hover:text-primary transition-colors"
                    onClick={toggleAuthForm}
                  />
                </div>
              ) : (
                // Show auth form
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-gray-900 bg-opacity-75">
                  <div className="relative w-full max-w-md mx-auto">
                    <div className="bg-gradient-to-br from-white to-amber-700 rounded-2xl shadow-2xl overflow-hidden">
                      <button
                        onClick={() => setShowAuthForm(!showAuthForm)}
                        className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-red-500 hover:text-red-300 hover:bg-gray-500 rounded-full p-2 transform transition-transform duration-300 hover:scale-110 active:scale-90 cursor-pointer z-50"
                      >
                        <X size={18} />
                      </button>

                      <div className="perspective-1000">
                        <div
                          className={`relative transform transition-transform duration-700 ${
                            isFlipped ? 'rotate-y-180' : ''
                          }`}
                        >
                          {/* Front Side - Social Login Options */}
                          <div
                            className={`p-6 backface-hidden ${
                              isFlipped ? 'hidden' : 'block'
                            }`}
                          >
                            <h2 className="text-2xl font-bold text-center mb-6 text-gray-500">Sign In</h2>
                            <div className="flex justify-center space-x-8 mb-6">
                              {authMethods.map((method, index) => (
                                <div key={index} className="text-center backdrop-blur-md hover:bg-gray-500 p-2 rounded-full shadow-md shadow-black">
                                  {method.icon}
                                </div>
                              ))}
                            </div>
                            {error && <div className="text-red-400 text-sm text-center mb-4">{error}</div>}
                            <div className="text-center">
                              <button
                                onClick={handleCardToggle}
                                className="mt-4 text-white px-4 py-2 shadow-md shadow-black rounded-lg backdrop-blur-md transform hover:underline hover:bg-black"
                              >
                                Login with Email
                              </button>
                            </div>
                          </div>

                          {/* Back Side - Email Login Form */}
                          <div
                            className={`p-6 backface-hidden ${
                              isFlipped ? 'block' : 'hidden'
                            }`}
                          >
                            <h2 className="text-2xl font-bold text-center mb-6 text-gray-500">Email Login</h2>
                            <div className="space-y-4">
                              {/* Email Input */}
                              <div className="flex items-center bg-white/10 rounded-lg p-2">
                                <Mail size={18} />
                                <input
                                  type="email"
                                  placeholder="Email"
                                  value={loginCredentials.email}
                                  onChange={handleCredentialChange('email')}
                                  className="w-full bg-transparent px-4 py-2  text-gray-500 placeholder-white/50 focus:outline-none"
                                />
                              </div>

                              {/* Password Input */}
                              <div className="flex items-center bg-white/10 rounded-lg p-2">
                                <Lock size={18} />
                                <input
                                  type="password"
                                  placeholder="Password"
                                  value={loginCredentials.password}
                                  onChange={handleCredentialChange('password')}
                                  className="w-full bg-transparent px-4 py-2  text-gray-500 placeholder-white/50 focus:outline-none"
                                />
                              </div>

                              <div className="flex justify-evenly">
                                <button
                                  onClick={handleEmailLogin}
                                  className="bg-gray-500 hover:bg-gray-700  px-4 py-2 shadow-md shadow-black rounded-lg  text-white font-bold transition-colors"
                                >
                                  Login
                                </button>
                                <button
                                  onClick={handleEmailSignup}
                                  className="bg-gray-500  px-4 py-2 shadow-md shadow-black rounded-lg  hover:bg-gray-700 text-white font-bold transition-colors"
                                >
                                  Signup
                                </button>
                              </div>
                            </div>
                            <div className="text-center mt-4">
                              <button
                                onClick={handleCardToggle}
                                className="text-white px-4 py-2 shadow-md shadow-black rounded-lg backdrop-blur-md transform hover:underline hover:bg-black"
                              >
                                Back to Social Login
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </AuthContext.Provider>
      )}
    </>
  );
};

export default GlamourousAuthCard;