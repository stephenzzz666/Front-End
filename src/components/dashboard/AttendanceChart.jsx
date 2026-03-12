// frontend/src/components/dashboard/AttendanceChart.jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function AttendanceChart({ students, schoolDays }) {
  // Mapping school days for the chart
  const data = schoolDays.map((day) => ({
    date: day.date,
    attendance: Math.floor(students.length * (0.85 + Math.random() * 0.15)), // Mocking realistic variation
  }));

  return (
    <div className="bg-transparent w-full h-full">
      <h2 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-4">Attendance Patterns</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          {/* Dark theme grid lines */}
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 10 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 10 }} 
          />
          
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid #1e293b', 
              borderRadius: '8px',
              color: '#f8fafc' 
            }}
            itemStyle={{ color: '#3b82f6', fontSize: '12px' }}
          />
          
          {/* Glowing Line Effect */}
          <Line 
            type="monotone" 
            dataKey="attendance" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4, stroke: '#0f172a' }}
            activeDot={{ r: 6, stroke: '#60a5fa', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}