"use client";

import Editor from "@monaco-editor/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function CodeEditor() {
  const [language, setLanguage] = useState("javascript");

  return (
    <div className="flex flex-col h-[600px] border rounded-md">
      <div className="flex items-center justify-between p-2 border-b bg-muted/20">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Language:</span>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px] h-8">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="css">CSS</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Editor
        height="100%"
        language={language}
        defaultValue="// Start coding..."
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
    </div>
  );
}
