"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

export default function LeaderboardPage() {
  const leaderboard = [
    { rank: 1, team: "Brainiacs", score: 92, project: "NeuroLink" },
    { rank: 2, team: "Green Machine", score: 88, project: "EcoTrack" },
    { rank: 3, team: "BlockChain Gang", score: 85, project: "DeFi Viz" },
    { rank: 4, team: "Pixel Pioneers", score: 82, project: "DesignAI" },
    { rank: 5, team: "Data Dynamos", score: 79, project: "Insight" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">
          Live rankings based on judge scoring.
        </p>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Project</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((item) => (
              <TableRow key={item.rank}>
                <TableCell className="font-medium flex items-center gap-2">
                  {item.rank === 1 && (
                    <Trophy className="h-4 w-4 text-yellow-500" />
                  )}
                  {item.rank === 2 && (
                    <Trophy className="h-4 w-4 text-gray-400" />
                  )}
                  {item.rank === 3 && (
                    <Trophy className="h-4 w-4 text-amber-600" />
                  )}
                  #{item.rank}
                </TableCell>
                <TableCell>{item.team}</TableCell>
                <TableCell>{item.project}</TableCell>
                <TableCell className="text-right font-bold">
                  {item.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
