// // ==========================================
// // src/pages/Home.jsx
// // ==========================================

// import { useEffect, useState, useRef } from "react";

// import {
//   Sparkles,
//   Rocket,
//   Brain,
//   BookOpen,
//   Users,
//   MessageSquare,
//   Download,
//   Shield,
//   Zap,
//   Star,
//   ArrowRight,
//   ChevronDown,
//   Play,
//   CheckCircle,
//   TrendingUp,
//   Clock,
//   Award,
//   Heart,
// } from "lucide-react";

// import API from "../services/api";

// import Navbar from "../components/Navbar";
// import SearchFilters from "../components/SearchFilters";
// import RequestModal from "../components/RequestModal";
// import Footer from "../components/Footer";

// import Resources from "./Resources";
// import Requests from "./Requests";
// import Chat from "./Chat";
// import Profile from "./Profile";
// import Notifications from "./Notifications";

// // ==========================================
// // ANIMATED COUNTER COMPONENT
// // ==========================================
// const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
//   const [count, setCount] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);
//   const ref = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (ref.current) {
//       observer.observe(ref.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!isVisible) return;

//     let startTime;
//     const animate = (currentTime) => {
//       if (!startTime) startTime = currentTime;
//       const progress = Math.min((currentTime - startTime) / duration, 1);
//       setCount(Math.floor(progress * end));
//       if (progress < 1) {
//         requestAnimationFrame(animate);
//       }
//     };
//     requestAnimationFrame(animate);
//   }, [isVisible, end, duration]);

//   return (
//     <span ref={ref}>
//       {count}
//       {suffix}
//     </span>
//   );
// };

// // ==========================================
// // FLOATING PARTICLES
// // ==========================================
// const FloatingParticles = () => {
//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {[...Array(20)].map((_, i) => (
//         <div
//           key={i}
//           className="absolute w-1 h-1 bg-indigo-500/30 rounded-full"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
//             animationDelay: `${Math.random() * 5}s`,
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// // ==========================================
// // GLOWING ORB
// // ==========================================
// const GlowingOrb = ({ className }) => (
//   <div
//     className={`absolute rounded-full blur-3xl ${className}`}
//     style={{ animation: "pulse-slow 4s ease-in-out infinite" }}
//   />
// );

// export default function Home() {
//   const [activeTab, setActiveTab] = useState("home");
//   const [resources, setResources] = useState([]);
//   const [requests, setRequests] = useState([]);
//   const [showRequestModal, setShowRequestModal] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [filters, setFilters] = useState({
//     search: "",
//     course: "",
//     semester: "",
//     type: "",
//   });

//   const token = localStorage.getItem("token");

//   // =========================================
//   // FETCH RESOURCES
//   // =========================================
//   const fetchResources = async () => {
//     try {
//       const res = await API.get("/resources");
//       setResources(res.data.resources || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // =========================================
//   // FETCH REQUESTS
//   // =========================================
//   const fetchRequests = async () => {
//     try {
//       const res = await API.get("/requests", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setRequests(res.data.requests || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // =========================================
//   // INITIAL LOAD
//   // =========================================
//   useEffect(() => {
//     // Small delay to ensure smooth animation
//     const timer = setTimeout(() => {
//       setIsLoaded(true);
//     }, 100);

//     fetchResources();
//     if (token) {
//       fetchRequests();
//     }

//     return () => clearTimeout(timer);
//   }, []);

//   // =========================================
//   // DOWNLOAD & VIEW
//   // =========================================
//   const handleDownload = async (id) => {
//     try {
//       const res = await API.get(`/resources/download/${id}`);
//       window.open(res.data.downloadUrl, "_blank");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleView = async (id) => {
//     try {
//       const res = await API.get(`/resources/download/${id}`);
//       window.open(res.data.downloadUrl, "_blank");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // =========================================
//   // CREATE REQUEST
//   // =========================================
//   const createRequest = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const body = {
//       message: formData.get("message"),
//       type: formData.get("type"),
//       course: formData.get("course"),
//       subject: formData.get("subject"),
//       semester: formData.get("semester"),
//     };

//     try {
//       await API.post("/requests/add", body, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setShowRequestModal(false);
//       fetchRequests();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // =========================================
//   // FILTER RESOURCES
//   // =========================================
//   const filteredResources = resources.filter((item) => {
//     return (
//       item.title?.toLowerCase().includes(filters.search.toLowerCase()) &&
//       (filters.course ? item.course === filters.course : true) &&
//       (filters.semester ? item.semester === filters.semester : true) &&
//       (filters.type ? item.type === filters.type : true)
//     );
//   });

