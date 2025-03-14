"use client";

import type React from "react";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Removed the import for Card components due to the error
import { Label } from "@/components/ui/label";
import { X, Mail, Lock, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Icon } from "@iconify/react";

interface AuthOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AuthUser {
  displayName?: string;
  email?: string;
  photoURL?: string;
}

export function AuthOverlay({ isOpen, onClose }: AuthOverlayProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);

  const handleCredentialChange = useCallback(
    (field: "email" | "password") =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      },
    [],
  );

  const handleSignIn = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate authentication
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful login
      setUser({
        displayName: "Demo User",
        email: credentials.email,
        photoURL: undefined,
      });
    } catch (err) {
      setError("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [credentials]);

  const handleSignUp = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate registration
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful registration
      setUser({
        displayName: "New User",
        email: credentials.email,
        photoURL: undefined,
      });
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [credentials]);

  const handleGoogleAuth = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate Google authentication
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful Google login
      setUser({
        displayName: "Google User",
        email: "google.user@example.com",
        photoURL: "/placeholder.svg?height=40&width=40",
      });
    } catch (err) {
      setError("Google authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setCredentials({ email: "", password: "" });
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="z-10 w-full max-w-md p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              <Card className="border shadow-lg">
                <CardContent className="flex flex-col items-center justify-center p-6 h-64">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <p className="mt-4 text-muted-foreground">
                    Authenticating...
                  </p>
                </CardContent>
              </Card>
            ) : user ? (
              <Card className="border shadow-lg">
                <CardHeader className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={onClose}
                  >
                    
                      <X className="h-4 w-4" onClick={()=>{setVisible(!visible)}} />
                  </Button>
                  <CardTitle>Welcome</CardTitle>
                  <CardDescription>You are now signed in</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="flex items-center space-x-4">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL || "/placeholder.png"}
                        alt="Profile"
                        className="h-16 w-16 rounded-full object-cover border border-border"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {user.displayName?.charAt(0) ||
                          user.email?.charAt(0) ||
                          "U"}
                      </div>
                    )}
                    <div>
                      <p className="font-medium">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleLogout} className="w-full">
                    Sign Out
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="border shadow-lg">
                <CardHeader className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4" onClick={()=>{setVisible(!visible)}} />
                  </Button>
                  <CardTitle>Authentication</CardTitle>
                  <CardDescription>
                    Sign in to your account or create a new one
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Tabs defaultValue="signin" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="signin">Sign In</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="pl-10"
                            value={credentials.email}
                            onChange={handleCredentialChange("email")}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={credentials.password}
                            onChange={handleCredentialChange("password")}
                          />
                        </div>
                      </div>

                      {error && (
                        <p className="text-sm font-medium text-destructive">
                          {error}
                        </p>
                      )}

                      <Button onClick={handleSignIn} className="w-full">
                        Sign In
                      </Button>

                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        onClick={handleGoogleAuth}
                        className="w-full"
                      >
                        <Icon icon="logos:google-icon" />
                        Google
                      </Button>
                    </TabsContent>

                    <TabsContent value="signup" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="name@example.com"
                            className="pl-10"
                            value={credentials.email}
                            onChange={handleCredentialChange("email")}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={credentials.password}
                            onChange={handleCredentialChange("password")}
                          />
                        </div>
                      </div>

                      {error && (
                        <p className="text-sm font-medium text-destructive">
                          {error}
                        </p>
                      )}

                      <Button onClick={handleSignUp} className="w-full">
                        Create Account
                      </Button>

                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        onClick={handleGoogleAuth}
                        className="w-full"
                      >
                        <Icon icon="icons:google-icon" />
                        Google
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
