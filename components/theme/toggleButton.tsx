"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()


  React.useEffect(() => {
    setMounted(true)
  }, [])


  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="rounded-full">
        <span className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    )
  }

  const isDark = theme === "dark" || resolvedTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
     
      {isDark ? (
        <Moon className="h-[1.2rem] w-[1.2rem] text-slate-300 transition-all" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500 transition-all" />
      )}

      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </Button>
  )
}