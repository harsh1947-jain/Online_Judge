

// import React, { useEffect, useState } from "react";

// export default function MySubmissions() {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?._id;

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         const res = await fetch(`http://localhost:8000/mysubmissions`);
//         const data = await res.json();

//         if (res.ok) {
//           setSubmissions(data);
//         } else {
//           setError(data.message || "Failed to fetch submissions.");
//         }
//       } catch (err) {
//         setError("Server error: " + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) fetchSubmissions();
//     else setError("User not logged in.");
//   }, [userId]);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-4 text-indigo-700">My Submissions</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : submissions.length === 0 ? (
//         <p>No submissions yet.</p>
//       ) : (
//         <table className="w-full bg-white shadow rounded">
//           <thead className="bg-indigo-100">
//             <tr>
//               <th className="py-2 px-4 text-left">Problem</th>
//               <th className="py-2 px-4 text-left">Language</th>
//               <th className="py-2 px-4 text-left">Verdict</th>
//               <th className="py-2 px-4 text-left">Submitted At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {submissions.map((sub) => (
//               <tr key={sub._id} className="border-t">
//                 <td className="py-2 px-4">{sub.problem?.title || "Unknown"}</td>
//                 <td className="py-2 px-4">{sub.language}</td>
//                 <td className={`py-2 px-4 font-medium ${sub.verdict === "Accepted" ? "text-green-600" : "text-red-500"}`}>
//                   {sub.verdict}
//                 </td>
//                 <td className="py-2 px-4 text-sm text-gray-600">
//                   {new Date(sub.createdAt).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";

export default function MySubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:8000/mysubmissions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setSubmissions(data);
        } else {
          setError(data.message || "Failed to fetch submissions.");
        }
      } catch (err) {
        setError("Server error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">My Submissions</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead className="bg-indigo-100">
            <tr>
              <th className="py-2 px-4 text-left">Problem</th>
              <th className="py-2 px-4 text-left">Language</th>
              <th className="py-2 px-4 text-left">Verdict</th>
              <th className="py-2 px-4 text-left">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub._id} className="border-t">
                <td className="py-2 px-4">{sub.problem?.title || "Unknown"}</td>
                <td className="py-2 px-4">{sub.language}</td>
                <td
                  className={`py-2 px-4 font-medium ${
                    sub.verdict === "Accepted" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {sub.verdict}
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {new Date(sub.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
