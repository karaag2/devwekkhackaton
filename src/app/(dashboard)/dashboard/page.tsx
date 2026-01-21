"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/store";
import { Calendar, Users, Trophy } from "lucide-react";

export default function DashboardPage() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto py-4">
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 leading-none">
          Welcome back,{" "}
          <span className="text-indigo-600">{user?.name || "Hacker"}!</span>
        </h1>
        <div className="h-1.5 w-20 bg-indigo-600 rounded-full" />
        <p className="text-lg font-medium text-gray-500 max-w-2xl">
          Everything looks great today. Here's a quick overview of your status.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-[2rem] border-none shadow-xl shadow-gray-100 overflow-hidden bg-white p-8 group hover:shadow-indigo-100/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform">
              <Calendar className="h-6 w-6" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-indigo-600">
              +1 new
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">
              Upcoming Events
            </h3>
            <div className="text-4xl font-black text-gray-900">3</div>
          </div>
        </Card>

        <Card className="rounded-[2rem] border-none shadow-xl shadow-gray-100 overflow-hidden bg-white p-8 group hover:shadow-green-100/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 rounded-2xl bg-green-50 text-green-600 group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-green-600">
              Pending
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">
              My Team
            </h3>
            <div className="text-2xl font-black text-gray-900">
              Not in a team
            </div>
          </div>
        </Card>

        <Card className="rounded-[2rem] border-none shadow-xl shadow-gray-100 overflow-hidden bg-white p-8 group hover:shadow-yellow-100/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 rounded-2xl bg-yellow-50 text-yellow-600 group-hover:scale-110 transition-transform">
              <Trophy className="h-6 w-6" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-yellow-600">
              Locked
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">
              Submissions
            </h3>
            <div className="text-4xl font-black text-gray-900">0</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
