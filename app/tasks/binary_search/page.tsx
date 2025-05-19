"use client"

import { Header } from "@/app/components/Header";
import { useState, useRef, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Code, Terminal, X, Minus, Square, ZoomIn, ZoomOut } from "lucide-react";
import { Tab } from "@/app/components/Tab";

type Language = "python" | "cpp" | "php" | "java";

const languageTemplates: Record<Language, string> = {
  python: `# Write your Python code here
def main():
    # Your code here
    pass

if __name__ == "__main__":
    main()`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,
  php: `<?php
// Write your PHP code here
function main() {
    // Your code here
}

main();`,
  java: `public class Main {
    public static void main(String[] args) {
        // Your code here
    }
}`
};

const languageToCompilerId: Record<Language, string> = {
  python: "python",
  cpp: "cpp17",
  php: "php",
  java: "java"
};

const binarySearchTasks = [
  {
    id: "classic",
    title: "Classic Binary Search",
    description: "Given a sorted array and a target value, return the index if the target is found. If not, return -1.",
    starterCode: {
      python: `def binary_search(arr, target):\n    # Your code here\n    pass` ,
      cpp: `int binarySearch(vector<int>& arr, int target) {\n    // Your code here\n    return -1;\n}` ,
      java: `public int binarySearch(int[] arr, int target) {\n    // Your code here\n    return -1;\n}` ,
      php: `function binarySearch($arr, $target) {\n    // Your code here\n    return -1;\n}`
    }
  },
  {
    id: "first-occurrence",
    title: "First Occurrence",
    description: "Find the first occurrence of a target value in a sorted array with duplicates.",
    starterCode: {
      python: `def first_occurrence(arr, target):\n    # Your code here\n    pass` ,
      cpp: `int firstOccurrence(vector<int>& arr, int target) {\n    // Your code here\n    return -1;\n}` ,
      java: `public int firstOccurrence(int[] arr, int target) {\n    // Your code here\n    return -1;\n}` ,
      php: `function firstOccurrence($arr, $target) {\n    // Your code here\n    return -1;\n}`
    }
  },
  {
    id: "rotated-array",
    title: "Search in Rotated Array",
    description: "Search for a target value in a rotated sorted array.",
    starterCode: {
      python: `def search_rotated(arr, target):\n    # Your code here\n    pass` ,
      cpp: `int searchRotated(vector<int>& arr, int target) {\n    // Your code here\n    return -1;\n}` ,
      java: `public int searchRotated(int[] arr, int target) {\n    // Your code here\n    return -1;\n}` ,
      php: `function searchRotated($arr, $target) {\n    // Your code here\n    return -1;\n}`
    }
  }
];

export default function CodeEditorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="w-full max-w-6xl mx-auto mt-8 flex flex-col gap-8">
        {binarySearchTasks.map(task => (
          <Tab key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

