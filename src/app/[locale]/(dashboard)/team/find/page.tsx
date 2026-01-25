"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { joinTeamSchema, type JoinTeamInput } from "@/lib/validations";

export default function FindTeamPage() {
  const router = useRouter();

  // Mock teams data
  const teams = [
    {
      id: "1",
      name: "Pixel Pioneers",
      description: "Building a revolutionary design tool for hackers.",
      lookingFor: "Backend Developer",
      members: 3,
      maxMembers: 4,
    },
    {
      id: "2",
      name: "Data Dynamos",
      description: "Analyzing hackathon trends using AI.",
      lookingFor: "Data Scientist, Frontend Dev",
      members: 2,
      maxMembers: 4,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Find a Team</h1>
        <p className="text-muted-foreground">
          Browse teams looking for members or join via invite code.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search teams by skill or name..."
            className="pl-8"
          />
        </div>
        <JoinTeamDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                {team.name}
                <Badge variant="secondary">
                  {team.members}/{team.maxMembers}
                </Badge>
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {team.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <span className="font-semibold">Looking for:</span>{" "}
                {team.lookingFor}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Request to Join</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function JoinTeamDialog() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinTeamInput>({
    resolver: zodResolver(joinTeamSchema) as any,
  });

  async function onSubmit(data: JoinTeamInput) {
    setIsLoading(true);
    try {
      // TODO: Join logic
      console.log(data);
      toast.success("Joined team successfully");
      // Redirect or refresh
    } catch {
      toast.error("Invalid invite code");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Enter Invite Code</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Team with Code</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="inviteCode">Invite Code</Label>
            <Input
              id="inviteCode"
              placeholder="Enter code..."
              {...register("inviteCode")}
              disabled={isLoading}
            />
            {errors.inviteCode && (
              <p className="text-sm text-red-500">
                {errors.inviteCode.message}
              </p>
            )}
          </div>
          <Button className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Join Team
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
