

// import React, { useState, useMemo } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthProvider";
// import Cookies from "js-cookie";
// import { 
//   Mail, 
//   Lock, 
//   User, 
//   Eye, 
//   EyeOff,
//   MessageSquare,
//   Shield,
//   Clock,
//   Globe,
//   Zap,
//   TrendingUp,
//   Users,
//   Briefcase,
//   Award,
//   Building2,
//   LineChart,
//   Fingerprint,
//   Check
// } from "lucide-react";
// import CustomApiServices from "../services/CustomApiService";
// import { toast } from "sonner";

// const Login = () => {
//   const {login}=useAuth();
//   const { POST } = CustomApiServices();
//   const navigate = useNavigate();
//   const [type, setType] = useState("login");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
  
//   const schema = useMemo(() => {
//     const baseSchema = {
//       email: yup
//         .string()
//         .email("Please enter a valid email address")
//         .required("Email address is required"),
//       password: yup
//         .string()
//         .min(8, "Password must be at least 8 characters")
//         .matches(/[A-Z]/, "Must contain at least one uppercase letter")
//         .matches(/[a-z]/, "Must contain at least one lowercase letter")
//         .matches(/\d/, "Must contain at least one number")
//         .required("Password is required"),
//     };

//     if (type === "signup") {
//       return yup.object().shape({
//         name: yup
//           .string()
//           .min(2, "Name must be at least 2 characters")
//           .max(50, "Name cannot exceed 50 characters")
//           .required("Full name is required"),
//         ...baseSchema,
//         confirmPassword: yup
//           .string()
//           .oneOf([yup.ref("password"), null], "Passwords must match")
//           .required("Please confirm your password"),
        
//       });
//     }

//     return yup.object().shape(baseSchema);
//   }, [type]);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const passwordValue = watch("password", "");

//   const onSubmit = async (data) => {
//     setLoading(true);
//     setError("");
    
//     try {
//       const endpoint = type === "login" ? "user/signIn" : "user/signUp";
//       const payload = type === "login" 
//         ? { email: data.email, password: data.password }
//         : { 
//             name: data.name, 
//             email: data.email, 
//             password: data.password,
           
//           };

//       const response = await POST(endpoint, {}, {}, payload);
//   if(response.success){
//     login(response.data);
//       navigate("/chat")
//     toast.success(response.message || (type === "login" ? "Logged in successfully!" : "Account created successfully!"));
  
//   }
     
//     } catch (error) {
//       console.error("Authentication Error:", error);
//       setError(
//         error.response?.data?.message || 
//         error.message || 
//         "Authentication failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSocialLogin = (provider) => {
//     console.log(`Logging in with ${provider}`);
//   };

//   return (
//     <div className="h-screen w-screen overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-blue-900">
//       <div className="h-full w-full flex flex-col lg:flex-row">
//         {/* Left Panel - Full Height Content */}
//         {/* 


//         {/* Right Panel - Full Height Form */}

//         <div className="lg:w-1/2 h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-12 flex items-center justify-center relative overflow-hidden">
//   {/* Animated background elements */}
//   {/* <div className="absolute inset-0">
//     <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//     <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//     <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
//   </div> */}

//   {/* Main SVG Illustration */}
//   <div className="relative z-10 w-full max-w-lg">
//     <svg viewBox="0 0 500 500" className="w-full h-auto drop-shadow-2xl">
//       {/* Background decorative circles */}
//       <circle cx="250" cy="250" r="200" fill="url(#grad1)" opacity="0.1" />
//       <circle cx="250" cy="250" r="150" fill="url(#grad2)" opacity="0.1" />
      
//       {/* Main chat interface illustration */}
//       <g transform="translate(50, 50)">
//         {/* Chat window background */}
//         <rect x="50" y="50" width="350" height="350" rx="30" fill="white" opacity="0.95" className="drop-shadow-xl" />
        
//         {/* Chat header */}
//         <rect x="50" y="50" width="350" height="70" rx="30" fill="url(#headerGrad)" />
//         <circle cx="100" cy="85" r="20" fill="white" opacity="0.9" />
//         <circle cx="140" cy="85" r="6" fill="#4ADE80" stroke="white" strokeWidth="2" />
//         <text x="180" y="95" fontFamily="Arial" fontSize="16" fill="white" fontWeight="bold">Team Chat</text>
        
//         {/* Chat messages */}
//         {/* Message 1 - Received */}
//         <rect x="80" y="140" width="150" height="45" rx="20" fill="#F3F4F6" />
//         <circle cx="60" cy="162" r="15" fill="#60A5FA" />
//         <text x="45" y="167" fontFamily="Arial" fontSize="12" fill="white" textAnchor="middle">JD</text>
//         <text x="95" y="165" fontFamily="Arial" fontSize="12" fill="#374151">Hey team! 🚀</text>
//         <text x="190" y="175" fontFamily="Arial" fontSize="8" fill="#9CA3AF">10:30</text>
        