//   // =========================================
//   // FEATURES DATA
//   // =========================================
//   const features = [
//     {
//       icon: BookOpen,
//       title: "Comprehensive Notes",
//       description:
//         "Access well-organized notes from top performers across all semesters and subjects.",
//       color: "from-indigo-500 to-purple-500",
//       iconColor: "text-indigo-400",
//       bgColor: "bg-indigo-500/10",
//       borderColor: "border-indigo-500/20",
//     },
//     {
//       icon: Brain,
//       title: "Smart Search",
//       description:
//         "Find exactly what you need with our intelligent filtering and search system.",
//       color: "from-purple-500 to-pink-500",
//       iconColor: "text-purple-400",
//       bgColor: "bg-purple-500/10",
//       borderColor: "border-purple-500/20",
//     },
//     {
//       icon: Users,
//       title: "Community Driven",
//       description:
//         "Join thousands of students sharing knowledge and helping each other succeed.",
//       color: "from-pink-500 to-rose-500",
//       iconColor: "text-pink-400",
//       bgColor: "bg-pink-500/10",
//       borderColor: "border-pink-500/20",
//     },
//     {
//       icon: MessageSquare,
//       title: "Real-time Chat",
//       description:
//         "Connect instantly with peers, ask doubts, and collaborate on projects.",
//       color: "from-cyan-500 to-blue-500",
//       iconColor: "text-cyan-400",
//       bgColor: "bg-cyan-500/10",
//       borderColor: "border-cyan-500/20",
//     },
//     {
//       icon: Download,
//       title: "Easy Downloads",
//       description:
//         "One-click downloads for PDFs, notes, assignments, and previous year papers.",
//       color: "from-green-500 to-emerald-500",
//       iconColor: "text-green-400",
//       bgColor: "bg-green-500/10",
//       borderColor: "border-green-500/20",
//     },
//     {
//       icon: Shield,
//       title: "Verified Content",
//       description:
//         "All resources are verified by top students and faculty for accuracy.",
//       color: "from-orange-500 to-amber-500",
//       iconColor: "text-orange-400",
//       bgColor: "bg-orange-500/10",
//       borderColor: "border-orange-500/20",
//     },
//   ];

//   // =========================================
//   // STATS DATA
//   // =========================================
//   const stats = [
//     { value: 10000, suffix: "+", label: "Active Students", icon: Users },
//     { value: 5000, suffix: "+", label: "Resources", icon: BookOpen },
//     { value: 500, suffix: "+", label: "Contributors", icon: Award },
//     { value: 99, suffix: "%", label: "Satisfaction", icon: Heart },
//   ];

//   // =========================================
//   // TESTIMONIALS
//   // =========================================
//   const testimonials = [
//     {
//       name: "Priya Sharma",
//       role: "B.Tech CSE, 3rd Year",
//       content:
//         "StacX saved my semester! Found all PYQs and notes in one place. Absolutely game-changing.",
//       avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//       rating: 5,
//     },
//     {
//       name: "Rahul Kumar",
//       role: "BBA, 2nd Year",
//       content:
//         "The community chat feature helped me connect with seniors who guided me throughout.",
//       avatar: "https://randomuser.me/api/portraits/men/2.jpg",
//       rating: 5,
//     },
//     {
//       name: "Ananya Patel",
//       role: "B.Sc Physics, Final Year",
//       content:
//         "Best platform for students. Clean interface, fast downloads, and amazing resources.",
//       avatar: "https://randomuser.me/api/portraits/women/3.jpg",
//       rating: 5,
//     },
//   ];

//   // =========================================
//   // ABOUT CARDS DATA
//   // =========================================
//   const aboutCards = [
//     {
//       icon: Brain,
//       title: "Smart Discovery",
//       desc: "AI-powered search to find exactly what you need",
//     },
//     {
//       icon: Rocket,
//       title: "Fast Requests",
//       desc: "Get resources from seniors within hours",
//     },
//     {
//       icon: Sparkles,
//       title: "Community Support",
//       desc: "24/7 help from thousands of active students",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#050816] text-white overflow-x-hidden">
//       {/* ====================================== */}
//       {/* GLOBAL STYLES */}
//       {/* ====================================== */}
//       <style>
//         {`
//           @keyframes float {
//             0%, 100% {
//               transform: translateY(0px) rotate(0deg);
//               opacity: 0.3;
//             }
//             50% {
//               transform: translateY(-20px) rotate(180deg);
//               opacity: 0.8;
//             }
//           }

//           @keyframes pulse-slow {
//             0%, 100% {
//               opacity: 0.4;
//               transform: scale(1);
//             }
//             50% {
//               opacity: 0.6;
//               transform: scale(1.1);
//             }
//           }

//           @keyframes gradient-x {
//             0%, 100% {
//               background-position: 0% 50%;
//             }
//             50% {
//               background-position: 100% 50%;
//             }
//           }

//           @keyframes slide-up {
//             from {
//               opacity: 0;
//               transform: translateY(40px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }

//           @keyframes slide-in-right {
//             from {
//               opacity: 0;
//               transform: translateX(40px);
//             }
//             to {
//               opacity: 1;
//               transform: translateX(0);
//             }
//           }

//           @keyframes bounce-subtle {
//             0%, 100% {
//               transform: translateY(0);
//             }
//             50% {
//               transform: translateY(-10px);
//             }
//           }

//           @keyframes fade-in {
//             from {
//               opacity: 0;
//             }
//             to {
//               opacity: 1;
//             }
//           }

//           .animate-slide-up {
//             animation: slide-up 0.8s ease-out forwards;
//           }

//           .animate-slide-in-right {
//             animation: slide-in-right 0.8s ease-out forwards;
//           }

//           .animate-bounce-subtle {
//             animation: bounce-subtle 3s ease-in-out infinite;
//           }

//           .animate-fade-in {
//             animation: fade-in 0.6s ease-out forwards;
//           }

//           .animate-gradient-x {
//             background-size: 200% 200%;
//             animation: gradient-x 3s ease infinite;
//           }

