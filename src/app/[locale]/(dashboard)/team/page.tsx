"use client";

import { Link } from "@/i18n/routing";
import { useUserStore } from "@/store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Users, Search } from "lucide-react";

export default function TeamPage() {
  const user = useUserStore((state) => state.user);
  // Mock team state - in real app would verify if user has team
  const hasTeam = false;

  if (!hasTeam) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="rounded-full bg-muted p-6">
          <Users className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">No Team Yet</h1>
          <p className="text-muted-foreground max-w-[600px]">
            You haven't joined a team yet. You can create a new team, join an
            existing one with an invite code, or find a team looking for your
            skills.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/team/create">
            <Button size="lg" className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </Link>
          <Link href="/team/find">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Find Team
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My Team</h1>
        <Button variant="outline">Settings</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {/* Team Member List */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage your team composition.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Mock Members */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">Captain</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Team Stats/Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Team Workspace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/workspace/123">
              <Button className="w-full">Open Workspace</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
