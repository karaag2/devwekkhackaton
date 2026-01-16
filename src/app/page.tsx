"use client";

import Link from "next/link";
import { ArrowRight, Code, Users, Trophy, Calendar, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Zap className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">HackHub</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#events"
          >
            Events
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#resources"
          >
            Resources
          </Link>
        </nav>
        <div className="ml-4 flex gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  The Ultimate Platform for Hackathons
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Manage users, teams, submissions, and judging all in one
                  place. Built for scalability, collaboration, and speed.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button size="lg" className="h-11 px-8">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/events">
                  <Button variant="outline" size="lg" className="h-11 px-8">
                    Explore Events
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex justify-center"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-white dark:bg-gray-900 rounded-full">
                  <Code className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Real-time Collaboration</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Code, design, and brainstorm together with integrated tools
                  like Monaco Editor and Excalidraw.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-white dark:bg-gray-900 rounded-full">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Team Formation</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Find the perfect teammates with our skill-based matching
                  algorithm.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-white dark:bg-gray-900 rounded-full">
                  <Trophy className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Fair Judging</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Customizable scoring rubrics and automated ranking ensure the
                  best projects win.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2026 HackHub. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
