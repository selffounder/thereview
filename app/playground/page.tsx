"use client"

import { Header } from "@/app/components/Header";
import { useState } from "react";
import { Play, Plus, Terminal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Supported languages and templates
const languageTemplates = {
  python: `# Python\nprint('Hello, World!')`,
  cpp: `// C++\n#include <iostream>\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}`,
  java: `// Java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  php: `<?php\n// PHP\necho "Hello, World!";`,
  javascript: `// JavaScript\nconsole.log('Hello, World!');`
};

const languageToCompilerId = {
  python: "python",
  cpp: "cpp17",
  php: "php",
  java: "java",
  javascript: "nodejs"
};

const languageLabels = {
  python: "Python",
  cpp: "C++",
  php: "PHP",
  java: "Java",
  javascript: "JavaScript"
};

type Language = keyof typeof languageTemplates;

export default function PlaygroundPage() {
  const [language, setLanguage] = useState<Language>("python");
  const [code, setCode] = useState(languageTemplates.python);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as Language);
    setCode(languageTemplates[lang as Language]);
    setOutput("");
    setInput("");
  };

  const handleNew = () => {
    setCode(languageTemplates[language]);
    setInput("");
    setOutput("");
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

  const getFileName = () => {
    switch (language) {
      case "python": return "main.py";
      case "cpp": return "main.cpp";
      case "php": return "main.php";
      case "java": return "Main.java";
      case "javascript": return "main.js";
      default: return "main";
    }
  };

  // Visual line numbers (not functional, just for look)
  const getLineNumbers = () => {
    return Array.from({ length: Math.max(8, code.split("\n").length) }, (_, i) => i + 1).join("\n");
  };

  return (
    <div className="min-h-screen from-background via-muted/60 to-emerald-50 flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        <div className="w-full max-w-6xl flex-1 flex flex-col justify-center mx-auto py-8">
          <h1 className="text-4xl font-extrabold text-primary mb-2 text-center tracking-tight drop-shadow-sm">Playground</h1>
          <p className="text-lg text-muted-foreground mb-8 text-center">Experiment with code in your favorite language. Write, run, and see the output instantly.</p>
          <div className="flex flex-col md:flex-row gap-10 p-8 bg-card rounded-3xl shadow-2xl border border-border w-full min-h-[70vh] relative overflow-hidden">
            {/* Code Editor Section */}
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-[130px] h-10 bg-muted text-primary border-none font-bold shadow-md text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(languageTemplates).map((lang) => (
                        <SelectItem key={lang} value={lang} className="text-base font-semibold">{languageLabels[lang as Language]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <button
                    onClick={handleNew}
                    className="ml-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/80 border border-border flex items-center gap-2 text-base font-semibold shadow-md transition"
                    title="New file"
                  >
                    <Plus className="w-5 h-5" /> New
                  </button>
                </div>
              </div>
              <div className="relative flex flex-row bg-background rounded-2xl border border-border shadow-inner overflow-hidden">
                <pre className="select-none text-xs md:text-sm text-muted-foreground bg-muted/60 py-4 px-3 rounded-l-2xl border-r border-border min-w-[2.5rem] text-right font-mono" style={{fontFamily: 'var(--font-jetbrains-mono)'}}>
                  {getLineNumbers()}
                </pre>
                <Textarea
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  className="w-full min-h-[340px] font-mono text-base leading-relaxed tracking-wide bg-transparent border-none focus:ring-0 text-foreground resize-none outline-none p-4"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  placeholder="Write your code here..."
                />
              </div>
            </div>
            {/* Divider for large screens */}
            <div className="hidden md:block w-px via-border to-muted/0 rounded-full mx-2" />
            {/* Input/Output Section */}
            <div className="w-full md:w-[370px] max-w-[420px] flex flex-col gap-7">
              <div>
                <div className="text-xs font-bold text-muted-foreground mb-1 tracking-wide uppercase">STDIN</div>
                <Textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="w-full min-h-[70px] font-mono bg-background border border-border text-base px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-y shadow-sm"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  placeholder="Input for your program (optional)"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span className="text-base font-bold text-primary tracking-wide">Output</span>
                </div>
                <div className= "from-emerald-50 via-background to-muted/40 border border-border rounded-xl px-4 py-3 min-h-[120px] font-mono text-base text-foreground whitespace-pre-wrap shadow-inner">
                  {output ? output : <span className="text-muted-foreground">Click on <b>Run Code</b> to see the output</span>}
                </div>
              </div>
              <button
                onClick={handleRun}
                disabled={isLoading}
                className="w-full h-12 mt-2 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" /> {isLoading ? 'Running...' : 'Run Code'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 