//         {/* Message 2 - Sent */}
//         <rect x="200" y="200" width="150" height="45" rx="20" fill="#3B82F6" />
//         <text x="215" y="222" fontFamily="Arial" fontSize="12" fill="white">Great to see you!</text>
//         <text x="320" y="235" fontFamily="Arial" fontSize="8" fill="#BFDBFE">10:32 ✓✓</text>
        
//         {/* Message 3 - File attachment */}
//         <rect x="80" y="260" width="180" height="55" rx="20" fill="#F3F4F6" />
//         <rect x="95" y="275" width="30" height="30" rx="8" fill="#60A5FA" />
//         <text x="100" y="295" fontFamily="Arial" fontSize="10" fill="white">📎</text>
//         <text x="135" y="285" fontFamily="Arial" fontSize="12" fill="#374151">project-file.pdf</text>
//         <text x="135" y="302" fontFamily="Arial" fontSize="10" fill="#6B7280">2.4 MB</text>
        
//         {/* Message 4 - Image attachment */}
//         <rect x="200" y="330" width="120" height="80" rx="15" fill="#F3F4F6" />
//         <rect x="215" y="345" width="90" height="50" rx="8" fill="#D1D5DB" />
//         <text x="260" y="375" fontFamily="Arial" fontSize="10" fill="#6B7280" textAnchor="middle">📷 Image</text>
        
//         {/* Typing indicator */}
//         <circle cx="100" cy="430" r="6" fill="#4ADE80" opacity="0.6" className="animate-pulse" />
//         <circle cx="120" cy="430" r="6" fill="#4ADE80" opacity="0.6" className="animate-pulse animation-delay-200" />
//         <circle cx="140" cy="430" r="6" fill="#4ADE80" opacity="0.6" className="animate-pulse animation-delay-400" />
        
//         {/* Input field */}
//         <rect x="80" y="390" width="250" height="45" rx="25" fill="white" stroke="#E5E7EB" strokeWidth="2" />
//         <text x="100" y="420" fontFamily="Arial" fontSize="14" fill="#9CA3AF">Type your message...</text>
//         <circle cx="300" cy="412" r="18" fill="#3B82F6" />
//         <text x="300" y="417" fontFamily="Arial" fontSize="12" fill="white" textAnchor="middle">📤</text>
//       </g>
      
//       {/* Floating elements */}
//       <g className="animate-float">
//         <circle cx="100" cy="100" r="8" fill="#FBBF24" />
//         <circle cx="400" cy="150" r="12" fill="#34D399" />
//         <circle cx="450" cy="350" r="10" fill="#F87171" />
//       </g>
      
//       {/* Connection lines */}
//       <path d="M150 150 L200 200 L250 150" stroke="white" strokeWidth="2" fill="none" opacity="0.2" strokeDasharray="5,5" />
      
//       {/* Gradients */}
//       <defs>
//         <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" stopColor="#3B82F6" />
//           <stop offset="100%" stopColor="#8B5CF6" />
//         </linearGradient>
//         <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" stopColor="#EC4899" />
//           <stop offset="100%" stopColor="#8B5CF6" />
//         </linearGradient>
//         <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
//           <stop offset="0%" stopColor="#3B82F6" />
//           <stop offset="100%" stopColor="#8B5CF6" />
//         </linearGradient>
        
//         {/* Avatar patterns */}
//         <pattern id="avatar1" patternUnits="userSpaceOnUse" width="30" height="30">
//           <circle cx="15" cy="15" r="15" fill="#60A5FA" />
//           <text x="8" y="22" fontFamily="Arial" fontSize="14" fill="white">JD</text>
//         </pattern>
//       </defs>
      
//       {/* Connection nodes */}
//       <g className="animate-pulse">
//         <circle cx="200" cy="200" r="4" fill="#60A5FA" />
//         <circle cx="300" cy="250" r="4" fill="#FBBF24" />
//         <circle cx="250" cy="300" r="4" fill="#34D399" />
//       </g>
//     </svg>

//     {/* Floating stats cards */}
//     <div className="absolute -top-10 right-10 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl animate-float animation-delay-2000">
//       <div className="flex items-center space-x-3">
//         <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
//           <Users className="w-6 h-6 text-white" />
//         </div>
//         <div>
//           <p className="text-sm text-gray-500">Active Users</p>
//           <p className="text-2xl font-bold text-gray-800">1,482</p>
//         </div>
//       </div>
//     </div>

