import React, { useState, useRef, KeyboardEvent } from "react";
import { Play, Maximize2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const languageToCompilerId = {
  python: "python",
  cpp: "cpp17",
  php: "php",
  java: "java"
};

export interface Task {
  id: string;
  title: string;
  description: string;
  starterCode: Record<string, string>;
}

interface TabProps {
  task: Task;
  initialLanguage?: "python" | "cpp" | "php" | "java";
}

export const Tab: React.FC<TabProps> = ({ task, initialLanguage = "python" }) => {
  const [language, setLanguage] = useState(initialLanguage);
  const [code, setCode] = useState(task.starterCode[initialLanguage]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as "python" | "cpp" | "php" | "java");
    setCode(task.starterCode[lang]);
    setOutput("");
  };

  const handleTabKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newValue);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleRun = async () => {
    setIsLoading(true);
    setOutput('Running...');
    try {
      const compilerId = languageToCompilerId[language];
      const response = await fetch('https://onecompiler-apis.p.rapidapi.com/api/v1/run', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': 'onecompiler-apis.p.rapidapi.com'
        },
        body: JSON.stringify({
          language: compilerId,
          stdin: input,
          files: [{ name: 'main', content: code }]
        })
      });
      const data = await response.json();
      setOutput(data.stdout?.trim() || data.stderr || data.error || 'No output received from the compiler');
    } catch (error: any) {
      setOutput(`Error executing code: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const content = (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-card rounded-2xl shadow-xl transition-all duration-300 w-full">
      <div className="flex-1 min-w-0">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-primary mb-1">{task.title}</div>
            <div className="text-sm text-muted-foreground mb-2">{task.description}</div>
          </div>
          <button
            onClick={() => setFullscreen(f => !f)}
            className="ml-2 p-2 rounded hover:bg-muted text-primary"
            aria-label={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {fullscreen ? <X className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground">Language:</span>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[110px] bg-muted text-primary border-none font-semibold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="python">PYTHON</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="php">PHP</SelectItem>
              <SelectItem value="java">JAVA</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea
          ref={textareaRef}
          value={code}
          onChange={e => setCode(e.target.value)}
          onKeyDown={handleTabKey}
          className="w-full min-h-[300px] font-mono text-base leading-relaxed tracking-wide bg-background border border-border focus:ring-2 focus:ring-primary rounded-lg text-foreground resize-none outline-none p-4 shadow-sm"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          placeholder="Write your code here..."
        />
      </div>
      <div className="w-full md:w-[340px] max-w-[400px] flex flex-col gap-4">
        <div>
          <div className="text-xs font-semibold text-muted-foreground mb-1">STDIN</div>
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full bg-background border border-border text-sm font-mono px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Input for the program (Optional)"
          />
        </div>
        <div>
          <div className="text-sm font-semibold text-primary mb-1">Output:</div>
          <div className="bg-background border border-border rounded-md px-3 py-2 min-h-[120px] font-mono text-sm text-foreground whitespace-pre-wrap">
            {output ? output : <span className="text-muted-foreground">Click on RUN button to see the output</span>}
          </div>
        </div>
        <button
          onClick={handleRun}
          disabled={isLoading}
          className="w-full h-12 mt-2 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" /> {isLoading ? 'Running...' : 'Run Code'}
        </button>
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="w-full max-w-6xl h-[90vh] flex items-center justify-center">
          <div className="w-full h-full overflow-auto flex items-center justify-center">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return content;
}; 