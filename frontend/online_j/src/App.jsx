import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import LoginPage from "./LoginPage";    
import RegisterPage from "./RegisterPage";
import ProblemListPage from "./ProblemListPage";
import ProblemPage from "./ProblemPage";
import MySubmissionsPage from "./Mysubmission";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
         <Route path="/problemList" element={<ProblemListPage />} />
           <Route path="/problems/:id" element={<ProblemPage />} />
              <Route path="/submissions" element={<MySubmissionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
