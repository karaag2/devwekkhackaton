"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const SPONSORS = [
  {
    name: "TechCorp",
    tier: "Platinum",
    description: "Leading the way in AI innovation.",
    logo: "/placeholder-logo.png", // Mock
  },
  {
    name: "Cloudify",
    tier: "Gold",
    description: "Scalable cloud infrastructure for everyone.",
    logo: "/placeholder-logo.png",
  },
  {
    name: "DevToolz",
    tier: "Silver",
    description: "Tools for developers, by developers.",
    logo: "/placeholder-logo.png",
  },
];

export default function SponsorsPage() {
  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto py-4">
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 leading-none">
          Our <span className="text-indigo-600">Sponsors</span>
        </h1>
        <div className="h-1.5 w-20 bg-indigo-600 rounded-full mx-auto md:mx-0" />
        <p className="text-lg font-medium text-gray-500 max-w-2xl">
          Empowering the next generation of developers with the help of our
          amazing partners.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {SPONSORS.map((sponsor) => (
          <Card
            key={sponsor.name}
            className="rounded-[2.5rem] border-none shadow-xl shadow-gray-100 bg-white group hover:shadow-indigo-100/50 transition-all duration-500 flex flex-col items-center text-center p-8 pt-12 relative overflow-hidden"
          >
            {/* Background Decoration */}
            <div
              className={cn(
                "absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40",
                sponsor.tier === "Platinum"
                  ? "bg-indigo-600"
                  : sponsor.tier === "Gold"
                    ? "bg-yellow-400"
                    : "bg-gray-400",
              )}
            />

            <div className="relative mb-6">
              <div
                className={cn(
                  "h-28 w-28 rounded-[2rem] flex items-center justify-center rotate-3 transition-transform group-hover:rotate-0 group-hover:scale-105 duration-500 shadow-lg",
                  sponsor.tier === "Platinum"
                    ? "bg-indigo-50 text-indigo-600"
                    : sponsor.tier === "Gold"
                      ? "bg-yellow-50 text-yellow-600"
                      : "bg-gray-50 text-gray-600",
                )}
              >
                <span className="font-black text-4xl">{sponsor.name[0]}</span>
              </div>
            </div>

            <div className="space-y-2 relative">
              <CardTitle className="text-2xl font-black text-gray-900">
                {sponsor.name}
              </CardTitle>
              <Badge
                className={cn(
                  "font-black uppercase tracking-widest text-[10px] py-1.5 px-4 rounded-full border-none",
                  sponsor.tier === "Platinum"
                    ? "bg-indigo-600 text-white"
                    : sponsor.tier === "Gold"
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-200 text-gray-600",
                )}
              >
                {sponsor.tier} Partner
              </Badge>
            </div>

            <CardContent className="mt-6 p-0 border-none">
              <p className="text-gray-500 font-medium leading-relaxed">
                {sponsor.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
