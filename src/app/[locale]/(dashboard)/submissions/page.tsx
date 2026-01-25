"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Github, ExternalLink } from "lucide-react";
import { useUserStore } from "@/store";

export default function SubmissionsPage() {
  const user = useUserStore((state) => state.user);

  // Mock data
  const hasSubmission = false;

  if (!hasSubmission) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Project Submissions
          </h1>
          <p className="text-muted-foreground max-w-[600px]">
            Ready to showcase your work? Submit your project details, code
            repository, and demo video.
          </p>
        </div>
        <Link href="/submissions/create">
          <Button size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Create Submission
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Submission</h1>
        <Button variant="outline">Edit Submission</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>HackHub Platform</CardTitle>
          <CardDescription>
            A comprehensive hackathon management system.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Links</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex items-center text-sm text-blue-500 hover:underline"
              >
                <Github className="mr-2 h-4 w-4" />
                Repository
              </a>
              <a
                href="#"
                className="flex items-center text-sm text-blue-500 hover:underline"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">
              HackHub streamlines the entire hackathon process...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
