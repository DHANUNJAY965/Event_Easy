"use client";
import { useState } from "react";
import {
  Calendar,
  Users,
  Shield,
  Zap,
  ArrowRight,
  Play,
  Star,
  Check,
  Globe,
  Clock,
  BarChart3,
  Sparkles,
  Menu,
  X,
  TrendingUp,
  Eye,
  Download,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AuthModal from "@/components/AuthModal";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup" | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg border-b border-gray-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className=" bg-slate-900 rounded-lg">
                <Image
                  src="/logo5.png"
                  alt="Calendar icon"
                  width={36}
                  height={36}
                  className="text-white"
                />
              </div>
              <span className="text-xl font-bold text-slate-900">
                EventEase
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-slate-900 transition-colors text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-slate-900 transition-colors text-sm font-medium"
              >
                How it Works
              </a>
              <a
                href="#stats"
                className="text-gray-700 hover:text-slate-900 transition-colors text-sm font-medium"
              >
                Stats
              </a>
            </div>

            <div className="flex items-center space-x-4">
              {/* <Link
                href="/auth/signin"
                className="flex items-center justify-center"
              > */}
                <button onClick={() => setAuthMode("signin")} className="text-gray-700 hover:text-slate-900 transition-colors text-sm font-medium hidden sm:block">
                  Sign In
                </button>
              {/* </Link> */}

              {/* <Link
                href="/auth/signup"
                className="flex items-center justify-center"
              > */}
                <button onClick={() => setAuthMode("signup")} className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                  Get Started
                </button>
              {/* </Link> */}

              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#features"
                className="block text-gray-700 hover:text-slate-900 transition-colors text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block text-gray-700 hover:text-slate-900 transition-colors text-sm font-medium"
              >
                How it Works
              </a>
              <a
                href="#stats"
                className="block text-gray-700 hover:text-slate-900 transition-colors text-sm font-medium"
              >
                Stats
              </a>
              <button className="block w-full text-left text-gray-700 hover:text-slate-900 transition-colors text-sm font-medium">
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
              {/* <Star className="w-4 h-4 mr-2 text-slate-600" /> */}
              Trusted by 50,000+ event creators worldwide
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Event Management <span className="text-slate-600">Made</span>{" "}
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Simple
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Create memorable experiences with our intuitive event management
                platform. From intimate gatherings to large conferences, we've
                got you covered.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/auth/signup"
                className="flex items-center justify-center"
              >
                <button className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group">
                  Start Creating Events
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 relative max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Mockup Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
                    <Calendar className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">
                    EventEase Dashboard
                  </span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>

              {/* Mockup Content */}
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Event Cards */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Tech Conference
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">250 attendees</p>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">
                        Registration Progress
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Networking Mixer
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">85 attendees</p>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">
                        Check-ins Live
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-1/2"></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Workshop Series
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">45 attendees</p>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">
                        Completion Rate
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200 hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">+247</div>
                  <div className="text-xs text-gray-500">New RSVPs</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200 hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">98.5%</div>
                  <div className="text-xs text-gray-500">Attendance Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Powerful Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything you need in one place
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Streamline your event management with our comprehensive suite of
              tools
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Smart Event Builder
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Create beautiful events in minutes with our intuitive
                drag-and-drop interface and professional templates.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                  Drag & drop builder
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                  50+ professional templates
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                  Custom branding options
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Advanced RSVP System
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Manage attendees effortlessly with real-time tracking, automated
                emails, and comprehensive analytics.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                  Real-time attendee tracking
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                  Automated confirmations
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                  Detailed analytics dashboard
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Powerful Analytics
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Get detailed insights into your events with comprehensive
                reports and data visualization tools.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                  Detailed event reports
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                  Data export functionality
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                  Performance insights
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Get started in 3 simple steps
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From creation to execution, managing events has never been easier
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Create Your Event
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Choose from our professional templates or start from scratch.
                Customize every detail to match your vision.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Share & Promote
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get your unique event URL and share it across all channels.
                Built-in social media integration makes promotion effortless.
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-8">
                <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Manage & Analyze
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Track RSVPs in real-time, manage attendees, and get detailed
                insights to make your next event even better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Trusted by creators worldwide
            </h2>
            <p className="text-xl text-slate-300">
              Join thousands of successful events powered by EventEase
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                50K+
              </div>
              <div className="text-slate-400">Events Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                2M+
              </div>
              <div className="text-slate-400">Happy Attendees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                99.9%
              </div>
              <div className="text-slate-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                24/7
              </div>
              <div className="text-slate-400">Support</div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      {/* <footer className="bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 lg:mb-0">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-slate-900" />
              </div>
              <span className="text-xl font-bold text-white">EventEase</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex space-x-6">
                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Support</a>
              </div>
              <div className="text-slate-400 text-sm">
                © 2025 EventEase. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer> */}
      {authMode && (
        <AuthModal
          initialMode={authMode}
          onClose={() => setAuthMode(null)}
        />
      )}
    </div>
  );
}