//     <div className="absolute -bottom-5 left-0 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl animate-float animation-delay-4000">
//       <div className="flex items-center space-x-3">
//         <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
//           <MessageSquare className="w-6 h-6 text-white" />
//         </div>
//         <div>
//           <p className="text-sm text-gray-500">Messages Today</p>
//           <p className="text-2xl font-bold text-gray-800">12.5K</p>
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* Add animation styles */}
//   <style>{`
//     @keyframes blob {
//       0% { transform: translate(0px, 0px) scale(1); }
//       33% { transform: translate(30px, -50px) scale(1.1); }
//       66% { transform: translate(-20px, 20px) scale(0.9); }
//       100% { transform: translate(0px, 0px) scale(1); }
//     }
//     .animate-blob {
//       animation: blob 7s infinite;
//     }
//     .animation-delay-2000 {
//       animation-delay: 2s;
//     }
//     .animation-delay-4000 {
//       animation-delay: 4s;
//     }
    
//     @keyframes float {
//       0% { transform: translateY(0px); }
//       50% { transform: translateY(-10px); }
//       100% { transform: translateY(0px); }
//     }
//     .animate-float {
//       animation: float 3s ease-in-out infinite;
//     }
//   `}</style>
// </div>
//         <div className="lg:w-1/2 h-full flex items-center justify-center p-4 lg:p-6 xl:p-8 bg-white">
//           <div className="w-full max-w-md h-full flex flex-col justify-center py-8">
//             {/* Mobile Header */}
//             <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
//               <div className="p-3 bg-linear-to-br from-blue-500 to-cyan-400 rounded-xl shadow">
//                 <MessageSquare size={28} className="text-white" />
//               </div>
//               <div className="text-center">
//                 <h1 className="text-2xl font-bold text-slate-900">TalkMate</h1>
//                 <p className="text-slate-600 text-xs">Professional Communication</p>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl p-6 lg:p-8">
//               {/* Form Header */}
//               <div className="mb-6">
//                 <h2 className="text-2xl font-bold text-slate-900 mb-2">
//                   {type === "login" ? "Welcome Back" : "Create Account"}
//                 </h2>
//                 <p className="text-slate-600 text-sm">
//                   {type === "login" 
//                     ? "Sign in to your professional workspace" 
//                     : "Start your team collaboration journey"}
//                 </p>
//               </div>

//               {/* Authentication Tabs */}
//               <div className="flex mb-6 bg-slate-100 rounded-lg p-1">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setType("login");
//                     reset();
//                     setError("");
//                   }}
//                   className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-all ${
//                     type === "login"
//                       ? "bg-white text-slate-900 shadow-sm border border-slate-200"
//                       : "text-slate-600 hover:text-slate-900"
//                   }`}
//                 >
//                   Sign In
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setType("signup");
//                     reset();
//                     setError("");
//                   }}
//                   className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-all ${
//                     type === "signup"
//                       ? "bg-white text-slate-900 shadow-sm border border-slate-200"
//                       : "text-slate-600 hover:text-slate-900"
//                   }`}
//                 >
//                   Sign Up
//                 </button>
//               </div>

//               {/* Error Display */}
//               {error && (
//                 <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                   <p className="text-red-600 text-sm">{error}</p>
//                 </div>
//               )}

