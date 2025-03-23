"use client";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
  User,
  FacebookAuthProvider,
} from "firebase/auth";
import firebaseConfig from "./config.json";

type AuthProvider = "google" | "facebook" | "email";

type AuthCredentials = {
  email: string;
  password: string;
};

type AuthState = {
  user: User | null;
  error: string | null;
  loading: boolean;
  login: (
    provider: AuthProvider,
    credentials?: AuthCredentials,
  ) => Promise<void>;
  logout: () => Promise<void>;
  signin: (credentials: AuthCredentials) => Promise<void>;
  signup: (credentials: AuthCredentials) => Promise<void>;
  verify: () => Promise<void>;
  isAuthenticated: boolean;
};

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const google = new GoogleAuthProvider();
  const facebook = new FacebookAuthProvider();
  [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/calendar",
    "https://mail.google.com/",
  ].forEach((scope) => google.addScope(scope));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      currentUser ? setIsAuthenticated(true) : setIsAuthenticated(false);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (
    provider: AuthProvider,
    credentials?: AuthCredentials,
  ): Promise<void> => {
    try {
      switch (provider) {
        case "google":
          await signInWithPopup(auth, google);
          break;
        case "facebook":
          await signInWithPopup(auth, facebook);
        case "email":
          if (!credentials) throw new Error("No credentials provided");
          await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password,
          );
      }
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error logging in";
      setError(errorMessage);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error logging out";
      setError(errorMessage);
    }
  };

  const signin = async (credentials: AuthCredentials): Promise<void> => {
    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      );
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error signing in with email";
      setError(errorMessage);
    }
  };

  const signup = async (credentials: AuthCredentials): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      );
      await sendEmailVerification(userCredential.user);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error signing up with email";
      setError(errorMessage);
    }
  };

  const verify = async (): Promise<void> => {
    if (user) {
      try {
        await sendEmailVerification(user);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Error sending verification email";
        setError(errorMessage);
      }
    } else {
      setError("No user is currently logged in");
    }
  };

  return {
    user,
    error,
    loading,
    login,
    logout,
    signin,
    signup,
    verify,
    isAuthenticated,
  };
}
