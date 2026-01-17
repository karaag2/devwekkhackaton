"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

export default function SupportPage() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Ticket submitted");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Help Desk</h1>
        <p className="text-muted-foreground">
          Submit a ticket for technical issues or questions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit a Ticket</CardTitle>
          <CardDescription>
            We usually respond within 15 minutes during the event.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select defaultValue="general">
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="technical">Technical Issue</SelectItem>
                <SelectItem value="team">Team/Matching</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Subject</Label>
            <Input placeholder="Brief summary of the issue" />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="Detailed description..." />
          </div>

          <Button className="w-full" onClick={onSubmit} disabled={isLoading}>
            Submit Ticket
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Tickets</h2>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base">
                WiFi Connection Issues
              </CardTitle>
              <Badge variant="outline">Resolved</Badge>
            </div>
            <CardDescription>Submitted 2 hours ago</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