//           .delay-100 { animation-delay: 100ms; }
//           .delay-200 { animation-delay: 200ms; }
//           .delay-300 { animation-delay: 300ms; }
//           .delay-400 { animation-delay: 400ms; }
//           .delay-500 { animation-delay: 500ms; }
//           .delay-600 { animation-delay: 600ms; }

//           .glass-card {
//             background: rgba(255, 255, 255, 0.03);
//             backdrop-filter: blur(20px);
//             -webkit-backdrop-filter: blur(20px);
//             border: 1px solid rgba(255, 255, 255, 0.08);
//           }

//           .glow-text {
//             text-shadow: 0 0 40px rgba(99, 102, 241, 0.5);
//           }

//           .hover-glow:hover {
//             box-shadow: 0 0 40px rgba(99, 102, 241, 0.3);
//           }

//           .scrollbar-hide::-webkit-scrollbar {
//             display: none;
//           }

//           .scrollbar-hide {
//             -ms-overflow-style: none;
//             scrollbar-width: none;
//           }
//         `}
//       </style>

//       {/* ====================================== */}
//       {/* BACKGROUND */}
//       {/* ====================================== */}
//       <div className="fixed inset-0 -z-10">
//         <GlowingOrb className="top-0 left-0 w-[600px] h-[600px] bg-indigo-500/20" />
//         <GlowingOrb className="bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/15" />
//         <GlowingOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10" />
//         <FloatingParticles />

//         {/* Grid Pattern */}
//         <div
//           className="absolute inset-0 opacity-[0.02]"
//           style={{
//             backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
//                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
//             backgroundSize: "50px 50px",
//           }}
//         />
//       </div>

//       {/* ====================================== */}
//       {/* NAVBAR */}
//       {/* ====================================== */}
//       <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

//       {/* ====================================== */}
//       {/* MAIN CONTENT */}
//       {/* ====================================== */}
//       <main>
//         {/* ====================================== */}
//         {/* HOME TAB */}
//         {/* ====================================== */}
//         {activeTab === "home" && (
//           <div
//             className={`transition-opacity duration-700 ${
//               isLoaded ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             {/* ====================================== */}
//             {/* HERO SECTION */}
//             {/* ====================================== */}
//             <section className="min-h-screen flex items-center justify-center px-4 md:px-8 pt-24 md:pt-28 pb-12">
//               <div className="max-w-7xl mx-auto w-full">
//                 <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
//                   {/* Left Content */}
//                   <div
//                     className={`order-2 lg:order-1 text-center lg:text-left ${
//                       isLoaded ? "animate-slide-up" : ""
//                     }`}
//                   >
//                     {/* Badge */}
//                     <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full mb-6 hover:border-indigo-500/40 transition-all duration-300 cursor-default">
//                       <Sparkles size={16} className="animate-pulse" />
//                       <span className="text-sm font-medium">
//                         India's #1 Student Platform
//                       </span>
//                       <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                     </div>

//                     {/* Heading */}
//                     <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
//                       <span className="block mb-2">Study Smarter</span>
//                       <span className="block">
//                         With{" "}
//                         <span className="relative inline-block">
//                           <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x glow-text">
//                             StacX
//                           </span>
//                           <svg
//                             className="absolute -bottom-2 left-0 w-full h-3"
//                             viewBox="0 0 200 12"
//                             fill="none"
//                             preserveAspectRatio="none"
//                           >
//                             <path
//                               d="M2 10C50 4 150 4 198 10"
//                               stroke="url(#underline-gradient)"
//                               strokeWidth="3"
//                               strokeLinecap="round"
//                             />
//                             <defs>
//                               <linearGradient
//                                 id="underline-gradient"
//                                 x1="0"
//                                 y1="0"
//                                 x2="200"
//                                 y2="0"
//                               >
//                                 <stop offset="0%" stopColor="#818cf8" />
//                                 <stop offset="50%" stopColor="#a78bfa" />
//                                 <stop offset="100%" stopColor="#22d3ee" />
//                               </linearGradient>
//                             </defs>
//                           </svg>
//                         </span>
//                       </span>
//                     </h1>

//                     {/* Description */}
//                     <p className="text-gray-400 mt-6 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
//                       Access semester notes, PYQs, assignments, and connect with
//                       your community — all in one{" "}
//                       <span className="text-indigo-400 font-medium">
//                         futuristic platform
//                       </span>
//                       .
//                     </p>

//                     {/* CTA Buttons */}
//                     <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start">
//                       <button
//                         onClick={() => window.location.href='/auth'}
//                         className="group relative bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-500/30 overflow-hidden"
//                       >
//                         <span className="relative z-10 flex items-center justify-center gap-2">
//                           <Rocket size={20} />
//                           Request Resources
//                           <ArrowRight
//                             size={18}
//                             className="group-hover:translate-x-1 transition-transform"
//                           />
//                         </span>
//                         <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                       </button>

//                       <button
//                         onClick={() => setActiveTab("resources")}
//                         className="group glass-card hover:bg-white/10 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
//                       >
//                         <Play size={18} />
//                         Explore Resources
//                       </button>
//                     </div>

