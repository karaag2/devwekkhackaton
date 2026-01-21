"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LeaderboardPage() {
  const leaderboard = [
    { rank: 1, team: "Brainiacs", score: 92, project: "NeuroLink" },
    { rank: 2, team: "Green Machine", score: 88, project: "EcoTrack" },
    { rank: 3, team: "BlockChain Gang", score: 85, project: "DeFi Viz" },
    { rank: 4, team: "Pixel Pioneers", score: 82, project: "DesignAI" },
    { rank: 5, team: "Data Dynamos", score: 79, project: "Insight" },
  ];

  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto py-4">
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 leading-none">
          Live <span className="text-indigo-600">Leaderboard</span>
        </h1>
        <div className="h-1.5 w-20 bg-indigo-600 rounded-full" />
        <p className="text-lg font-medium text-gray-500 max-w-2xl">
          Real-time tracking of the top performing teams.
        </p>
      </div>

      {/* Podium Section */}
      <div className="grid md:grid-cols-3 gap-6 items-end">
        {/* 2nd Place */}
        <div className="order-2 md:order-1">
          <Card className="rounded-[2rem] border-none shadow-xl shadow-gray-100 bg-white/50 backdrop-blur-sm p-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                2nd Place
              </p>
              <h3 className="text-2xl font-black text-gray-900">
                {leaderboard[1].team}
              </h3>
              <p className="text-indigo-600 font-black text-xl">
                {leaderboard[1].score} pts
              </p>
            </div>
          </Card>
        </div>

        {/* 1st Place */}
        <div className="order-1 md:order-2">
          <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-indigo-100 bg-white p-10 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="flex justify-center relative">
              <div
                className="h-24 w-24 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-100 animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                <Trophy className="h-12 w-12 text-white" />
              </div>
            </div>
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-widest text-indigo-600">
                Champion
              </p>
              <h3 className="text-3xl font-black text-gray-900">
                {leaderboard[0].team}
              </h3>
              <p className="text-indigo-600 font-black text-3xl">
                {leaderboard[0].score} pts
              </p>
            </div>
          </Card>
        </div>

        {/* 3rd Place */}
        <div className="order-3">
          <Card className="rounded-[2rem] border-none shadow-xl shadow-gray-100 bg-white/50 backdrop-blur-sm p-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-amber-600" />
              </div>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                3rd Place
              </p>
              <h3 className="text-2xl font-black text-gray-900">
                {leaderboard[2].team}
              </h3>
              <p className="text-indigo-600 font-black text-xl">
                {leaderboard[2].score} pts
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Card className="rounded-[2rem] border-none shadow-xl shadow-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="w-[100px] font-black uppercase tracking-widest text-[10px] px-8 h-14">
                Rank
              </TableHead>
              <TableHead className="font-black uppercase tracking-widest text-[10px] h-14">
                Team
              </TableHead>
              <TableHead className="font-black uppercase tracking-widest text-[10px] h-14">
                Project
              </TableHead>
              <TableHead className="text-right font-black uppercase tracking-widest text-[10px] px-8 h-14">
                Score
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((item) => (
              <TableRow
                key={item.rank}
                className="border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-black px-8 py-6 text-gray-900">
                  <span
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-lg",
                      item.rank <= 3
                        ? "bg-indigo-50 text-indigo-600"
                        : "bg-gray-100 text-gray-500",
                    )}
                  >
                    #{item.rank}
                  </span>
                </TableCell>
                <TableCell className="font-bold text-gray-900 text-base">
                  {item.team}
                </TableCell>
                <TableCell className="font-medium text-gray-500">
                  {item.project}
                </TableCell>
                <TableCell className="text-right font-black text-indigo-600 px-8 text-lg">
                  {item.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
