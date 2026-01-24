"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

const ANNOUNCEMENTS = [
  {
    id: "1",
    title: "Hacking Begins!",
    content: "The repository access has been granted. Start your connections!",
    time: "2 hours ago",
    priority: "HIGH",
  },
  {
    id: "2",
    title: "Lunch is served",
    content: "Pizza and salad available in the main hall.",
    time: "4 hours ago",
    priority: "NORMAL",
  },
];

export default function AnnouncementsPage() {
  return (
    <div className="flex flex-col gap-10 max-w-4xl mx-auto py-4">
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 leading-none">
          Latest <span className="text-indigo-600">Announcements</span>
        </h1>
        <div className="h-1.5 w-20 bg-indigo-600 rounded-full" />
        <p className="text-lg font-medium text-gray-500 max-w-2xl">
          Everything you need to stay in the loop during the hackathon.
        </p>
      </div>

      <div className="grid gap-6">
        {ANNOUNCEMENTS.map((item) => (
          <Card
            key={item.id}
            className={cn(
              "rounded-[2.5rem] border-none shadow-xl shadow-gray-100 overflow-hidden group transition-all duration-300 hover:shadow-indigo-100/50",
              item.priority === "HIGH"
                ? "bg-white ring-2 ring-indigo-600/10"
                : "bg-white",
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between p-8 pb-4">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "p-3 rounded-2xl transition-transform group-hover:scale-110",
                    item.priority === "HIGH"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-500",
                  )}
                >
                  {item.priority === "HIGH" ? (
                    <Megaphone className="h-6 w-6" />
                  ) : (
                    <Bell className="h-6 w-6" />
                  )}
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-black text-gray-900 leading-tight">
                    {item.title}
                  </CardTitle>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block">
                    {item.time}
                  </span>
                </div>
              </div>
              {item.priority === "HIGH" && (
                <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-[10px] py-2 px-4 rounded-full border-none shadow-lg shadow-indigo-100">
                  Urgent
                </Badge>
              )}
            </CardHeader>
            <CardContent className="px-8 pb-8 pt-2">
              <p className="text-gray-500 font-medium leading-relaxed text-lg">
                {item.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
