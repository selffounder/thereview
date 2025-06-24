"use client"

import Image from "next/image";
import { Header } from "./components/Header";
import { QuoteGenerator } from "./components/QuoteGenerator";
import { Testimonials } from './components/Testimonials'
import { FeatureShowcase } from "./components/FeatureShowcase";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black transition-colors duration-200">
      <Header />
      <div className="flex-1">
        <section className="relative w-full min-h-[80vh] sm:aspect-video pt-12 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent" />
          
          <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-green-500/20 rounded-full mix-blend-multiply filter blur-2xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-emerald-500/20 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-48 sm:w-64 h-48 sm:h-64 bg-teal-500/20 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000" />

          <div className="relative h-full max-w-5xl mx-auto flex flex-col justify-center">
            <div className="text-center">
              <div className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-sm">
                <span className="mr-1.5 sm:mr-2">✨</span> Now with compilers! 
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-green-400">
                Master Computer Science at NIS
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
                Your personalized learning platform for NIS Computer Science curriculum. From algorithms to programming, we've got you covered.
              </p>

              <div className="mb-8 sm:mb-10">
                <QuoteGenerator />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                <a
                  href="/explore"
                  className="group inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm sm:text-base font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow"
                >
                  Start Learning
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="/demo"
                  className="group inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg border border-green-700 text-gray-300 text-sm sm:text-base font-medium hover:bg-green-900/20 transition-all duration-200"
                >
                  Watch Demo
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </div>

              <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-4 sm:gap-6 items-center text-xs sm:text-sm text-gray-400 px-4 sm:px-0">
                <div className="flex items-center">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free Access for NIS Students
                </div>
                <div className="flex items-center">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure & Private
                </div>
                <div className="flex items-center">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Instant Access
                </div>
              </div>
            </div>
          </div>
        </section>

        
        <FeatureShowcase
          videoSrc="/demo2.mp4"
          headline="Read and edit articles."
          subheadline={
            <>You can contribute to learning without knowing code, just writing documents in GitHub repository.</>
          }
          cta={{ label: "Contribute on GitHub", href: "https://github.com/selffounder/thenisreview" }}
          reverse
        />
        <FeatureShowcase
          videoSrc="/demo3.mp4"
          headline="Solve problems and enhance your learning"
          subheadline={
            <>
              You can try this in our playground.<br />
              <span className="text-gray-300">Beta!</span>
            </>
          }
          cta={{ label: "Try in Playground", href: "https://thenisreview.vercel.app/playground" }}
        />

       

        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">Everything you need for NIS CS</h2>
              <p className="text-base sm:text-lg text-gray-300">Aligned with NIS curriculum and designed for your success</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="group bg-gray-900 p-4 sm:p-6 rounded-xl shadow-sm border border-green-700 hover:shadow transition-all duration-200">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-3 sm:mb-4 text-white">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">NIS Curriculum</h3>
                <p className="text-sm text-gray-300">Complete coverage of NIS Computer Science syllabus with interactive lessons and practice problems</p>
                <div className="mt-3 sm:mt-4 flex items-center text-green-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  Learn more
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              <div className="group bg-gray-900 p-4 sm:p-6 rounded-xl shadow-sm border border-green-700 hover:shadow transition-all duration-200">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-3 sm:mb-4 text-white">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">Practice & Projects</h3>
                <p className="text-sm text-gray-300">Hands-on coding projects and practice problems to reinforce your learning</p>
                <div className="mt-3 sm:mt-4 flex items-center text-green-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  View projects
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              <div className="group bg-gray-900 p-4 sm:p-6 rounded-xl shadow-sm border border-green-700 hover:shadow transition-all duration-200">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-3 sm:mb-4 text-white">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">Peer Learning</h3>
                <p className="text-sm text-gray-300">Connect with other NIS students, share knowledge, and learn together</p>
                <div className="mt-3 sm:mt-4 flex items-center text-green-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  Join community
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />

        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">Trusted by NIS Students</h2>
              <p className="text-base sm:text-lg text-gray-300">Join your peers who are already learning with The NIS Review</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-5 rounded-lg bg-gray-900 border border-green-700 hover:shadow transition-all duration-200">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">500+</div>
                <div className="text-xs sm:text-sm text-gray-300">Active NIS Students</div>
              </div>
              <div className="text-center p-3 sm:p-5 rounded-lg bg-gray-900 border border-green-700 hover:shadow transition-all duration-200">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">95%</div>
                <div className="text-xs sm:text-sm text-gray-300">Exam Success Rate</div>
              </div>
              <div className="text-center p-3 sm:p-5 rounded-lg bg-gray-900 border border-green-700 hover:shadow transition-all duration-200">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">20+</div>
                <div className="text-xs sm:text-sm text-gray-300">NIS Schools</div>
              </div>
              <div className="text-center p-3 sm:p-5 rounded-lg bg-gray-900 border border-green-700 hover:shadow transition-all duration-200">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">4.8/5</div>
                <div className="text-xs sm:text-sm text-gray-300">Student Rating</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
