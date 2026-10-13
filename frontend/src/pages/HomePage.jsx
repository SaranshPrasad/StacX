// ==========================================
// src/pages/HomePage.jsx
// ==========================================

import { useEffect, useState, useRef } from "react";

import {
  Sparkles,
  Rocket,
  Brain,
  BookOpen,
  Users,
  MessageSquare,
  Download,
  Shield,
  Zap,
  Star,
  ArrowRight,
  ChevronDown,
  Play,
  CheckCircle,
  TrendingUp,
  Clock,
  Award,
  Heart,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import About from "../components/About";

export default function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // =========================================
  // STATS
  // =========================================

  const stats = [
    { value: 100, suffix: "+", label: "Active Students", icon: Users },
    { value: 100, suffix: "+", label: "Resources", icon: BookOpen },
    { value: 100, suffix: "+", label: "Contributors", icon: Award },
    { value: 100, suffix: "%", label: "Satisfaction", icon: Heart },
  ];

  // =========================================
  // ANIMATED COUNTER
  // =========================================

  const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (!isVisible) return;

      let startTime;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;

        const progress = Math.min(
          (currentTime - startTime) / duration,
          1
        );

        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return (
      <span ref={ref}>
        {count}
        {suffix}
      </span>
    );
  };

  // =========================================
  // FEATURES
  // =========================================

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Notes",
      description:
        "Access well-organized notes from top performers across all semesters and subjects.",
      color: "from-indigo-500 to-purple-500",
      iconColor: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20",
    },
    {
      icon: Brain,
      title: "Smart Search",
      description:
        "Find exactly what you need with our intelligent filtering and search system.",
      color: "from-purple-500 to-pink-500",
      iconColor: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Join thousands of students sharing knowledge and helping each other succeed.",
      color: "from-pink-500 to-rose-500",
      iconColor: "text-pink-400",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/20",
    },

    {
      icon: Download,
      title: "Easy Downloads",
      description:
        "One-click downloads for PDFs, notes, assignments, and previous year papers.",
      color: "from-green-500 to-emerald-500",
      iconColor: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      icon: Shield,
      title: "Verified Content",
      description:
        "All resources are verified by top students and faculty for accuracy.",
      color: "from-orange-500 to-amber-500",
      iconColor: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
  ];

  // =========================================
  // TESTIMONIALS
  // =========================================

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "B.Tech CSE, 3rd Year",
      content:
        "StacX saved my semester! Found all PYQs and notes in one place. Absolutely game-changing.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5,
    },
    {
      name: "Rahul Kumar",
      role: "BBA, 2nd Year",
      content:
        "The community chat feature helped me connect with seniors who guided me throughout.",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 5,
    },
    {
      name: "Ananya Patel",
      role: "B.Sc Physics, Final Year",
      content:
        "Best platform for students. Clean interface, fast downloads, and amazing resources.",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 5,
    },
  ];

  // =========================================
  // ABOUT CARDS
  // =========================================

  const aboutCards = [
    {
      icon: Brain,
      title: "Smart Discovery",
      desc: "AI-powered search to find exactly what you need",
    },
    {
      icon: Rocket,
      title: "Fast Requests",
      desc: "Get resources from seniors within hours",
    },
    {
      icon: Sparkles,
      title: "Community Support",
      desc: "24/7 help from thousands of active students",
    },
  ];

  return (
    <div
      className={`transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"
        } md:mt-10`}
    >
      {/* HERO SECTION */}

     <Hero isLoaded={isLoaded}/>

      {/* STATS */}

      <Stats stats={stats} AnimatedCounter={AnimatedCounter}/>

      {/* FEATURES */}

     <Features features={features} />

      {/* ABOUT */}

      <About/>
    </div>
  );
}