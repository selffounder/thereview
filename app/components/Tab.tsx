import React, { useState, useRef, KeyboardEvent } from "react";
import { Play, Maximize2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea as ShadTextarea } from "@/components/ui/textarea";
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
  difficulty: string;
  testCases: {
    input: { arr: number[]; target: number };
    output: number;
    explanation: string;
  }[];
  hints: string[];
  starterCode: Record<string, string>;
}

interface TabProps {
  task: Task;
  initialLanguage?: "python" | "cpp" | "php" | "java";
  onComplete?: () => void;
  testCases: Task['testCases'];
}

export const Tab: React.FC<TabProps> = ({ task, initialLanguage = "python", onComplete, testCases }) => {
  const [language, setLanguage] = useState(initialLanguage);
  const [code, setCode] = useState(task.starterCode[initialLanguage]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; output: string }[]>([]);
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

  const getFileName = () => {
    switch (language) {
      case "python": return "main.py";
      case "cpp": return "main.cpp";
      case "php": return "main.php";
      case "java": return "Main.java";
      default: return "main";
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleRun();
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
          files: [{ name: getFileName(), content: code }]
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

  const runTests = async () => {
    setIsLoading(true);
    setTestResults([]);
    const results = [];

    for (const testCase of testCases) {
      try {
        const compilerId = languageToCompilerId[language];
        const testInput = JSON.stringify(testCase.input);
        const response = await fetch('https://onecompiler-apis.p.rapidapi.com/api/v1/run', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
            'X-RapidAPI-Host': 'onecompiler-apis.p.rapidapi.com'
          },
          body: JSON.stringify({
            language: compilerId,
            stdin: testInput,
            files: [{ name: getFileName(), content: code }]
          })
        });
        const data = await response.json();
        const output = data.stdout?.trim() || data.stderr || data.error || 'No output received';
        const passed = parseInt(output) === testCase.output;
        results.push({ passed, output });
      } catch (error: any) {
        results.push({ passed: false, output: `Error: ${error.message}` });
      }
    }

    setTestResults(results);
    setIsLoading(false);

    // If all tests passed, call onComplete
    if (results.every(r => r.passed) && onComplete) {
      onComplete();
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
        <ShadTextarea
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
          <div className="text-xs font-semibold text-muted-foreground mb-1">Test Cases</div>
          <div className="space-y-2">
            {testCases.map((testCase, index) => (
              <div key={index} className="p-3 bg-background border border-border rounded-md">
                <div className="text-sm font-medium mb-1">Test Case {index + 1}</div>
                <div className="text-xs text-muted-foreground mb-1">
                  Input: {JSON.stringify(testCase.input)}
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  Expected: {testCase.output}
                </div>
                {testResults[index] && (
                  <div className={`text-xs ${testResults[index].passed ? 'text-green-600' : 'text-red-600'}`}>
                    {testResults[index].passed ? '✓ Passed' : '✗ Failed'}
                    <div className="text-muted-foreground">Output: {testResults[index].output}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={runTests}
          disabled={isLoading}
          className="w-full h-12 mt-2 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" /> {isLoading ? 'Running Tests...' : 'Run Tests'}
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