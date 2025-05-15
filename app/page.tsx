"use client"

import Image from "next/image";
import { Header } from "./components/Header";
import { QuoteGenerator } from "./components/QuoteGenerator";
import { Testimonials } from './components/Testimonials'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <div className="flex-1">
        <section className="relative w-full aspect-video pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-100/30 via-transparent to-transparent dark:from-green-900/10" />
          
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-300/20 dark:bg-green-500/10 rounded-full mix-blend-multiply filter blur-2xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-emerald-300/20 dark:bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-teal-300/20 dark:bg-teal-500/10 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000" />

          <div className="relative h-full max-w-5xl mx-auto flex flex-col justify-center">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium mb-6 shadow-sm">
                <span className="mr-2">✨</span> For NIS Students
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 dark:from-green-400 dark:via-emerald-400 dark:to-green-400">
                Master Computer Science at NIS
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Your personalized learning platform for NIS Computer Science curriculum. From algorithms to programming, we've got you covered.
              </p>

              <div className="mb-10">
                <QuoteGenerator />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/explore"
                  className="group inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow"
                >
                  Start Learning
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="/demo"
                  className="group inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-green-200 dark:border-green-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
                >
                  Watch Demo
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-6 items-center text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free Access for NIS Students
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure & Private
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Instant Access
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">Everything you need for NIS CS</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">Aligned with NIS curriculum and designed for your success</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-green-100 dark:border-green-700 hover:shadow transition-all duration-200">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">NIS Curriculum</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Complete coverage of NIS Computer Science syllabus with interactive lessons and practice problems</p>
                <div className="mt-4 flex items-center text-green-600 dark:text-green-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              <div className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-green-100 dark:border-green-700 hover:shadow transition-all duration-200">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Practice & Projects</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Hands-on coding projects and practice problems to reinforce your learning</p>
                <div className="mt-4 flex items-center text-green-600 dark:text-green-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  View projects
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              <div className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-green-100 dark:border-green-700 hover:shadow transition-all duration-200">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Peer Learning</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Connect with other NIS students, share knowledge, and learn together</p>
                <div className="mt-4 flex items-center text-green-600 dark:text-green-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  Join community
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">Key Topics Covered</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">Essential Computer Science concepts for NIS students</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="group bg-white dark:bg-gray-800 p-5 rounded-lg border border-green-100 dark:border-green-700 hover:shadow transition-all duration-200">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-md flex items-center justify-center mb-3 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <div className="font-medium text-gray-900 dark:text-white mb-1">Algorithms</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Sorting, Searching, Dynamic Programming</div>
              </div>
              <div className="group bg-white dark:bg-gray-800 p-5 rounded-lg border border-green-100 dark:border-green-700 hover:shadow transition-all duration-200">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-md flex items-center justify-center mb-3 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <div className="font-medium text-gray-900 dark:text-white mb-1">Data Structures</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Arrays, Lists, Trees, Graphs</div>
              </div>
              <div className="group bg-white dark:bg-gray-800 p-5 rounded-lg border border-green-100 dark:border-green-700 hover:shadow transition-all duration-200">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-md flex items-center justify-center mb-3 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div className="font-medium text-gray-900 dark:text-white mb-1">Programming</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Python, Java, C++</div>
              </div>
              <div className="group bg-white dark:bg-gray-800 p-5 rounded-lg border border-green-100 dark:border-green-700 hover:shadow transition-all duration-200">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-md flex items-center justify-center mb-3 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="font-medium text-gray-900 dark:text-white mb-1">Web Development</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">HTML, CSS, JavaScript</div>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">Trusted by NIS Students</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">Join your peers who are already learning with EduVibe</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-5 rounded-lg bg-white dark:bg-gray-800 border border-green-100 dark:border-green-700 hover:shadow transition-all duration-200">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Active NIS Students</div>
              </div>
              <div className="text-center p-5 rounded-lg bg-white dark:bg-gray-800 border border-green-100 dark:border-green-700 hover:shadow transition-all duration-200">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Exam Success Rate</div>
              </div>
              <div className="text-center p-5 rounded-lg bg-white dark:bg-gray-800 border border-green-100 dark:border-green-700 hover:shadow transition-all duration-200">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">20+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">NIS Schools</div>
              </div>
              <div className="text-center p-5 rounded-lg bg-white dark:bg-gray-800 border border-green-100 dark:border-green-700 hover:shadow transition-all duration-200">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">4.8/5</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Student Rating</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
