


import React, { useState } from "react";
import { useParams } from "react-router-dom";

const problemData = {
  1: {
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return  two numbers such that they add up to target.",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    example: `Input: nums = [2,7,11,15], target = 9
Output: [2,7]
Explanation: Because nums[0] + nums[1] == 9, we return [2,7].`,
  },
  2: {
    title: "Print Hello World",
    description: "Write a program that prints 'Hello World'.",
    constraints: [],
    example: `Output: Hello World`,
  },
};

export default function ProblemPage() {
  const { id } = useParams();
  const problem = problemData[id];

  const [code, setCode] = useState(`#include<iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}`);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRun = async () => {
    setLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await fetch("http://localhost:5000/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: "cpp",
          code,
          input,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setOutput(data.output || "✅ Code ran but no output returned.");
      } else {
        setError(data.error || "❌ Something went wrong.");
      }
    } catch (err) {
      setError("❌ Server Error: " + err.message);
    }

    setLoading(false);
  };

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError("");
//     setOutput("");

//     try {
//       const res = await fetch(`http://localhost:8000/submit/${encodeURIComponent(problem.title)}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           language: "cpp",
//           code,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         if (data.success) {
//           setOutput(data.message); // ✅ All test cases passed
//         } else {
//           // ❌ Show failed test cases in detail
//           const formatted = data.results.map((test, index) => {
//             return `Test Case ${index + 1}:
// Input:
// ${test.input}
// Expected Output:
// ${test.expected}
// Your Output:
// ${test.actual}
// Result: ${test.passed ? "✅ Passed" : "❌ Failed"}\n`;
//           }).join("\n");

//           setOutput(`${data.message}\n\n${formatted}`);
//         }
//       } else {
//         setError(data.error || "❌ Submission failed.");
//       }
//     } catch (err) {
//       setError("❌ Server Error: " + err.message);
//     }


//     setLoading(false);

   
//   };


const handleSubmit = async () => {
  setLoading(true);
  setError("");
  setOutput("");

  try {
    const res = await fetch(`http://localhost:8000/submit/${encodeURIComponent(problem.title)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: "cpp",
        code,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      if (data.success) {
        setOutput(data.message); // ✅ All test cases passed
      } else {
        const formatted = data.results.map((test, index) => {
          return `Test Case ${index + 1}:
Input:
${test.input}
Expected Output:
${test.expected}
Your Output:
${test.actual}
Result: ${test.passed ? "✅ Passed" : "❌ Failed"}\n`;
        }).join("\n");

        setOutput(`${data.message}\n\n${formatted}`);
      }


      const user = JSON.parse(localStorage.getItem("user")); // 👈 Get the user object from localStorage
const userId = user?._id; // or user.id based on your backend model

await fetch("http://localhost:8000/submission", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId, // 👈 Include userId in the request
    problemTitle: problem.title,
    code,
    language: "cpp",
    verdict: data.verdict || (data.success ? "Accepted" : "Wrong Answer")
  }),
});


    } else {
      setError(data.error || "❌ Submission failed.");
    }
  } catch (err) {
    setError("❌ Server Error: " + err.message);
  }

  setLoading(false);
};


  if (!problem) {
    return (
      <div className="text-center text-red-500 text-lg mt-20">
        Problem not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Left Panel */}
      <div className="lg:w-1/2 p-6 bg-white border-r border-gray-300 overflow-y-auto">
        <h1 className="text-2xl font-bold text-indigo-700 mb-4">{problem.title}</h1>

        <h2 className="font-semibold text-gray-800 mb-2">Description</h2>
        <p className="text-gray-700 mb-4 whitespace-pre-line">{problem.description}</p>

        <h2 className="font-semibold text-gray-800 mb-2">Example</h2>
        <pre className="bg-gray-100 text-sm p-3 rounded mb-4 overflow-x-auto">
          {problem.example}
        </pre>

        {problem.constraints.length > 0 && (
          <>
            <h2 className="font-semibold text-gray-800 mb-2">Constraints</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {problem.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Right Panel (Code Editor + Run) */}
      <div className="lg:w-1/2 p-6 flex flex-col bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Code Editor</h2>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here..."
          className="flex-grow border rounded p-3 font-mono text-sm resize-none bg-white"
          style={{ minHeight: "250px" }}
        ></textarea>

        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-1">Custom Input (optional)</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border rounded p-2 font-mono text-sm bg-white"
            placeholder="Enter custom input here"
            rows={3}
          ></textarea>
        </div>

        <div className="mt-4 flex gap-4">
          <button
            onClick={handleRun}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Running..." : "Run"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

        {/* Output Section */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-1">Output:</h3>
          <pre className="bg-black text-white p-4 rounded text-sm whitespace-pre-wrap min-h-[100px]">
            {error ? error : output}
          </pre>
        </div>
      </div>
    </div>
  );
}

