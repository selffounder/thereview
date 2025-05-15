"use client"

import Image from "next/image";
import { Header } from "./components/Header";
import { QuoteGenerator } from "./components/QuoteGenerator";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <div className="flex-1">
        {/* Hero Section - 16:9 */}
        <section className="relative w-full aspect-video pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Enhanced background with multiple layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-100/50 via-transparent to-transparent dark:from-green-900/20" />
          <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-300/30 dark:bg-green-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-emerald-300/30 dark:bg-emerald-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-teal-300/30 dark:bg-teal-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />

          <div className="relative h-full max-w-6xl mx-auto flex flex-col justify-center">
            <div className="text-center">
              {/* Enhanced badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium mb-6 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                <span className="mr-2 animate-pulse">✨</span> For NIS Students
              </div>

              {/* Enhanced heading with better gradient */}
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 dark:from-green-400 dark:via-emerald-400 dark:to-green-400 animate-gradient">
                Master Computer Science at NIS
              </h1>

              {/* Enhanced description */}
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Your personalized learning platform for NIS Computer Science curriculum. From algorithms to programming, we've got you covered.
              </p>

              {/* Quote Generator with enhanced styling */}
              <div className="mb-12 transform hover:scale-[1.02] transition-transform duration-300">
                <QuoteGenerator />
              </div>

              {/* Enhanced CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/explore"
                  className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105"
                >
                  Start Learning
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="/demo"
                  className="group inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-green-200 dark:border-green-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 hover:scale-105"
                >
                  Watch Demo
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap justify-center gap-8 items-center text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free Access for NIS Students
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure & Private
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Instant Access
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Everything you need for NIS CS</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Aligned with NIS curriculum and designed for your success</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-green-100 dark:border-green-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">NIS Curriculum</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Complete coverage of NIS Computer Science syllabus with interactive lessons and practice problems</p>
                <div className="mt-6 flex items-center text-green-600 dark:text-green-400 font-medium group-hover:translate-x-2 transition-transform">
                  Learn more
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-green-100 dark:border-green-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Practice & Projects</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Hands-on coding projects and practice problems to reinforce your learning</p>
                <div className="mt-6 flex items-center text-green-600 dark:text-green-400 font-medium group-hover:translate-x-2 transition-transform">
                  View projects
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-green-100 dark:border-green-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Peer Learning</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Connect with other NIS students, share knowledge, and learn together</p>
                <div className="mt-6 flex items-center text-green-600 dark:text-green-400 font-medium group-hover:translate-x-2 transition-transform">
                  Join community
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Advanced Learning Features</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Tools and resources to enhance your learning experience</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-green-100 dark:border-green-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Interactive Code Editor (SOON!)</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Practice coding directly in your browser with our built-in IDE. Get instant feedback and suggestions.</p>
                <div className="mt-6 flex items-center text-green-600 dark:text-green-400 font-medium group-hover:translate-x-2 transition-transform">
                  Try it now
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-green-100 dark:border-green-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Progress Tracking</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Monitor your learning journey with detailed analytics and personalized recommendations.</p>
                <div className="mt-6 flex items-center text-green-600 dark:text-green-400 font-medium group-hover:translate-x-2 transition-transform">
                  View dashboard
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topics Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Key Topics Covered</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Essential Computer Science concepts for NIS students</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="group bg-white dark:bg-gray-800 p-6 rounded-xl border border-green-100 dark:border-green-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <div className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Algorithms</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Sorting, Searching, Dynamic Programming</div>
              </div>
              <div className="group bg-white dark:bg-gray-800 p-6 rounded-xl border border-green-100 dark:border-green-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <div className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Data Structures</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Arrays, Lists, Trees, Graphs</div>
              </div>
              <div className="group bg-white dark:bg-gray-800 p-6 rounded-xl border border-green-100 dark:border-green-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Programming</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Python, Java, C++</div>
              </div>
              <div className="group bg-white dark:bg-gray-800 p-6 rounded-xl border border-green-100 dark:border-green-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Web Development</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">HTML, CSS, JavaScript</div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Trusted by NIS Students</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Join your peers who are already learning with EduVibe</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 border border-green-100 dark:border-green-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">500+</div>
                <div className="text-gray-600 dark:text-gray-300">Active NIS Students</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 border border-green-100 dark:border-green-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">95%</div>
                <div className="text-gray-600 dark:text-gray-300">Exam Success Rate</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 border border-green-100 dark:border-green-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">20+</div>
                <div className="text-gray-600 dark:text-gray-300">NIS Schools</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 border border-green-100 dark:border-green-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">4.8/5</div>
                <div className="text-gray-600 dark:text-gray-300">Student Rating</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
