import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 p-4 px-8 flex justify-between items-center sticky top-0 z-50">
      {/* Logo Section with Blue Gradient */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
          <span className="text-white font-black text-xs">AP</span>
        </div>
        <h1 className="text-xl font-black tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent uppercase">
          Academic <span className="text-blue-500">Portal</span>
        </h1>
      </div>
      
      {/* Action Section */}
      <div className="flex items-center gap-6">
        <span className="hidden md:block text-xs font-bold text-slate-500 uppercase tracking-widest">
          Administrator
        </span>
        <button 
          onClick={handleLogout}
          className="bg-slate-800 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 border border-slate-700 px-5 py-2 rounded-xl transition-all text-slate-300 text-xs font-black uppercase tracking-wider"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}