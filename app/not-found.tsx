import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Error Code Branding */}
        <p className="font-sans text-sm font-semibold tracking-wide text-primary">
          404 ERROR
        </p>

        {/* Title using theme headers */}
        <h1 className="mt-4 text-pink-500 font-heading text-3xl font-bold tracking-tight sm:text-5xl">
          Page not found
        </h1>

        {/* Subtext mapping to muted palette */}
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for. It might have
          been moved, deleted, or never existed in the first place.
        </p>

        {/* Navigation Action Buttons */}
        <div className="mt-10 flex items-center justify-center gap-x-4">
          <Link
            href="/"
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-ring transition-colors"
          >
            Go back home
          </Link>

          <Link
            href="/support"
            className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-card-foreground shadow-xs hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Contact support
          </Link>
        </div>
      </div>
    </main>
  );
}
