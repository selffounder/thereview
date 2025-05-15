"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-10 w-10 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 dark:from-blue-400/30 dark:to-purple-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 text-gray-700 dark:text-gray-300 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-500 text-gray-700 dark:text-gray-300 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl"
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
        >
          <Sun className="h-5 w-5 text-yellow-500" />
          Light Mode
          {theme === "light" && (
            <span className="ml-auto h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-blue-500/20" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
        >
          <Moon className="h-5 w-5 text-blue-500" />
          Dark Mode
          {theme === "dark" && (
            <span className="ml-auto h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-blue-500/20" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
        >
          <svg className="h-5 w-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
          </svg>
          System
          {theme === "system" && (
            <span className="ml-auto h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-blue-500/20" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 