//               {/* Form */}
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 {type === "signup" && (
//                   <div>
//                     <label className="block text-xs font-medium text-slate-700 mb-1">
//                       Full Name *
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <User className="w-4 h-4 text-slate-400" />
//                       </div>
//                       <input
//                         type="text"
//                         {...register("name")}
//                         className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="John Smith"
//                       />
//                     </div>
//                     {errors.name && (
//                       <p className="mt-1 text-xs text-red-600">
//                         {errors.name.message}
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-xs font-medium text-slate-700 mb-1">
//                     Email Address *
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Mail className="w-4 h-4 text-slate-400" />
//                     </div>
//                     <input
//                       type="email"
//                       {...register("email")}
//                       className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter your Email"
//                     />
//                   </div>
//                   {errors.email && (
//                     <p className="mt-1 text-xs text-red-600">
//                       {errors.email.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-slate-700 mb-1">
//                     Password *
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="w-4 h-4 text-slate-400" />
//                     </div>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       {...register("password")}
//                       className="w-full pl-9 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="••••••••"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="w-4 h-4 text-slate-400 hover:text-slate-600" />
//                       ) : (
//                         <Eye className="w-4 h-4 text-slate-400 hover:text-slate-600" />
//                       )}
//                     </button>
//                   </div>
//                   {errors.password && (
//                     <p className="mt-1 text-xs text-red-600">
//                       {errors.password.message}
//                     </p>
//                   )}
//                 </div>

//                 {type === "signup" && (
//                   <div>
//                     <label className="block text-xs font-medium text-slate-700 mb-1">
//                       Confirm Password *
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Lock className="w-4 h-4 text-slate-400" />
//                       </div>
//                       <input
//                         type="password"
//                         {...register("confirmPassword")}
//                         className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="••••••••"
//                       />
//                     </div>
//                     {errors.confirmPassword && (
//                       <p className="mt-1 text-xs text-red-600">
//                         {errors.confirmPassword.message}
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 {type === "signup" && (
//                   <div className="flex items-start space-x-2">
//                     <input
//                       type="checkbox"
//                       {...register("acceptTerms")}
//                       className="mt-0.5 h-3.5 w-3.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
//                     />
//                     <label className="text-xs text-slate-600">
//                       I agree to the{" "}
//                       <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
//                         Terms
//                       </a>{" "}
//                       and{" "}
//                       <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
//                         Privacy Policy
//                       </a>
//                     </label>
//                   </div>
//                 )}

//                 {type === "login" && (
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         id="remember"
//                         className="h-3.5 w-3.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
//                       />
//                       <label htmlFor="remember" className="ml-1.5 text-xs text-slate-600">
//                         Remember me
//                       </label>
//                     </div>
//                     <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
//                       Forgot password?
//                     </a>
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full py-3 text-sm font-semibold rounded-lg transition-all ${
//                     loading
//                       ? "bg-slate-400 cursor-not-allowed"
//                       : "bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow hover:shadow-md active:scale-[0.98]"
//                   }`}
//                 >
//                   {loading ? (
//                     <div className="flex items-center justify-center">
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       {type === "login" ? "Signing In..." : "Creating Account..."}
//                     </div>
//                   ) : (
//                     type === "login" ? "Sign In" : "Create Account"
//                   )}
//                 </button>

              
//               </form>

//               {/* Footer Links */}
//               <div className="mt-6 pt-4 border-t border-slate-200">
//                 <p className="text-center text-xs text-slate-500">
//                   {type === "login" ? (
//                     <>
//                       Don't have an account?{" "}
//                       <button
//                         type="button"
//                         onClick={() => setType("signup")}
//                         className="text-blue-600 hover:text-blue-700 font-medium"
//                       >
//                         Sign up
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       Already have an account?{" "}
//                       <button
//                         type="button"
//                         onClick={() => setType("login")}
//                         className="text-blue-600 hover:text-blue-700 font-medium"
//                       >
//                         Sign in
//                       </button>
//                     </>
//                   )}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import socket from "../Socket.jsx"; // Import your socket instance
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
import { toast } from "sonner";

// Import your image - replace with your actual image path
import loginImage from "../assets/image/login.png"; // Change this to your image path

const Login = () => {
  const {login}=useAuth();
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
      localStorage.setItem("token",response.token)
    login(response.data);
  
  
      navigate("/chat")
    toast.success(response.message || (type === "login" ? "Logged in successfully!" : "Account created successfully!"));
  
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
    <div className="h-screen w-screen overflow-hidden ">
      <div className="h-full w-full flex flex-col lg:flex-row">
        {/* Left Panel - Full Height Image */}
        <div className="hidden lg:block lg:w-1/2 h-full relative overflow-hidden">
          <img 
            src={loginImage} 
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
          {/* Optional overlay with text */}
          <div className="absolute inset-0  flex items-center justify-center">
            {/* <div className="text-center text-white p-12 max-w-md">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <MessageSquare size={40} className="text-white" />
                </div>
                <h1 className="text-5xl font-bold">TalkMate</h1>
              </div>
              <p className="text-xl font-light text-white/90 mb-8">
                Professional Communication Reimagined
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Users className="w-6 h-6 mx-auto mb-2 text-white/80" />
                  <p className="font-semibold">Team Collaboration</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-white/80" />
                  <p className="font-semibold">Secure & Private</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Zap className="w-6 h-6 mx-auto mb-2 text-white/80" />
                  <p className="font-semibold">Real-time Messaging</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-white/80" />
                  <p className="font-semibold">Boost Productivity</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Right Panel - Full Height Form */}
        <div className="lg:w-1/2 h-full flex items-center justify-center p-4 lg:p-6 xl:p-8 bg-white">
          <div className="w-full max-w-md h-full flex flex-col justify-center py-8">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <div className="p-3 bg-linear-to-br from-blue-500 to-cyan-400 rounded-xl shadow">
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
                      : "bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow hover:shadow-md active:scale-[0.98]"
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