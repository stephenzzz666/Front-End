import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      {/* Change the Fragment <> to a div with width classes */}
      <div className="min-h-screen w-full flex flex-col">
        <Navbar />
        <Dashboard />
      </div>
    </ProtectedRoute>
  }
/>

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;