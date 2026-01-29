

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff,
  MessageSquare,
  Shield,
  Clock,
  Globe,
  Zap,
  TrendingUp,
  Users,
  Briefcase,
  Award,
  Building2,
  LineChart,
  Fingerprint,
  Check
} from "lucide-react";
import CustomApiServices from "../services/CustomApiService";

const Login = () => {
  const { POST } = CustomApiServices();
  const navigate = useNavigate();
  const [type, setType] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const schema = useMemo(() => {
    const baseSchema = {
      email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Email address is required"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[a-z]/, "Must contain at least one lowercase letter")
        .matches(/\d/, "Must contain at least one number")
        .required("Password is required"),
    };

    if (type === "signup") {
      return yup.object().shape({
        name: yup
          .string()
          .min(2, "Name must be at least 2 characters")
          .max(50, "Name cannot exceed 50 characters")
          .required("Full name is required"),
        ...baseSchema,
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords must match")
          .required("Please confirm your password"),
        
      });
    }

    return yup.object().shape(baseSchema);
  }, [type]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(schema),
  });

  const passwordValue = watch("password", "");

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    
    try {
      const endpoint = type === "login" ? "user/signIn" : "user/signUp";
      const payload = type === "login" 
        ? { email: data.email, password: data.password }
        : { 
            name: data.name, 
            email: data.email, 
            password: data.password,
           
          };

      const response = await POST(endpoint, {}, {}, payload);
  if(response.success){
    navigate("/chat")
  }
     
    } catch (error) {
      console.error("Authentication Error:", error);
      setError(
        error.response?.data?.message || 
        error.message || 
        "Authentication failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <div className="h-full w-full flex flex-col lg:flex-row">
        {/* Left Panel - Full Height Content */}
        <div className="lg:w-1/2 h-full p-6 lg:p-8 xl:p-12 flex flex-col overflow-hidden">
          {/* Logo */}
          <div className="flex items-center space-x-4 mb-8 lg:mb-12">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl shadow-lg">
              <MessageSquare size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">TalkMate</h1>
              <p className="text-sm text-blue-200/70 mt-1">Enterprise Communication</p>
            </div>
          </div>

          {/* Hero Content - No Scroll */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 mb-6">
                <Zap className="w-4 h-4 mr-2 text-blue-300" />
                <span className="text-sm font-medium text-blue-200">Trusted by 15,000+ teams</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                Professional<br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Team Collaboration
                </span>
              </h2>
              
              <p className="text-lg text-blue-100/80 leading-relaxed">
                Secure, intelligent platform for modern team communication with enterprise-grade features.
              </p>
            </div>

            {/* Features Grid - Fixed Height */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 flex-1 overflow-hidden">
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Enterprise Security</h3>
                    <p className="text-sm text-blue-200/70">End-to-end encryption</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
                    <LineChart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Productivity</h3>
                    <p className="text-sm text-blue-200/70">Real-time analytics</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Scale</h3>
                    <p className="text-sm text-blue-200/70">For teams of all sizes</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Award Winning</h3>
                    <p className="text-sm text-blue-200/70">2024 Best Platform</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial - Fixed at bottom */}
            <div className="mt-6 p-5 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-xl border border-blue-500/20">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-blue-100/80 text-sm italic mb-2">
                    "NexusChat transformed how our remote team collaborates. The security features are outstanding."
                  </p>
                  <div>
                    <p className="font-semibold text-white text-sm">Alex Morgan</p>
                    <p className="text-xs text-blue-200/60">CTO, TechVision Corp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Full Height Form */}
        <div className="lg:w-1/2 h-full flex items-center justify-center p-4 lg:p-6 xl:p-8 bg-white">
          <div className="w-full max-w-md h-full flex flex-col justify-center py-8">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl shadow">
                <MessageSquare size={28} className="text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-900">TalkMate</h1>
                <p className="text-slate-600 text-xs">Professional Communication</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 lg:p-8">
              {/* Form Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {type === "login" ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-slate-600 text-sm">
                  {type === "login" 
                    ? "Sign in to your professional workspace" 
                    : "Start your team collaboration journey"}
                </p>
              </div>

              {/* Authentication Tabs */}
              <div className="flex mb-6 bg-slate-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => {
                    setType("login");
                    reset();
                    setError("");
                  }}
                  className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-all ${
                    type === "login"
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setType("signup");
                    reset();
                    setError("");
                  }}
                  className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-all ${
                    type === "signup"
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Error Display */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {type === "signup" && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="w-4 h-4 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        {...register("name")}
                        className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Smith"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your Email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className="w-full pl-9 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {type === "signup" && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="w-4 h-4 text-slate-400" />
                      </div>
                      <input
                        type="password"
                        {...register("confirmPassword")}
                        className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                )}

                {type === "signup" && (
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      {...register("acceptTerms")}
                      className="mt-0.5 h-3.5 w-3.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                    <label className="text-xs text-slate-600">
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                        Terms
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                )}

                {type === "login" && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        className="h-3.5 w-3.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="remember" className="ml-1.5 text-xs text-slate-600">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      Forgot password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 text-sm font-semibold rounded-lg transition-all ${
                    loading
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow hover:shadow-md active:scale-[0.98]"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {type === "login" ? "Signing In..." : "Creating Account..."}
                    </div>
                  ) : (
                    type === "login" ? "Sign In" : "Create Account"
                  )}
                </button>

                {/* Divider */}
                {/* <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white text-slate-500">Or continue with</span>
                  </div>
                </div> */}

                {/* Social Login */}
                {/* <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("google")}
                    className="flex items-center justify-center py-2.5 px-3 border border-slate-200 rounded-lg hover:bg-slate-50 text-sm"
                  >
                    <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="font-medium text-slate-700">Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("microsoft")}
                    className="flex items-center justify-center py-2.5 px-3 border border-slate-200 rounded-lg hover:bg-slate-50 text-sm"
                  >
                    <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24">
                      <path fill="#f25022" d="M1 1h10v10H1z"/>
                      <path fill="#00a4ef" d="M13 1h10v10H13z"/>
                      <path fill="#7fba00" d="M1 13h10v10H1z"/>
                      <path fill="#ffb900" d="M13 13h10v10H13z"/>
                    </svg>
                    <span className="font-medium text-slate-700">Microsoft</span>
                  </button>
                </div> */}
              </form>

              {/* Footer Links */}
              <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="text-center text-xs text-slate-500">
                  {type === "login" ? (
                    <>
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setType("signup")}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setType("login")}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Sign in
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;