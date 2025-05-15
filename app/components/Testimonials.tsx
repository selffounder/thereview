"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: "Arman B.",
    role: "NIS Student, Contributor",
    image: "/testimonials/student1.jpg",
    content: "I would love to contribute to this platform and this community. Hoping it will be something bigger.",
    rating: 5
  },
  {
    id: 2,
    name: "Danabek M.",
    role: "NIS Graduate, Active Contributor",
    image: "/testimonials/student2.jpg",
    content: "This is a great idea. Not everybody gets computer science for the first time, but this platform is a gamechanger. Excited to work on it.",
    rating: 5
  },
  {
    id: 3,
    name: "Mirali I.",
    role: "NIS Student, Content Creator",
    image: "/testimonials/student3.jpg",
    content: "I love the idea!",
    rating: 5
  },
  {
    id: 4,
    name: "Alisher S.",
    role: "NIS Student, Founder",
    image: "/testimonials/student4.jpg",
    content: "I wish we had something like this back in the previous semester. I see a biiiiiig potential in this platform, and I already love to use it:).",
    rating: 5
  }
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-sm font-medium mb-4">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Open Source Learning Platform
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Learning Community
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Share knowledge, contribute content, and learn together with other NIS students
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-green-100 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
          >
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-green-100 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
          >
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Testimonial Cards */}
          <div className="relative h-[400px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-green-100 dark:border-green-700 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-20 h-20 mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full opacity-20 blur-xl" />
                      <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-green-200 dark:border-green-700">
                        <Image
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                      "{testimonials[currentIndex].content}"
                    </blockquote>
                    <div className="font-semibold text-lg text-gray-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-green-600 dark:bg-green-400 w-8'
                    : 'bg-green-200 dark:bg-green-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Open Source Call to Action */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/selffounder/ed-vibe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            Contribute on GitHub
          </a>
        </div>
      </div>
    </section>
  )
} 