//                     {/* Quick Stats */}
//                     <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
//                       <div className="flex -space-x-3">
//                         {[1, 2, 3, 4].map((i) => (
//                           <div
//                             key={i}
//                             className="w-10 h-10 rounded-full border-2 border-[#050816] overflow-hidden"
//                           >
//                             <img
//                               src={`https://randomuser.me/api/portraits/${
//                                 i % 2 === 0 ? "women" : "men"
//                               }/${i + 10}.jpg`}
//                               alt=""
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                         ))}
//                       </div>
//                       <div>
//                         <p className="text-white font-bold">10,000+</p>
//                         <p className="text-gray-500 text-sm">Active Students</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right Image */}
//                   <div
//                     className={`order-1 lg:order-2 relative ${
//                       isLoaded ? "animate-slide-in-right delay-200" : ""
//                     }`}
//                   >
//                     {/* Glow Effect */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-cyan-500/30 blur-3xl" />

//                     {/* Main Image */}
//                     <div className="relative z-10">
//                       <img
//                         src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
//                         alt="Students collaborating"
//                         className="w-full h-[280px] sm:h-[350px] lg:h-[480px] object-cover border border-white/10 shadow-2xl shadow-indigo-500/20 rounded-3xl sm:rounded-[40px] lg:rounded-[60px] lg:rounded-tr-[120px] lg:rounded-bl-[120px] transform hover:scale-[1.02] transition-all duration-500"
//                       />

//                       {/* Floating Card - Top Right */}
//                       <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 glass-card rounded-2xl p-3 sm:p-4 animate-bounce-subtle">
//                         <div className="flex items-center gap-2 sm:gap-3">
//                           <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
//                             <TrendingUp size={20} className="text-white" />
//                           </div>
//                           <div>
//                             <p className="text-white font-bold text-sm sm:text-base">
//                               98%
//                             </p>
//                             <p className="text-gray-400 text-xs">Success Rate</p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Floating Card - Bottom Left */}
//                       <div
//                         className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 glass-card rounded-2xl p-3 sm:p-4 animate-bounce-subtle"
//                         style={{ animationDelay: "1s" }}
//                       >
//                         <div className="flex items-center gap-2 sm:gap-3">
//                           <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
//                             <Clock size={20} className="text-white" />
//                           </div>
//                           <div>
//                             <p className="text-white font-bold text-sm sm:text-base">
//                               24/7
//                             </p>
//                             <p className="text-gray-400 text-xs">Available</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Scroll Indicator */}
//                 <div className="hidden lg:flex justify-center mt-12">
//                   <div
//                     className="flex flex-col items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-300 transition-colors"
//                     onClick={() =>
//                       window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
//                     }
//                   >
//                     <span className="text-sm">Scroll to explore</span>
//                     <ChevronDown size={20} className="animate-bounce" />
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* ====================================== */}
//             {/* STATS SECTION */}
//             {/* ====================================== */}
//             <section className="py-16 md:py-24 px-4 md:px-8">
//               <div className="max-w-7xl mx-auto">
//                 <div className="glass-card rounded-3xl sm:rounded-[40px] p-6 sm:p-8 md:p-12">
//                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
//                     {stats.map((stat, index) => {
//                       const IconComponent = stat.icon;
//                       return (
//                         <div
//                           key={index}
//                           className="text-center group hover:scale-105 transition-transform duration-300"
//                         >
//                           <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform duration-300">
//                             <IconComponent size={24} />
//                           </div>
//                           <h3 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                             <AnimatedCounter
//                               end={stat.value}
//                               suffix={stat.suffix}
//                             />
//                           </h3>
//                           <p className="text-gray-400 mt-2 text-sm sm:text-base">
//                             {stat.label}
//                           </p>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* ====================================== */}
//             {/* FEATURES SECTION */}
//             {/* ====================================== */}
//             <section className="py-16 md:py-24 px-4 md:px-8">
//               <div className="max-w-7xl mx-auto">
//                 {/* Section Header */}
//                 <div className="text-center mb-12 md:mb-16">
//                   <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-6">
//                     <Zap size={16} />
//                     <span className="text-sm font-medium">Powerful Features</span>
//                   </div>
//                   <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">
//                     Everything You Need
//                     <br className="hidden sm:block" />
//                     <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
//                       {" "}To Excel
//                     </span>
//                   </h2>
//                   <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-base sm:text-lg">
//                     Built by students, for students. Every feature is designed to
//                     make your academic journey smoother and more successful.
//                   </p>
//                 </div>

//                 {/* Features Grid */}
//                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
//                   {features.map((feature, index) => {
//                     const IconComponent = feature.icon;
//                     return (
//                       <div
//                         key={index}
//                         className="group glass-card rounded-3xl p-6 md:p-8 hover:-translate-y-2 hover-glow transition-all duration-500 cursor-default"
//                       >
//                         <div
//                           className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${feature.bgColor} ${feature.borderColor} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
//                         >
//                           <IconComponent size={28} className={feature.iconColor} />
//                         </div>
//                         <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-indigo-300 transition-colors">
//                           {feature.title}
//                         </h3>
//                         <p className="text-gray-400 leading-relaxed text-sm md:text-base">
//                           {feature.description}
//                         </p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </section>

//             {/* ====================================== */}
//             {/* ABOUT SECTION */}
//             {/* ====================================== */}
//             <section className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden">
//               {/* Background Decoration */}
//               <div className="absolute inset-0 -z-10">
//                 <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
//               </div>

//               <div className="max-w-7xl mx-auto">
//                 <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//                   {/* Left Content */}
//                   <div>
//                     <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full mb-6">
//                       <Star size={16} />
//                       <span className="text-sm font-medium">About StacX</span>
//                     </div>

