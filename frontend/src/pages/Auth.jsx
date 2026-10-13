// ==========================================
// src/pages/Auth.jsx
// ==========================================

import React, { useState, useEffect } from "react";
import { login, signup } from "../api/auth";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Mail,
  Lock,
  User,
  BookOpen,
  Calendar,
  Shield,
  Camera,
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  Upload,
  X,
  Loader2,
  Rocket,
  Users,
  FileText,
  Star,
} from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [selfieFile, setSelfieFile] = useState(null);
  const [selfiePreview, setSelfiePreview] = useState("");
  
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    course: "",
    semester: "",
    selfie: "",
  });

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    // ==========================
    // NOT LOGGED IN
    // ==========================

    if (!token || !user) {
      return;
    }

    // ==========================
    // ADMIN
    // ==========================

    if (user.role === "admin") {

      navigate("/admin");

    }

    // ==========================
    // STUDENT / TEACHER
    // ==========================

    else if (
      user.role === "student" ||
      user.role === "teacher"
    ) {

      navigate("/home");

    }

  }, [navigate]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelfieChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelfieFile(file);
      setSelfiePreview(URL.createObjectURL(file));
    }
  };

  const removeSelfie = () => {
    setSelfieFile(null);
    setSelfiePreview("");
  };

  // 🔥 Cloudinary Upload
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "selfie_upload");
    const cloudname = import.meta.env.VITE_CLOUD_NAME;
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let selfieUrl = form.selfie;

      if (!isLogin && selfieFile) {
        selfieUrl = await uploadToCloudinary(selfieFile);
      }

      let res;

      if (isLogin) {
        res = await login({
          email: form.email,
          password: form.password,
        });
      } else {
        res = await signup({
          ...form,
          selfie: selfieUrl,
        });
      }

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert(`${isLogin ? "Login" : "Signup"} successful`);

      if (user.role === "admin") {
        navigate("/admin");
      } else if (isLogin) {
        navigate("/home");
      } else {
        navigate("/auth");
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 overflow-hidden relative flex items-center justify-center transition-colors duration-200">

      {/* ====================================== */}
      {/* ANIMATIONS */}
      {/* ====================================== */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.03); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
        .animate-slide-right { animation: slide-right 0.6s ease-out forwards; }
        .animate-gradient { 
          background-size: 200% 200%; 
          animation: gradient-shift 4s ease infinite; 
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>

      {/* ====================================== */}
      {/* BACKGROUND */}
      {/* ====================================== */}

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-indigo-200/50 blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-purple-200/50 blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-200/40 blur-[100px] rounded-full animate-pulse-glow" />
        
        {/* Subtle Grid */}
        <div 
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `linear-gradient(rgba(203, 213, 225, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(203, 213, 225, 0.4) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* ====================================== */}
      {/* MAIN CONTAINER */}
      {/* ====================================== */}

      <div className={`w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

        {/* ====================================== */}
        {/* LEFT SIDE — BRANDING (hidden on mobile) */}
        {/* ====================================== */}

        <div className={`hidden lg:flex flex-col justify-center ${isVisible ? 'animate-slide-right' : 'opacity-0'}`}>
          
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className=" flex items-center justify-center " onClick={(e) => navigate("/home")}>
              <img src="/stacxlogo.png" alt="logo" className="h-30 w-20"/>
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              StacX
            </h1>
          </div>

          {/* Heading */}
          <h2 className="text-4xl xl:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            Your Academic{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
              Superpower
            </span>
            <br />
            Starts Here
          </h2>

          <p className="text-slate-600 mt-5 text-lg leading-relaxed max-w-md">
            Join thousands of students accessing notes, PYQs, and community 
            support all in one modern academic platform.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-8">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-sm">
                <Users size={18} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">5K+</p>
                <p className="text-xs font-medium text-slate-400">Students</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shadow-sm">
                <FileText size={18} className="text-purple-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">10K+</p>
                <p className="text-xs font-medium text-slate-400">Resources</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center shadow-sm">
                <Star size={18} className="text-cyan-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">4.9</p>
                <p className="text-xs font-medium text-slate-400">Rating</p>
              </div>
            </div>
          </div>

          {/* Features list */}
          <div className="mt-10 space-y-3">
            {[
              "Access semester notes & PYQs instantly",
              "Real-time community chat with classmates",
              "Request resources from seniors",
              "Smart search with course filters",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={12} className="text-emerald-600" />
                </div>
                <span className="text-slate-600 text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* Floating decorative card */}
          <div className="relative mt-10">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-[40px] rounded-full" />
            <div className="relative bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <CheckCircle2 size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Welcome to StacX!</p>
                  <p className="text-xs text-slate-500">Your study journey begins now 🚀</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================== */}
        {/* RIGHT SIDE — AUTH FORM */}
        {/* ====================================== */}

        <div className={`w-full max-w-md mx-auto lg:mx-0 lg:ml-auto ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles size={16} className="text-white" />
            </div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              StacX
            </h1>
          </div>

          {/* Card */}
          <div className="relative">
            <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-8 shadow-xl shadow-slate-200/50">
              
              {/* Header */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-3">
                  <Rocket size={13} />
                  {isLogin ? "Welcome Back" : "Join StacX"}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {isLogin ? (
                    <>Sign in to <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">continue</span></>
                  ) : (
                    <>Create your <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">account</span></>
                  )}
                </h2>
                <p className="text-slate-500 text-sm mt-1.5">
                  {isLogin ? "Enter your credentials to access your dashboard" : "Fill in your details to get started"}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* NAME — Signup only */}
                {!isLogin && (
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                      <User size={18} />
                    </div>
                    <input
                      name="name"
                      placeholder="Full Name"
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15 transition-all duration-200 text-sm font-medium"
                      required
                    />
                  </div>
                )}

                {/* EMAIL */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15 transition-all duration-200 text-sm font-medium"
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15 transition-all duration-200 text-sm font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* SIGNUP FIELDS */}
                {!isLogin && (
                  <>
                    {/* COURSE + SEMESTER ROW */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                          <BookOpen size={16} />
                        </div>
                        <input
                          name="course"
                          placeholder="Course"
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15 transition-all duration-200 text-sm font-medium"
                        />
                      </div>
                      <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                          <Calendar size={16} />
                        </div>
                        <input
                          name="semester"
                          placeholder="Semester"
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15 transition-all duration-200 text-sm font-medium"
                        />
                      </div>
                    </div>

                    {/* ROLE */}
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                        <Shield size={18} />
                      </div>
                      <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15 transition-all duration-200 text-sm font-medium appearance-none cursor-pointer"
                        required
                      >
                        <option value="" disabled className="text-slate-400">
                          Select Role
                        </option>
                        <option value="student" className="text-slate-900">
                          Student
                        </option>
                        <option value="teacher" className="text-slate-900">
                          Teacher
                        </option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <GraduationCap size={16} />
                      </div>
                    </div>

                    {/* SELFIE UPLOAD */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                        <Camera size={13} />
                        Upload Selfie (for verification)
                      </label>

                      {selfiePreview ? (
                        <div className="relative inline-block">
                          <img
                            src={selfiePreview}
                            alt="Preview"
                            className="w-20 h-20 rounded-xl object-cover border border-slate-200 shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={removeSelfie}
                            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-500 hover:bg-rose-600 flex items-center justify-center shadow-md transition-colors"
                          >
                            <X size={10} className="text-white" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/30 cursor-pointer transition-all duration-200">
                          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                            <Upload size={16} className="text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700">Choose photo</p>
                            <p className="text-[11px] text-slate-400">JPG, PNG up to 5MB</p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleSelfieChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </>
                )}

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3.5 sm:py-4 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0 mt-6 text-sm sm:text-base"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {isLogin ? "Sign In" : "Create Account"}
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              {/* TOGGLE */}
              <div className="mt-6 text-center border-t border-slate-100 pt-5">
                <p className="text-slate-500 text-sm">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setForm({
                        name: "",
                        email: "",
                        password: "",
                        role: "",
                        course: "",
                        semester: "",
                        selfie: "",
                      });
                      setSelfieFile(null);
                      setSelfiePreview("");
                    }}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors ml-1"
                  >
                    {isLogin ? "Sign up free" : "Sign in"}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mt-6 text-slate-400 text-xs font-medium">
            <span className="flex items-center gap-1">
              <Shield size={12} className="text-slate-500" />
              Secure
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1">
              <Lock size={12} className="text-slate-500" />
              Encrypted
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1">
              <CheckCircle2 size={12} className="text-slate-500" />
              Free forever
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}