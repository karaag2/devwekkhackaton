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
import { Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function SupportPage() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Ticket submitted");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-10 max-w-2xl mx-auto py-4">
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 leading-none">
          Help <span className="text-indigo-600">Desk</span>
        </h1>
        <div className="h-1.5 w-20 bg-indigo-600 rounded-full" />
        <p className="text-lg font-medium text-gray-500">
          Need a hand? We're here to help you build something great.
        </p>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-xl shadow-gray-100 overflow-hidden bg-white">
        <CardHeader className="p-10 pb-2">
          <CardTitle className="text-2xl font-black text-gray-900 leading-tight">
            Submit a Ticket
          </CardTitle>
          <CardDescription className="text-base font-medium text-gray-500">
            We usually respond within 15 minutes during the event.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-10 space-y-6">
          <div className="space-y-3">
            <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
              Category
            </Label>
            <Select defaultValue="general">
              <SelectTrigger className="rounded-xl h-12 border-gray-100 focus:ring-indigo-600">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-100">
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="technical">Technical Issue</SelectItem>
                <SelectItem value="team">Team/Matching</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
              Subject
            </Label>
            <Input
              placeholder="Brief summary of the issue"
              className="rounded-xl h-12 border-gray-100 focus:ring-indigo-600"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
              Description
            </Label>
            <Textarea
              placeholder="Detailed description..."
              className="rounded-xl min-h-[120px] border-gray-100 focus:ring-indigo-600"
            />
          </div>

          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-14 font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100 transition-all mt-4"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Ticket
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-2xl font-black text-gray-900 px-1">Your Tickets</h2>
        <Card className="rounded-[2rem] border-none shadow-xl shadow-gray-100 overflow-hidden bg-white group hover:shadow-indigo-100/30 transition-shadow">
          <CardHeader className="p-8">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2">
                <CardTitle className="text-xl font-black text-gray-900">
                  WiFi Connection Issues
                </CardTitle>
                <CardDescription className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">
                  Submitted 2 hours ago
                </CardDescription>
              </div>
              <Badge className="bg-green-50 text-green-600 hover:bg-green-100 border-none font-black uppercase tracking-widest text-[10px] py-1.5 px-3 rounded-full">
                Resolved
              </Badge>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
