"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Our Sponsors</h1>
        <p className="text-muted-foreground">
          Special thanks to our partners for making this event possible.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SPONSORS.map((sponsor) => (
          <Card
            key={sponsor.name}
            className="flex flex-col items-center text-center"
          >
            <CardHeader>
              <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-xl text-muted-foreground">
                  {sponsor.name[0]}
                </span>
              </div>
              <CardTitle>{sponsor.name}</CardTitle>
              <Badge
                variant={sponsor.tier === "Platinum" ? "default" : "secondary"}
                className="mt-2 text-xs"
              >
                {sponsor.tier} Sponsor
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{sponsor.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
