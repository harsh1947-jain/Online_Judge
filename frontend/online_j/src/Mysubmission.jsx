
import React, { useState } from "react";

export default function MySubmissionsPage() {
  // Initially empty
  const [submissions, setSubmissions] = useState([]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
        My Submissions
      </h2>

      {submissions.length === 0 ? (
        <div className="text-center mt-20 text-gray-500 text-lg">
          You haven't made any submissions yet.
        </div>
      ) : (
        <div className="overflow-x-auto max-w-4xl mx-auto bg-white rounded shadow">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4">Problem</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Language</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub.id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{sub.problem}</td>
                  <td
                    className={`py-2 px-4 ${
                      sub.status === "Accepted"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {sub.status}
                  </td>
                  <td className="py-2 px-4">{sub.language}</td>
                  <td className="py-2 px-4">{sub.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
