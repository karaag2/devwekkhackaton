"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Calendar, MapPin } from "lucide-react";
import { useUserStore } from "@/store";

export default function EventsPage() {
  const user = useUserStore((state) => state.user);
  const isAdmin = user?.role === "ORGANIZER";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Hackathons</h1>
        {isAdmin && (
          <Link href="/admin/events/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </Link>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder Event Card */}
        <Card>
          <CardHeader>
            <CardTitle>Global AI Hackathon 2026</CardTitle>
            <CardDescription>
              Build the next generation of AI applications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              Feb 14 - Feb 16, 2026
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              Online
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/events/global-ai-hackathon-2026" className="w-full">
              <Button className="w-full">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
