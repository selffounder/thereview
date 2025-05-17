"use client"

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-green-200 dark:border-green-800 bg-white dark:bg-gray-900 shadow-sm backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="flex items-center gap-2 group transform hover:scale-105 transition-transform duration-300"
          >
            <div className="relative">
              <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-30 blur transition duration-300 group-hover:scale-110" />
              <span className="relative text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                The NIS Review
              </span>
            </div>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link
              href="/explore"
              className="relative text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-300 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-green-500 after:to-emerald-500 after:transition-all after:duration-300 hover:after:w-full hover:translate-y-[-2px]"
            >
              Explore
            </Link>
            <Link
              href="/tasks"
              className="relative text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-300 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-green-500 after:to-emerald-500 after:transition-all after:duration-300 hover:after:w-full hover:translate-y-[-2px]"
            >
              Tasks
            </Link>
            <Link
              href="/account"
              className="relative text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-300 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-green-500 after:to-emerald-500 after:transition-all after:duration-300 hover:after:w-full hover:translate-y-[-2px]"
            >
              Personal Account
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button 
            variant="outline" 
            className="hidden md:flex relative overflow-hidden group h-10 px-6 text-base font-semibold border-2 border-green-300 dark:border-green-600 hover:border-green-500 dark:hover:border-green-400 transform hover:scale-105 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-emerald-500/30 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <span className="relative group-hover:translate-x-1 transition-transform duration-300">Sign In</span>
          </Button>
          <Button 
            className="hidden md:flex relative overflow-hidden group h-10 px-6 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <span className="relative group-hover:translate-x-1 transition-transform duration-300">Get Started</span>
          </Button>
        </div>
      </div>
    </header>
  );
} 