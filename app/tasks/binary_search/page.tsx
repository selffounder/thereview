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
    difficulty: "easy",
    testCases: [
      {
        input: { arr: [1, 2, 3, 4, 5], target: 3 },
        output: 2,
        explanation: "Target 3 is found at index 2"
      },
      {
        input: { arr: [1, 2, 3, 4, 5], target: 6 },
        output: -1,
        explanation: "Target 6 is not in the array"
      }
    ],
    hints: [
      "Start with two pointers: left and right",
      "Calculate the middle index using (left + right) // 2",
      "Compare the middle element with the target"
    ],
    starterCode: {
      python: `def binary_search(arr, target):\n    # Your code here\n    pass\n\ndef main():\n    import json\n    import sys\n    input_data = json.loads(sys.stdin.read())\n    result = binary_search(input_data["arr"], input_data["target"])\n    print(result)\n\nif __name__ == "__main__":\n    main()` ,
      cpp: `#include <iostream>\n#include <vector>\n#include <string>\n#include <nlohmann/json.hpp>\n\nusing json = nlohmann::json;\n\nint binarySearch(std::vector<int>& arr, int target) {\n    // Your code here\n    return -1;\n}\n\nint main() {\n    std::string input;\n    std::getline(std::cin, input);\n    auto data = json::parse(input);\n    std::vector<int> arr = data["arr"].get<std::vector<int>>();\n    int target = data["target"].get<int>();\n    std::cout << binarySearch(arr, target);\n    return 0;\n}` ,
      java: `import java.util.*;\nimport org.json.JSONObject;\nimport org.json.JSONArray;\n\npublic class Main {\n    public static int binarySearch(int[] arr, int target) {\n        // Your code here\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String input = scanner.nextLine();\n        JSONObject data = new JSONObject(input);\n        JSONArray arrJson = data.getJSONArray("arr");\n        int[] arr = new int[arrJson.length()];\n        for (int i = 0; i < arrJson.length(); i++) {\n            arr[i] = arrJson.getInt(i);\n        }\n        int target = data.getInt("target");\n        System.out.println(binarySearch(arr, target));\n    }\n}` ,
      php: `<?php\n\nfunction binarySearch($arr, $target) {\n    // Your code here\n    return -1;\n}\n\n$input = json_decode(file_get_contents('php://input'), true);\n$result = binarySearch($input['arr'], $input['target']);\necho $result;`
    }
  },
  {
    id: "first-occurrence",
    title: "First Occurrence",
    description: "Find the first occurrence of a target value in a sorted array with duplicates.",
    difficulty: "medium",
    testCases: [
      {
        input: { arr: [1, 2, 2, 2, 3, 4, 5], target: 2 },
        output: 1,
        explanation: "First occurrence of 2 is at index 1"
      },
      {
        input: { arr: [1, 1, 1, 1, 1], target: 1 },
        output: 0,
        explanation: "First occurrence of 1 is at index 0"
      }
    ],
    hints: [
      "When you find the target, don't return immediately",
      "Instead, continue searching in the left half",
      "Keep track of the last found index"
    ],
    starterCode: {
      python: `def first_occurrence(arr, target):\n    # Your code here\n    pass\n\ndef main():\n    import json\n    import sys\n    input_data = json.loads(sys.stdin.read())\n    result = first_occurrence(input_data["arr"], input_data["target"])\n    print(result)\n\nif __name__ == "__main__":\n    main()` ,
      cpp: `#include <iostream>\n#include <vector>\n#include <string>\n#include <nlohmann/json.hpp>\n\nusing json = nlohmann::json;\n\nint firstOccurrence(std::vector<int>& arr, int target) {\n    // Your code here\n    return -1;\n}\n\nint main() {\n    std::string input;\n    std::getline(std::cin, input);\n    auto data = json::parse(input);\n    std::vector<int> arr = data["arr"].get<std::vector<int>>();\n    int target = data["target"].get<int>();\n    std::cout << firstOccurrence(arr, target);\n    return 0;\n}` ,
      java: `import java.util.*;\nimport org.json.JSONObject;\nimport org.json.JSONArray;\n\npublic class Main {\n    public static int firstOccurrence(int[] arr, int target) {\n        // Your code here\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String input = scanner.nextLine();\n        JSONObject data = new JSONObject(input);\n        JSONArray arrJson = data.getJSONArray("arr");\n        int[] arr = new int[arrJson.length()];\n        for (int i = 0; i < arrJson.length(); i++) {\n            arr[i] = arrJson.getInt(i);\n        }\n        int target = data.getInt("target");\n        System.out.println(firstOccurrence(arr, target));\n    }\n}` ,
      php: `<?php\n\nfunction firstOccurrence($arr, $target) {\n    // Your code here\n    return -1;\n}\n\n$input = json_decode(file_get_contents('php://input'), true);\n$result = firstOccurrence($input['arr'], $input['target']);\necho $result;`
    }
  },
  {
    id: "rotated-array",
    title: "Search in Rotated Array",
    description: "Search for a target value in a rotated sorted array.",
    difficulty: "hard",
    testCases: [
      {
        input: { arr: [4, 5, 6, 7, 0, 1, 2], target: 0 },
        output: 4,
        explanation: "Target 0 is found at index 4 in the rotated array"
      },
      {
        input: { arr: [4, 5, 6, 7, 0, 1, 2], target: 3 },
        output: -1,
        explanation: "Target 3 is not in the rotated array"
      }
    ],
    hints: [
      "Find the pivot point where the array is rotated",
      "Determine which half of the array to search",
      "Use binary search on the appropriate half"
    ],
    starterCode: {
      python: `def search_rotated(arr, target):\n    # Your code here\n    pass\n\ndef main():\n    import json\n    import sys\n    input_data = json.loads(sys.stdin.read())\n    result = search_rotated(input_data["arr"], input_data["target"])\n    print(result)\n\nif __name__ == "__main__":\n    main()` ,
      cpp: `#include <iostream>\n#include <vector>\n#include <string>\n#include <nlohmann/json.hpp>\n\nusing json = nlohmann::json;\n\nint searchRotated(std::vector<int>& arr, int target) {\n    // Your code here\n    return -1;\n}\n\nint main() {\n    std::string input;\n    std::getline(std::cin, input);\n    auto data = json::parse(input);\n    std::vector<int> arr = data["arr"].get<std::vector<int>>();\n    int target = data["target"].get<int>();\n    std::cout << searchRotated(arr, target);\n    return 0;\n}` ,
      java: `import java.util.*;\nimport org.json.JSONObject;\nimport org.json.JSONArray;\n\npublic class Main {\n    public static int searchRotated(int[] arr, int target) {\n        // Your code here\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String input = scanner.nextLine();\n        JSONObject data = new JSONObject(input);\n        JSONArray arrJson = data.getJSONArray("arr");\n        int[] arr = new int[arrJson.length()];\n        for (int i = 0; i < arrJson.length(); i++) {\n            arr[i] = arrJson.getInt(i);\n        }\n        int target = data.getInt("target");\n        System.out.println(searchRotated(arr, target));\n    }\n}` ,
      php: `<?php\n\nfunction searchRotated($arr, $target) {\n    // Your code here\n    return -1;\n}\n\n$input = json_decode(file_get_contents('php://input'), true);\n$result = searchRotated($input['arr'], $input['target']);\necho $result;`
    }
  }
];

export default function CodeEditorPage() {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => new Set([...prev, taskId]));
  };

  const toggleHint = (taskId: string) => {
    setShowHints(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="w-full max-w-6xl mx-auto mt-8 flex flex-col gap-8">
        {binarySearchTasks.map(task => (
          <div key={task.id} className="relative">
            <div className="absolute -left-4 top-0">
              {completedTasks.has(task.id) ? (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
              )}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                task.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                task.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {task.difficulty.toUpperCase()}
              </span>
              <button
                onClick={() => toggleHint(task.id)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {showHints[task.id] ? 'Hide Hints' : 'Show Hints'}
              </button>
            </div>
            {showHints[task.id] && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">Hints:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {task.hints.map((hint, index) => (
                    <li key={index} className="text-sm text-gray-700">{hint}</li>
                  ))}
                </ul>
              </div>
            )}
            <Tab 
              task={task} 
              onComplete={() => handleTaskComplete(task.id)}
              testCases={task.testCases}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

