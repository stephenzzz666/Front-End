import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Use your existing API service or direct axios call
      const response = await axios.post("http://localhost:8000/api/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      {/* Background Glow Effect */}
      <div className="absolute w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full -top-10 -left-10"></div>
      <div className="absolute w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full -bottom-10 -right-10"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white tracking-tight italic">
              ACADEMIC<span className="text-blue-500">PORTAL</span>
            </h1>
            <p className="text-slate-400 text-sm mt-2 font-medium">IT15/L Final Project System</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded-xl mb-6 text-center font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input
                type="email"
                className="w-full bg-[#1e293b] border border-slate-700 text-white mt-1 p-4 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="admin@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <input
                type="password"
                className="w-full bg-[#1e293b] border border-slate-700 text-white mt-1 p-4 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-1 active:scale-95 mt-4"
            >
              SIGN IN
            </button>
          </form>

          <p className="text-center text-slate-500 text-[10px] mt-8 uppercase tracking-widest font-bold">
            Secure Access — IT15/L Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}