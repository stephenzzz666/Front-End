// src/App.tsx
import React, { useState } from "react";
import Login from "./components/login";          // Your Login component
import Dashboard from "./components/Dashboard";  // Your existing Dashboard
import ProgramList from "./components/ProgramList"; // Your existing ProgramList
import SubjectList from "./components/SubjectList"; // Your existing SubjectList

export default function App() {
  // Track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>School Offerings System</h1>

      {/* Show Login only if not logged in */}
      {!isLoggedIn && <Login onLogin={() => setIsLoggedIn(true)} />}

      {/* Show other components only after login */}
      {isLoggedIn && (
        <>
          <Dashboard />
          <hr />
          <ProgramList />
          <hr />
          <SubjectList />
        </>
      )}
    </div>
  );
}