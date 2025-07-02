
// import React from "react";
// import { Link } from "react-router-dom";

// const problems = [
//   { id: 1, title: "Two Sum" },
//   { id: 2, title: "Print Hello World" },
// ];

// export default function ProblemListPage() {
//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Problem List</h2>
//       <div className="max-w-2xl mx-auto bg-white rounded shadow p-4 space-y-4">
//         {problems.map((problem) => (
//           <Link
//             to={`/problems/${problem.id}`}
//             key={problem.id}
//             className="block px-4 py-3 border rounded hover:bg-blue-50 transition text-lg font-medium text-blue-800"
//           >
//             {problem.title}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const problems = [
  { id: 1, title: "Two Sum" },
  { id: 2, title: "Print Hello World" },
];

export default function ProblemListPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Problem List</h2>

      {/* My Submissions button */}
      <div className="max-w-2xl mx-auto mb-4 text-right">
        <button
          onClick={() => navigate("/mysubmissions")}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          My Submissions
        </button>
      </div>

      {/* Problem list */}
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-4 space-y-4">
        {problems.map((problem) => (
          <Link
            to={`/problems/${problem.id}`}
            key={problem.id}
            className="block px-4 py-3 border rounded hover:bg-blue-50 transition text-lg font-medium text-blue-800"
          >
            {problem.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
