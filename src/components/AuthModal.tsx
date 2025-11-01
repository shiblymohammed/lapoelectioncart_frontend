"use client";

import { useState } from "react";
import { Heading } from "./Heading";
import { useAuth } from "@/context/AuthContext";
import authService from "@/services/authService";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login
        const response = await authService.login(username, password);
        await login(response.user, response.token);
        onClose();
        // Reset form
        setUsername("");
        setPassword("");
      } else {
        // Sign up
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setIsLoading(false);
          return;
        }
        const response = await authService.signup(username, password);
        await login(response.user, response.token);
        onClose();
        // Reset form
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-texture bg-brand-purple rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-texture bg-brand-purple p-6">
            <div className="flex items-center justify-between">
              <Heading as="h2" className="text-2xl text-black">
                {isLogin ? "Welcome Back!" : "Join Us!"}
              </Heading>
              <button
                onClick={onClose}
                className="text-black hover:text-white transition-colors text-3xl font-bold leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500 text-white px-4 py-3 rounded-lg font-bold">
                {error}
              </div>
            )}

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-white font-bold mb-2 text-lg"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-4 border-black bg-white text-black font-bold text-lg focus:outline-none focus:ring-4 focus:ring-brand-lime transition-all"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-white font-bold mb-2 text-lg"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-4 border-black bg-white text-black font-bold text-lg focus:outline-none focus:ring-4 focus:ring-brand-lime transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Confirm Password (Sign Up only) */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-white font-bold mb-2 text-lg"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-4 border-black bg-white text-black font-bold text-lg focus:outline-none focus:ring-4 focus:ring-brand-lime transition-all"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full button-cutout bg-gradient-to-b from-brand-orange to-brand-lime from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom text-black hover:text-black px-6 py-4 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
            </button>

            {/* Toggle Login/Sign Up */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setConfirmPassword("");
                  setError("");
                }}
                className="text-brand-lime hover:text-brand-orange font-bold text-lg transition-colors underline"
              >
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
