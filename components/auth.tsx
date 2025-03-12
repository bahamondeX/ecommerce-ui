"use client";

import React, { useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { useAuth } from '@/hooks/use-auth';
import UserCard from '@/components/ui/user-card';
import { AuthContext } from '@/contexts/AuthContext';
import { Expand, Lock, Mail, UserIcon } from 'lucide-react';

interface AuthCardProps {
  onExpand?: () => void;
}

const GlamourousAuthCard: React.FC<AuthCardProps> = ({ onExpand }) => {
  const { user, error, loading, login, logout, signin, signup } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const handleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
    if (onExpand) onExpand();
  }, [isExpanded, onExpand]);

  const handleEmailLogin = useCallback(async () => {
    await signin({ email: loginCredentials.email, password: loginCredentials.password });
  }, [loginCredentials, signin]);

  const handleEmailSignup = useCallback(async () => {
    await signup({ email: loginCredentials.email, password: loginCredentials.password });
  }, [loginCredentials, signup]);

  const authMethods = [
    {
      name: 'Google',
      icon: (
        <Icon
          icon="logos:google-icon"
          className="h-16 w-16 p-12 cursor-pointer mx-auto rounded-lg hover:scale-150"
          onClick={() => login('google')}
        />
      ),
      handler: () => login('google')
    },
    {
      name: 'Facebook',
      icon: (
        <Icon
          icon="logos:facebook-icon"
          className="h-16 w-16 p-12 cursor-pointer mx-auto rounded-lg hover:scale-150"
          onClick={() => login('facebook')}
        />
      ),
      handler: () => login('facebook')
    }
  ];

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, logout: logout }}>
      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl"></div>
      ) : user ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl">
          <UserCard user={user} logout={logout} />
        </div>
      ) : (
        <div
          className={`fixed m-12 mx-auto inset-0 z-50 flex items-center justify-center backdrop-blur-xl transition-all duration-500 bg-gray-500 cursor-pointer ${
            isExpanded ? 'w-full h-full' : 'w-80 h-20vh'
          }`}
        >
          <div className="relative w-full h-full perspective-1000">
            <div
              className={`absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-700 ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front Side - User Profile or Login Options */}
              <div
                className={`absolute inset-0 flex flex-col justify-between transform transition-transform duration-700 backface-hidden ${
                  isFlipped ? 'rotate-y-180 opacity-0' : 'opacity-100'
                }`}
              >
                <div className="flex flex-col space-y-4 p-4">
                  <div className="flex space-x-4">
                    {authMethods.map((method, index) => (
                      <button
                        key={index}
                        onClick={method.handler}
                        className="flex-1 hover:bg-white/20 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transform transition-transform duration-300 hover:scale-110 active:scale-90"
                      >
                        {method.icon}
                        <span>{method.name}</span>
                      </button>
                    ))}
                  </div>
                  {error && <div className="text-red-400 text-sm text-center">{error}</div>}
                  <button
                    onClick={handleCardToggle}
                    className="mt-4 text-white hover:underline"
                  >
                    {isFlipped ? 'Back to Social Login' : 'Login with Email'}
                  </button>
                </div>
              </div>

              {/* Back Side - Login Form */}
              <div
                className={`absolute inset-0 p-6 flex flex-col justify-between transform transition-transform duration-700 backface-hidden ${
                  isFlipped ? 'opacity-100' : 'rotate-y-180 opacity-0'
                }`}
              >
                <div className="space-y-4 p-4">
                  {/* Email Input */}
                  <div className="flex items-center bg-white/10 rounded-lg p-2">
                    <Mail />
                    <input
                      type="email"
                      placeholder="Email"
                      value={loginCredentials.email}
                      onChange={handleCredentialChange('email')}
                      className="w-full bg-transparent px-4 py-2 text-white placeholder-white/50 focus:outline-none"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="flex items-center bg-white/10 rounded-lg p-2">
                    <Lock />
                    <input
                      type="password"
                      placeholder="Password"
                      value={loginCredentials.password}
                      onChange={handleCredentialChange('password')}
                      className="w-full bg-transparent px-4 py-2 text-white placeholder-white/50 focus:outline-none"
                    />
                  </div>
                  <div className='flex justify-evenly'>
                    <button onClick={handleEmailLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
                    <button onClick={handleEmailSignup} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Signup</button>
                  </div>
                </div>
                <button
                  onClick={handleCardToggle}
                  className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-white rounded-full transform transition-transform duration-300 hover:scale-110 active:scale-90"
                >
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

  );
};

export default GlamourousAuthCard;