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
    <div className="flex flex-col gap-10 max-w-4xl mx-auto py-4">
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 leading-none">
          Event <span className="text-indigo-600">Schedule</span>
        </h1>
        <div className="h-1.5 w-20 bg-indigo-600 rounded-full" />
        <p className="text-lg font-medium text-gray-500 max-w-2xl">
          Everything you need to know about the HackHub timeline.
        </p>
      </div>

      <div className="relative border-l-4 border-gray-100 ml-6 space-y-12 pb-12">
        {SCHEDULE_ITEMS.map((item, index) => (
          <div key={index} className="relative pl-12 group">
            <div className="absolute -left-[14px] top-1.5 h-6 w-6 rounded-full border-4 border-white bg-indigo-600 shadow-sm group-hover:scale-125 transition-transform" />
            <div className="flex flex-col gap-3">
              <span className="text-sm font-black uppercase tracking-widest text-indigo-500">
                {item.time}
              </span>
              <Card className="rounded-[2rem] border-none shadow-xl shadow-gray-100/50 hover:shadow-indigo-100/40 transition-shadow overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-2">
                      <h3 className="font-black text-2xl text-gray-900 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    {item.type === "Highlight" && (
                      <Badge className="bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase tracking-widest text-[10px] py-1.5 px-3 rounded-full border-none">
                        Highlight
                      </Badge>
                    )}
                    {item.type === "Workshop" && (
                      <Badge className="bg-green-400 hover:bg-green-500 text-black font-black uppercase tracking-widest text-[10px] py-1.5 px-3 rounded-full border-none">
                        Workshop
                      </Badge>
                    )}
                    {item.type === "Activity" && (
                      <Badge className="bg-indigo-50 text-indigo-600 font-black uppercase tracking-widest text-[10px] py-1.5 px-3 rounded-full border-none">
                        Activity
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
