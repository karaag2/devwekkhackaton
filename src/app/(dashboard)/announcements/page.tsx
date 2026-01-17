"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Megaphone } from "lucide-react";

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
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
        <p className="text-muted-foreground">
          Stay updated with the latest event news.
        </p>
      </div>

      <div className="grid gap-4">
        {ANNOUNCEMENTS.map((item) => (
          <Card
            key={item.id}
            className={item.priority === "HIGH" ? "border-primary" : ""}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                {item.priority === "HIGH" ? (
                  <Megaphone className="h-5 w-5 text-primary" />
                ) : (
                  <Bell className="h-5 w-5" />
                )}
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </div>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </CardHeader>
            <CardContent>
              <p>{item.content}</p>
              {item.priority === "HIGH" && (
                <Badge className="mt-2" variant="destructive">
                  Important
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
