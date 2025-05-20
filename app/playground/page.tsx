"use client"

import React from "react";
import { Header } from "@/app/components/Header";
import { useState } from "react";
import Editor from "react-simple-code-editor";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";

// Supported languages and templates
const languageTemplates = {
  python: `print('Hello, World!')`,
  cpp: `#include <iostream>\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  php: `<?php\necho "Hello, World!";`,
  javascript: `console.log('Hello, World!');`
};

const languageToCompilerId = {
  python: "python",
  cpp: "cpp",
  php: "php",
  java: "java",
  javascript: "nodejs"
};

const languageToFileName = {
  python: "main.py",
  cpp: "main.cpp",
  php: "main.php",
  java: "Main.java",
  javascript: "main.js"
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
  const { theme } = useTheme();

  // Handle tab switching
  const handleTabChange = (lang: Language) => {
    setLanguage(lang);
    setCode(languageTemplates[lang]);
    setOutput("");
    setInput("");
  };

  // Run with Ctrl+Enter
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

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
      const fileName = languageToFileName[language];
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
          files: [{ name: fileName, content: code }]
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

  const getFileName = () => languageToFileName[language];

  // Visual line numbers (not functional, just for look)
  const getLineNumbers = () => {
    return Array.from({ length: Math.max(8, code.split("\n").length) }, (_, i) => i + 1).join("\n");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-muted/60 to-emerald-50">
      <Header />
      {/* Top bar: Tabs (left), Title (center), Language dropdown + Run (right) */}
      <div className="w-full flex items-center justify-between px-4 py-2 bg-[#f7f7f9] dark:bg-gray-900 border-b border-[#e5e7eb] dark:border-green-800 rounded-t-2xl shadow-sm transition-colors duration-300">
        {/* Tabs */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-white dark:bg-gray-800 border-b-2 border-blue-500 dark:border-green-400 rounded-t font-mono text-sm text-[#3b3b3b] dark:text-green-200 shadow-sm transition-colors duration-300">{getFileName()}</div>
          <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#ececec] dark:hover:bg-gray-800 text-xl font-bold text-[#888] dark:text-green-300 cursor-pointer transition-colors duration-300" title="New file" onClick={handleNew}>+</button>
        </div>
        {/* Title */}
        <div className="flex-1 text-center">
          <span className="text-lg font-semibold text-[#5b5fc7] dark:text-green-300 tracking-wide transition-colors duration-300">Beta</span>
        </div>
        {/* Language dropdown and Run button */}
        <div className="flex items-center gap-2">
          <select value={language} onChange={e => handleTabChange(e.target.value as Language)} className="px-3 py-1 rounded bg-primary dark:bg-green-700 text-white font-bold text-sm focus:outline-none shadow transition-colors duration-300">
            {Object.keys(languageTemplates).map((lang) => (
              <option key={lang} value={lang}>{languageLabels[lang as Language]}</option>
            ))}
          </select>
          <button onClick={handleRun} disabled={isLoading} className="px-4 py-1 rounded bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-700 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-base ml-2 shadow transition-all duration-150" style={{ minWidth: 70 }}>
            RUN
          </button>
        </div>
      </div>
      <div className="flex flex-row w-full flex-1 rounded-b-2xl shadow-2xl border border-border dark:border-green-800 bg-card dark:bg-gray-900 overflow-hidden transition-colors duration-300">
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-800" style={{ minWidth: 0 }}>
          <div className="flex flex-row h-full">
           
            <pre className="select-none text-xs text-[#b0b0b0] dark:text-green-400 bg-[#f7f7f9] dark:bg-gray-900 py-4 px-3 border-r border-[#e5e7eb] dark:border-green-800 min-w-[2.5rem] text-right font-mono rounded-bl-2xl transition-colors duration-300" style={{ fontFamily: 'var(--font-jetbrains-mono)', userSelect: 'none', height: '100%' }}>
              {getLineNumbers()}
            </pre>
            {/* Code editor */}
            <div className="w-full h-full" style={{ display: 'flex', alignItems: 'stretch' }}>
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={code => code}
                padding={18}
                tabSize={4}
                style={{
                  fontFamily: 'var(--font-jetbrains-mono)',
                  fontSize: 16,
                  background: theme === 'dark' ? '#101418' : '#fff',
                  color: theme === 'dark' ? '#e5e7eb' : '#23272e',
                  minHeight: '100%',
                  outline: 'none',
                  width: '100%',
                  border: 'none',
                  resize: 'none',
                  transition: 'background 0.3s, color 0.3s',
                }}
                className="bg-white dark:bg-gray-800 text-[#23272e] dark:text-green-100 transition-colors duration-300"
              />
            </div>
          </div>
        </div>
        <div className="w-[420px] max-w-[480px] flex flex-col border-l border-[#e5e7eb] dark:border-green-800 bg-[#fafbfc] dark:bg-gray-900 p-6 gap-6 transition-colors duration-300" style={{ minHeight: '100%' }}>
          <div>
            <div className="text-xs font-bold text-[#888] dark:text-green-300 mb-1 tracking-wide uppercase transition-colors duration-300">STDIN</div>
            <Textarea
              value={input}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
              className="w-full min-h-[50px] font-mono bg-white dark:bg-gray-800 border border-[#e5e7eb] dark:border-green-800 text-base px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#4f5bd5]/40 dark:focus:ring-green-700 resize-y shadow-sm transition-colors duration-300"
              style={{ fontFamily: 'var(--font-jetbrains-mono)', color: '#23272e' }}
              placeholder="Input for your program (optional)"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-[#888] dark:text-green-300 mb-1 tracking-wide uppercase transition-colors duration-300">Output:</div>
            <div className="border border-[#e5e7eb] dark:border-green-800 rounded px-4 py-3 min-h-[100px] font-mono text-base bg-white dark:bg-gray-800 text-[#23272e] dark:text-green-100 whitespace-pre-wrap shadow-inner transition-colors duration-300" style={{ maxHeight: 220, overflow: 'auto' }}>
              {output ? output : <span className="text-[#b0b0b0] dark:text-green-400">Click on <b>RUN</b> button to see the output</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
