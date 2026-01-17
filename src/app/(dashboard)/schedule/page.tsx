"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SCHEDULE_ITEMS = [
  {
    time: "09:00 AM",
    title: "Opening Ceremony",
    description: "Kickoff keynote and theme announcement.",
    type: "Highlight",
  },
  {
    time: "10:00 AM",
    title: "Team Formation",
    description: "Meet your potential teammates.",
    type: "Activity",
  },
  {
    time: "12:00 PM",
    title: "Hacking Begins",
    description: "Start your engines!",
    type: "Highlight",
  },
  {
    time: "02:00 PM",
    title: "Workshop: Building with AI",
    description: "Learn how to integrate LLMs.",
    type: "Workshop",
  },
];

export default function SchedulePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Event Schedule</h1>
        <p className="text-muted-foreground">
          Don't miss out on important activities.
        </p>
      </div>

      <div className="relative border-l border-muted ml-4 space-y-8 pb-8">
        {SCHEDULE_ITEMS.map((item, index) => (
          <div key={index} className="relative pl-8">
            <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-muted-foreground">
                {item.time}
              </span>
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    {item.type === "Highlight" && <Badge>Highlight</Badge>}
                    {item.type === "Workshop" && (
                      <Badge variant="secondary">Workshop</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