//                     <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
//                       Built For{" "}
//                       <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
//                         Modern Students
//                       </span>
//                     </h2>

//                     <p className="text-gray-400 mt-6 text-base sm:text-lg leading-relaxed">
//                       StacX is more than just a resource sharing platform. It's a
//                       complete ecosystem designed to help Indian students succeed
//                       in their academic journey.
//                     </p>

//                     <div className="space-y-4 mt-8">
//                       {[
//                         "Collaborate with peers across India",
//                         "Access verified notes and PYQs",
//                         "Get instant help through community chat",
//                         "Track your requests and contributions",
//                       ].map((item, index) => (
//                         <div key={index} className="flex items-center gap-3 group">
//                           <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
//                             <CheckCircle size={14} className="text-white" />
//                           </div>
//                           <span className="text-gray-300 group-hover:text-white transition-colors">
//                             {item}
//                           </span>
//                         </div>
//                       ))}
//                     </div>

//                     <button
//                       onClick={() => setActiveTab("chat")}
//                       className="mt-10 group flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-semibold"
//                     >
//                       Join the Community
//                       <ArrowRight
//                         size={18}
//                         className="group-hover:translate-x-1 transition-transform"
//                       />
//                     </button>
//                   </div>

//                   {/* Right Visual - Cards */}
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-3xl -z-10" />

//                     <div className="space-y-4">
//                       {aboutCards.map((card, index) => {
//                         const IconComponent = card.icon;
//                         return (
//                           <div
//                             key={index}
//                             className="glass-card rounded-2xl p-5 md:p-6 flex items-start gap-4 hover:bg-white/10 transition-all duration-300 hover:translate-x-2"
//                             style={{
//                               marginLeft: `${index * 12}px`,
//                             }}
//                           >
//                             <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
//                               <IconComponent size={24} />
//                             </div>
//                             <div>
//                               <h3 className="font-bold text-lg mb-1">
//                                 {card.title}
//                               </h3>
//                               <p className="text-gray-400 text-sm">{card.desc}</p>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* ====================================== */}
//             {/* TESTIMONIALS SECTION */}
//             {/* ====================================== */}
//             <section className="py-16 md:py-24 px-4 md:px-8">
//               <div className="max-w-7xl mx-auto">
//                 {/* Section Header */}
//                 <div className="text-center mb-12 md:mb-16">
//                   <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 text-pink-300 px-4 py-2 rounded-full mb-6">
//                     <Heart size={16} />
//                     <span className="text-sm font-medium">Student Stories</span>
//                   </div>
//                   <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
//                     Loved By{" "}
//                     <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
//                       Thousands
//                     </span>
//                   </h2>
//                   <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-base sm:text-lg">
//                     See what students across India are saying about StacX
//                   </p>
//                 </div>

//                 {/* Testimonials Grid */}
//                 <div className="grid md:grid-cols-3 gap-5 md:gap-6">
//                   {testimonials.map((testimonial, index) => (
//                     <div
//                       key={index}
//                       className="glass-card rounded-3xl p-6 md:p-8 hover:-translate-y-2 transition-all duration-500"
//                     >
//                       {/* Stars */}
//                       <div className="flex gap-1 mb-4">
//                         {[...Array(testimonial.rating)].map((_, i) => (
//                           <Star
//                             key={i}
//                             size={18}
//                             className="text-yellow-400 fill-yellow-400"
//                           />
//                         ))}
//                       </div>

//                       {/* Quote */}
//                       <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
//                         "{testimonial.content}"
//                       </p>

//                       {/* Author */}
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={testimonial.avatar}
//                           alt={testimonial.name}
//                           className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/30"
//                         />
//                         <div>
//                           <p className="font-semibold text-white">
//                             {testimonial.name}
//                           </p>
//                           <p className="text-gray-500 text-sm">
//                             {testimonial.role}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </section>

//             {/* ====================================== */}
//             {/* CTA SECTION */}
//             {/* ====================================== */}
//             <section className="py-16 md:py-24 px-4 md:px-8">
//               <div className="max-w-4xl mx-auto">
//                 <div className="relative glass-card rounded-3xl sm:rounded-[40px] p-8 md:p-12 lg:p-16 text-center overflow-hidden">
//                   {/* Background Glow */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10" />
//                   <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/30 blur-3xl" />
//                   <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/30 blur-3xl" />

//                   <div className="relative z-10">
//                     <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-indigo-500/30">
//                       <Rocket size={32} className="text-white" />
//                     </div>

//                     <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
//                       Ready to{" "}
//                       <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
//                         Get Started?
//                       </span>
//                     </h2>

//                     <p className="text-gray-400 max-w-xl mx-auto mb-8 text-base sm:text-lg">
//                       Join thousands of students who are already using StacX to
//                       ace their exams and boost their academic performance.
//                     </p>

//                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                       <button
//                         onClick={() => window.location.href='/auth'}
//                         className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2"
//                       >
//                         <Sparkles size={20} />
//                         Start Exploring
//                       </button>
//                       <button
//                         onClick={() => window.location.href = ' /auth'}
//                         className="glass-card hover:bg-white/10 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
//                       >
//                         <Users size={20} />
//                         Join Community
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         )}

