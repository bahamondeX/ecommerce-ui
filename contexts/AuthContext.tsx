"use client";
import type React from "react";
import { useState, useCallback, createContext } from "react";
import { useAuth } from "@/hooks/use-auth";
import type { User } from "firebase/auth";
import { Icon } from "@iconify/react";

type AuthProvider = "google" | "facebook" | "email";

type AuthCredentials = {
  email: string;
  password: string;
};

type AuthCardProps = {
  children: React.ReactNode;
};

type AuthContextProps = {
  isAuthenticated: boolean;
  user?: User | null;
  logout?: () => any;
  loading?: boolean;
};

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  logout: () => {}
});

const AuthComponent: React.FC<AuthCardProps> = ({ children }) => {
  const {
    user,
    error,
    loading,
    login,
    logout,
    signin,
    signup,
    verify,
    isAuthenticated,
  } = useAuth();

  const [isFlipped, setIsFlipped] = useState(false);
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

  const handleEmailVerify = useCallback(async () => {
    await verify();
  }, [verify]);

  const authMethods: React.FC<{
    provider: AuthProvider;
    credentials?: AuthCredentials;
  }>[] = [
    ({ provider }) => (
      <button
        onClick={() => login(provider)}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded flex items-center justify-center gap-2"
      >
        <Icon icon="logos:google-icon" width="24" height="24" />
        Google
      </button>
    ),
    ({ provider }) => (
      <button
        onClick={() => login(provider)}
        className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded flex items-center justify-center gap-2"
      >
        <Icon icon="logos:facebook" width="24" height="24" />
        Facebook
      </button>
    ),
    ({ provider, credentials }) => (
      <div>
        <input
          type="email"
          placeholder="Email"
          value={loginCredentials.email}
          onChange={handleCredentialChange("email")}
          className="w-full p-2 mb-2 border rounded bg-gray-50 text-gray-800"
        />
        <input
          type="password"
          placeholder="Password"
          value={loginCredentials.password}
          onChange={handleCredentialChange("password")}
          className="w-full p-2 mb-4 border rounded bg-gray-50 text-gray-800"
        />
        {isFlipped ? (
          <button
            onClick={handleEmailSignup}
            className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded w-full"
          >
            Sign Up
          </button>
        ) : (
          <button
            onClick={handleEmailLogin}
            className="bg-amber-800 hover:bg-amber-900 text-white font-semibold py-2 px-4 rounded w-full"
          >
            Sign In
          </button>
        )}
        <button
          onClick={handleCardToggle}
          className="text-amber-600 underline mt-2 w-full block text-center"
        >
          {isFlipped ? "Sign In" : "Sign Up"}
        </button>
        {user && !user.emailVerified && (
          <button
            onClick={handleEmailVerify}
            className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded w-full"
          >
            Verify Email
          </button>
        )}
      </div>
    ),
  ];

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-amber-50 p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold mb-4 text-center text-amber-900">
            {isFlipped ? "Sign Up" : "Sign In"}
          </h2>
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <div className="flex flex-col gap-4">
            {authMethods.map((Method, index) => (
              <Method
                key={index}
                provider={
                  ["google", "facebook", "email"][index] as AuthProvider
                }
                credentials={loginCredentials}
              />
            ))}
          </div>
          {isAuthenticated && (
            <div className="mt-4 text-center">
              <p className="text-amber-800">Welcome, {user?.email}!</p>
              <button
                onClick={logout}
                className="mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
    </div>)
};

export default AuthComponent;

export { AuthContext };
