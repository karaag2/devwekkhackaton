"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TiptapEditor } from "@/components/collaboration/tiptap-editor";
import { CodeEditor } from "@/components/collaboration/code-editor";
import { Whiteboard } from "@/components/collaboration/whiteboard";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Code,
  PenTool,
  MessageSquare,
  Monitor,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store";
import { cn } from "@/lib/utils";

export default function WorkspacePage() {
  const params = useParams();
  const teamId = params.teamId as string;
  const [activeTab, setActiveTab] = useState("docs");
  const {
    workspaceFullScreen,
    toggleWorkspaceFullScreen,
    setWorkspaceFullScreen,
  } = useUIStore();

  React.useEffect(() => {
    return () => {
      setWorkspaceFullScreen(false);
    };
  }, [setWorkspaceFullScreen]);

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        workspaceFullScreen ? "h-screen p-6" : "h-[calc(100vh-4rem)]",
      )}
    >
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Workspace</h1>
          <p className="text-sm text-muted-foreground">
            Collaborate with your team in real-time.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleWorkspaceFullScreen}
            title={
              workspaceFullScreen ? "Exit Full Screen" : "Enter Full Screen"
            }
          >
            {workspaceFullScreen ? (
              <Minimize2 className="mr-2 h-4 w-4" />
            ) : (
              <Maximize2 className="mr-2 h-4 w-4" />
            )}
            {workspaceFullScreen ? "Exit Full Screen" : "Full Screen"}
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Team Chat
          </Button>
          <Button size="sm">
            <Monitor className="mr-2 h-4 w-4" />
            Live Share
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="docs"
        className="flex-1 flex flex-col"
        onValueChange={setActiveTab}
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="docs">
              <FileText className="mr-2 h-4 w-4" />
              Docs
            </TabsTrigger>
            <TabsTrigger value="whiteboard">
              <PenTool className="mr-2 h-4 w-4" />
              Whiteboard
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code className="mr-2 h-4 w-4" />
              Code
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="docs"
          className="flex-1 mt-4 border rounded-md p-4 bg-background"
        >
          <TiptapEditor />
        </TabsContent>

        <TabsContent value="whiteboard" className="flex-1 mt-4">
          <Whiteboard />
        </TabsContent>

        <TabsContent value="code" className="flex-1 mt-4">
          <CodeEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}