//         {/* ====================================== */}
//         {/* RESOURCES TAB */}
//         {/* ====================================== */}
//         {activeTab === "resources" && (
//           <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-36 pb-40">
//             <div className="mb-8">
//               <h1 className="text-3xl md:text-4xl font-black mb-2">
//                 <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
//                   Resources
//                 </span>
//               </h1>
//               <p className="text-gray-400">Browse and download study materials</p>
//             </div>
           
//             <div className="mt-8">
//               <Resources
//                 filteredResources={filteredResources}
//                 handleView={handleView}
//                 handleDownload={handleDownload}
//               />
//             </div>
//           </div>
//         )}

//         {/* ====================================== */}
//         {/* CHAT TAB */}
//         {/* ====================================== */}
//         {activeTab === "chat" && (
//           <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-36 pb-40">
//             <Chat />
//           </div>
//         )}

//         {/* ====================================== */}
//         {/* REQUESTS TAB */}
//         {/* ====================================== */}
//         {activeTab === "myrequests" && (
//           <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-36 pb-40">
//             <Requests />
//           </div>
//         )}

//         {/* ====================================== */}
//         {/* NOTIFICATIONS TAB */}
//         {/* ====================================== */}
//         {activeTab === "notifications" && (
//           <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-36 pb-40">
//             <Notifications />
//           </div>
//         )}

//         {/* ====================================== */}
//         {/* PROFILE TAB */}
//         {/* ====================================== */}
//         {activeTab === "profile" && (
//           <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-36 pb-40">
//             <Profile />
//           </div>
//         )}
//       </main>

//       {/* ====================================== */}
//       {/* FOOTER */}
//       {/* ====================================== */}
//       {activeTab === "home" && <Footer />}

//       {/* ====================================== */}
//       {/* REQUEST MODAL */}
//       {/* ====================================== */}
//       <RequestModal
//         showRequestModal={showRequestModal}
//         setShowRequestModal={setShowRequestModal}
//         createRequest={createRequest}
//       />
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  LayoutDashboard,
  MessageCircle,
  Search,
  Send,
  Sparkles,
  UploadCloud,
  Bell,
  UserRound,
  X,
} from "lucide-react";

import API from "../services/api";
import Navbar from "../components/Navbar";
import RequestModal from "../components/RequestModal";
import Resources from "./Resources";
import Requests from "./Requests";
import Chat from "./Chat";
import Profile from "./Profile";
import Notifications from "./Notifications";

const BLUE = "#2563eb";

