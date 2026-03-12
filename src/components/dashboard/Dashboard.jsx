import { useState, useEffect } from "react";
import WeatherWidget from "../weather/WeatherWidget";
import EnrollmentChart from "./EnrollmentChart";
import CourseDistributionChart from "./CourseDistributionChart";
import AttendanceChart from "./AttendanceChart";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorBoundary from "../common/ErrorBoundary";
import api from "../../services/api";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [schoolDays, setSchoolDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const [studentsRes, coursesRes, schoolDaysRes] = await Promise.all([
          api.get("/students"),
          api.get("/courses"),
          api.get("/school-days")
        ]);
        setStudents(studentsRes.data);
        setCourses(coursesRes.data);
        setSchoolDays(schoolDaysRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please check your backend connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredStudents = students.filter(s => 
    `${s.first_name} ${s.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredStudents.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(filteredStudents.length / recordsPerPage);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-10 text-center text-red-400 font-bold bg-slate-950 min-h-screen">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#020617] text-slate-200">
      
      <main className="flex-1 p-4 md:p-8 space-y-8 w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900/40 p-6 rounded-3xl border border-slate-800 backdrop-blur-md">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              School <span className="text-blue-500">Dashboard</span>
            </h1>
            <p className="text-slate-400 font-medium">Academic Year 2025-2026 Overview</p>
          </div>
          <div className="bg-slate-800/50 p-1 rounded-2xl border border-slate-700">
            <WeatherWidget city="Manila" />
          </div>
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ErrorBoundary>
            <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 hover:border-blue-900/50 transition-colors shadow-2xl">
              <h3 className="text-blue-400 font-bold mb-4 uppercase text-xs tracking-widest">Enrollment Trends</h3>
              <EnrollmentChart students={students} />
            </div>
          </ErrorBoundary>
          <ErrorBoundary>
            <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 hover:border-blue-900/50 transition-colors shadow-2xl">
              <h3 className="text-blue-400 font-bold mb-4 uppercase text-xs tracking-widest">Course Distribution</h3>
              <CourseDistributionChart students={students} courses={courses} />
            </div>
          </ErrorBoundary>
        </div>
        
        <ErrorBoundary>
          <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 hover:border-blue-900/50 transition-colors shadow-2xl">
            <h3 className="text-blue-400 font-bold mb-4 uppercase text-xs tracking-widest">Student Attendance Analytics</h3>
            <AttendanceChart students={students} schoolDays={schoolDays} />
          </div>
        </ErrorBoundary>

        {/* Student List Table Section */}
        <div className="bg-slate-900/60 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/20">
            <h2 className="text-xl font-bold text-white">Student Directory</h2>
            <div className="relative w-full md:w-96">
              <input 
                type="text" 
                placeholder="Search records..." 
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-5 py-3 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-950/50 text-blue-400 uppercase text-[11px] tracking-[0.2em] font-black">
                  <th className="px-6 py-5">Full Name</th>
                  <th className="px-6 py-5">Email Address</th>
                  <th className="px-6 py-5">Academic Course</th>
                  <th className="px-6 py-5 text-right">Birthdate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {currentRecords.map((s) => (
                  <tr key={s.id} className="hover:bg-blue-600/5 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-100 group-hover:text-blue-400 transition-colors">{s.first_name} {s.last_name}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{s.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black bg-blue-500/10 text-blue-500 border border-blue-500/20 uppercase">
                        {s.course?.name || "Unassigned"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm text-right tabular-nums">{s.birthdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="p-6 bg-slate-950/30 border-t border-slate-800 flex justify-between items-center">
            <p className="text-xs font-medium text-slate-500">
              Showing <span className="text-blue-400">{indexOfFirstRecord + 1}</span> - <span className="text-blue-400">{Math.min(indexOfLastRecord, filteredStudents.length)}</span> of {filteredStudents.length}
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-20 disabled:cursor-not-allowed border border-slate-700"
              >
                Back
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, nPages))}
                disabled={currentPage === nPages}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}