const tabs = [
  { id: "home", label: "Overview", icon: LayoutDashboard },
  { id: "resources", label: "Resources", icon: BookOpen },
  { id: "myrequests", label: "My requests", icon: Send },
  { id: "chat", label: "Community", icon: MessageCircle },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [resources, setResources] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    course: "",
    semester: "",
    type: "",
  });

  const token = localStorage.getItem("token");

  const fetchResources = async () => {
    try {
      const res = await API.get("/resources");
      setResources(res.data.resources || []);
    } catch (error) {
      console.error("Unable to fetch resources:", error);
    }
  };

  const fetchRequests = async () => {
    if (!token) return;
    try {
      const res = await API.get("/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data.requests || []);
    } catch (error) {
      console.error("Unable to fetch requests:", error);
    }
  };

  useEffect(() => {
    fetchResources();
    fetchRequests();
    // Keep the existing API contract; load once when this page mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredResources = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    return resources.filter((item) => {
      const matchesSearch =
        !query ||
        item.title?.toLowerCase().includes(query) ||
        item.subject?.toLowerCase().includes(query) ||
        item.course?.toLowerCase().includes(query);
      return (
        matchesSearch &&
        (filters.course ? item.course === filters.course : true) &&
        (filters.semester ? String(item.semester) === filters.semester : true) &&
        (filters.type ? item.type === filters.type : true)
      );
    });
  }, [resources, filters]);

  const handleDownload = async (id) => {
    try {
      const res = await API.get(`/resources/download/${id}`);
      if (res.data.downloadUrl) window.open(res.data.downloadUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Unable to download resource:", error);
    }
  };

  const handleView = handleDownload;

  const createRequest = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const body = {
      message: formData.get("message"),
      type: formData.get("type"),
      course: formData.get("course"),
      subject: formData.get("subject"),
      semester: formData.get("semester"),
    };

    try {
      await API.post("/requests/add", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowRequestModal(false);
      await fetchRequests();
    } catch (error) {
      console.error("Unable to create request:", error);
    }
  };

  const resourceTypes = [...new Set(resources.map((item) => item.type).filter(Boolean))];
  const courses = [...new Set(resources.map((item) => item.course).filter(Boolean))];
  const semesters = [...new Set(resources.map((item) => String(item.semester)).filter(Boolean))];

  return (
    <div className="devloopers-shell min-h-screen bg-slate-50 text-slate-900">
      <style>{`
        .devloopers-shell {
          --dl-blue: #2563eb;
          --dl-blue-dark: #1d4ed8;
          --dl-ink: #0f172a;
          --dl-muted: #64748b;
          --dl-border: #e2e8f0;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .devloopers-shell * { box-sizing: border-box; }
        .dl-card { background: #fff; border: 1px solid #e7edf5; border-radius: 18px; box-shadow: 0 4px 20px rgba(15, 23, 42, .025); }
        .dl-input { width: 100%; border: 1px solid #dbe4f0; background: #fff; border-radius: 12px; padding: 11px 13px; color: #0f172a; outline: none; transition: border-color .18s, box-shadow .18s; }
        .dl-input:focus { border-color: #60a5fa; box-shadow: 0 0 0 3px rgba(37, 99, 235, .10); }
        .dl-primary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 12px; background: #2563eb; color: white; padding: 11px 16px; font-size: 14px; font-weight: 650; transition: background .18s, transform .18s; }
        .dl-primary:hover { background: #1d4ed8; transform: translateY(-1px); }
        .dl-secondary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 1px solid #dbe4f0; border-radius: 12px; background: #fff; color: #334155; padding: 10px 14px; font-size: 14px; font-weight: 600; }
        .dl-secondary:hover { background: #f8fafc; border-color: #bfdbfe; }
        .dl-nav-item { display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border-radius: 11px; color: #64748b; font-size: 14px; font-weight: 550; text-align: left; transition: .18s; }
        .dl-nav-item:hover { color: #1d4ed8; background: #f1f5ff; }
        .dl-nav-item.active { color: #1d4ed8; background: #eff6ff; box-shadow: inset 3px 0 #2563eb; }
        .dl-icon-box { display: flex; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 13px; background: #eff6ff; color: #2563eb; }
        @media (max-width: 767px) {
          .dl-sidebar { display: none; }
          .dl-main { padding: 22px 16px 100px !important; }
        }
      `}</style>

      {/* Existing navigation component is retained to preserve its tab behavior. */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mx-auto flex max-w-[1440px] gap-7 px-4 pb-12 pt-24 md:px-7 md:pt-28">
        <aside className="dl-sidebar sticky top-28 hidden h-[calc(100vh-9rem)] w-60 shrink-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 md:flex">
          <div className="mb-7 flex items-center gap-3 px-2 pt-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-200">
              <GraduationCap size={22} />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight text-slate-900">The DevLoopers</p>
              <p className="mt-0.5 text-xs text-slate-500">Resource hub</p>
            </div>
          </div>

          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">Workspace</p>
          <nav className="space-y-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`dl-nav-item ${activeTab === id ? "active" : ""}`}
              >
                <Icon size={17} />
                <span>{label}</span>
              </button>
            ))}
            <button type="button" onClick={() => setActiveTab("notifications")} className={`dl-nav-item ${activeTab === "notifications" ? "active" : ""}`}>
              <Bell size={17} /><span>Notifications</span>
            </button>
            <button type="button" onClick={() => setActiveTab("profile")} className={`dl-nav-item ${activeTab === "profile" ? "active" : ""}`}>
              <UserRound size={17} /><span>My profile</span>
            </button>
          </nav>

          <div className="mt-auto rounded-xl border border-blue-100 bg-blue-50/80 p-3">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600">
              <Sparkles size={16} />
            </div>
            <p className="text-sm font-semibold text-slate-800">Share what you know</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">Help your community learn together.</p>
            <button type="button" onClick={() => setActiveTab("resources")} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-700">
              Browse resources <ArrowRight size={13} />
            </button>
          </div>
        </aside>

        <main className="dl-main min-w-0 flex-1 py-1">
          {activeTab === "home" && (
            <div className="space-y-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[.15em] text-blue-600">THE DEVLOOPERS / RESOURCES</p>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Your study workspace</h1>
                  <p className="mt-2 text-sm text-slate-500">Find notes, previous-year papers, and shared study material.</p>
                </div>
                <button type="button" className="dl-primary self-start" onClick={() => setShowRequestModal(true)}>
                  <Send size={16} /> Request a resource
                </button>
              </div>

              <div className="dl-card overflow-hidden">
                <div className="relative bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-7 sm:px-8 sm:py-9">
                  <div className="relative z-10 max-w-xl">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-blue-50">
                      <Sparkles size={13} /> Student resource library
                    </div>
                    <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">Everything you need to study, in one place.</h2>
                    <p className="mt-2 max-w-lg text-sm leading-6 text-blue-100">Explore shared notes and PYQs, or request a resource from the community.</p>
                    <button type="button" onClick={() => setActiveTab("resources")} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50">
                      Explore library <ArrowRight size={16} />
                    </button>
                  </div>
                  <BookOpen className="absolute -bottom-5 right-5 h-36 w-36 rotate-[-12deg] text-white/10 sm:right-12 sm:h-48 sm:w-48" strokeWidth={1.2} />
                </div>

                <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  <div className="flex items-center gap-3 p-5 sm:p-6">
                    <div className="dl-icon-box"><BookOpen size={19} /></div>
                    <div><p className="text-xl font-bold text-slate-900">{resources.length}</p><p className="text-xs text-slate-500">Available resources</p></div>
                  </div>
                  <div className="flex items-center gap-3 p-5 sm:p-6">
                    <div className="dl-icon-box"><FileText size={19} /></div>
                    <div><p className="text-xl font-bold text-slate-900">{resourceTypes.length}</p><p className="text-xs text-slate-500">Resource categories</p></div>
                  </div>
                  <div className="flex items-center gap-3 p-5 sm:p-6">
                    <div className="dl-icon-box"><Send size={19} /></div>
                    <div><p className="text-xl font-bold text-slate-900">{requests.length}</p><p className="text-xs text-slate-500">Your requests</p></div>
                  </div>
                </div>
              </div>

              <section className="dl-card p-5 sm:p-6">
                <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Find a resource</h2>
                    <p className="mt-1 text-sm text-slate-500">Search by title, subject, or course.</p>
                  </div>
                  <button type="button" onClick={() => setActiveTab("resources")} className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800">
                    View all <ArrowRight size={15} />
                  </button>
                </div>
                <div className="relative">
                  <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={filters.search}
                    onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
                    className="dl-input pl-10"
                    placeholder="Search notes, PYQs, subjects..."
                    aria-label="Search resources"
                  />
                </div>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <select className="dl-input" value={filters.course} onChange={(event) => setFilters((current) => ({ ...current, course: event.target.value }))} aria-label="Filter by course">
                    <option value="">All courses</option>
                    {courses.map((course) => <option key={course} value={course}>{course}</option>)}
                  </select>
                  <select className="dl-input" value={filters.semester} onChange={(event) => setFilters((current) => ({ ...current, semester: event.target.value }))} aria-label="Filter by semester">
                    <option value="">All semesters</option>
                    {semesters.map((semester) => <option key={semester} value={semester}>Semester {semester}</option>)}
                  </select>
                  <select className="dl-input" value={filters.type} onChange={(event) => setFilters((current) => ({ ...current, type: event.target.value }))} aria-label="Filter by type">
                    <option value="">All types</option>
                    {resourceTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>

                <div className="mt-5">
                  {filteredResources.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {filteredResources.slice(0, 6).map((item) => (
                        <article key={item._id || item.id || item.title} className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:shadow-sm">
                          <div className="mb-3 flex items-start justify-between gap-3">
                            <div className="dl-icon-box h-10 w-10 shrink-0 rounded-xl"><FileText size={18} /></div>
                            {item.type && <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">{item.type}</span>}
                          </div>
                          <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">{item.title || "Untitled resource"}</h3>
                          <p className="mt-1 text-xs text-slate-500">{[item.course, item.semester ? `Semester ${item.semester}` : null, item.subject].filter(Boolean).join(" · ") || "Study material"}</p>
                          <button type="button" onClick={() => handleDownload(item._id || item.id)} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-900">
                            <ArrowDownToLine size={15} /> View / download
                          </button>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-200 px-5 py-10 text-center">
                      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500"><Search size={19} /></div>
                      <p className="text-sm font-semibold text-slate-800">No matching resources</p>
                      <p className="mt-1 text-xs text-slate-500">Try another search or request the material you need.</p>
                      <button type="button" onClick={() => setShowRequestModal(true)} className="mt-4 text-sm font-semibold text-blue-700">Request a resource</button>
                    </div>
                  )}
                </div>
              </section>

              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button type="button" onClick={() => setActiveTab("resources")} className="dl-card flex items-center gap-4 p-5 text-left transition hover:-translate-y-0.5 hover:border-blue-200">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><UploadCloud size={20} /></div>
                  <div className="min-w-0 flex-1"><p className="text-sm font-bold text-slate-900">Explore shared materials</p><p className="mt-1 text-xs text-slate-500">Browse notes and previous-year papers.</p></div>
                  <ArrowRight size={17} className="text-slate-400" />
                </button>
                <button type="button" onClick={() => setShowRequestModal(true)} className="dl-card flex items-center gap-4 p-5 text-left transition hover:-translate-y-0.5 hover:border-blue-200">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><MessageCircle size={20} /></div>
                  <div className="min-w-0 flex-1"><p className="text-sm font-bold text-slate-900">Need something specific?</p><p className="mt-1 text-xs text-slate-500">Send a resource request to the community.</p></div>
                  <ArrowRight size={17} className="text-slate-400" />
                </button>
              </section>
            </div>
          )}

          {activeTab === "resources" && (
            <section className="space-y-5">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div><p className="mb-2 text-xs font-bold uppercase tracking-[.15em] text-blue-600">LIBRARY</p><h1 className="text-2xl font-bold tracking-tight text-slate-950">Resources</h1><p className="mt-1 text-sm text-slate-500">Browse and download study materials.</p></div>
                <button type="button" onClick={() => setShowRequestModal(true)} className="dl-primary self-start"><Send size={15} /> Request resource</button>
              </div>
              <div className="dl-card p-4 sm:p-6">
                <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="relative sm:col-span-1"><Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><input value={filters.search} onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))} className="dl-input pl-10" placeholder="Search resources..." /></div>
                  <select className="dl-input" value={filters.course} onChange={(event) => setFilters((current) => ({ ...current, course: event.target.value }))}><option value="">All courses</option>{courses.map((course) => <option key={course} value={course}>{course}</option>)}</select>
                  <select className="dl-input" value={filters.type} onChange={(event) => setFilters((current) => ({ ...current, type: event.target.value }))}><option value="">All types</option>{resourceTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select>
                </div>
                <Resources filteredResources={filteredResources} handleView={handleView} handleDownload={handleDownload} />
              </div>
            </section>
          )}

          {activeTab === "chat" && <section className="dl-card p-4 sm:p-6"><Chat /></section>}
          {activeTab === "myrequests" && <section className="dl-card p-4 sm:p-6"><Requests /></section>}
          {activeTab === "notifications" && <section className="dl-card p-4 sm:p-6"><Notifications /></section>}
          {activeTab === "profile" && <section className="dl-card p-4 sm:p-6"><Profile /></section>}
        </main>
      </div>

      <RequestModal
        showRequestModal={showRequestModal}
        setShowRequestModal={setShowRequestModal}
        createRequest={createRequest}
      />
    </div>
  );
}
