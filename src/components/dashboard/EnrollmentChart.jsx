// frontend/src/components/dashboard/EnrollmentChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function EnrollmentChart({ students }) {
  const monthCounts = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "short" }),
    count: 0,
  }));

  students.forEach((student) => {
    const date = new Date(student.birthdate || student.created_at);
    const monthIndex = date.getMonth();
    monthCounts[monthIndex].count += 1;
  });

  return (
    <div className="bg-transparent w-full h-full">
      <h2 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-4">Monthly Enrollment</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={monthCounts} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          {/* Subtle grid lines that match the dark theme */}
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }} 
          />
          
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid #1e293b', 
              borderRadius: '8px',
              color: '#f8fafc' 
            }}
            itemStyle={{ color: '#3b82f6' }}
            cursor={{ fill: '#1e293b', opacity: 0.4 }}
          />
          
          {/* Bar with rounded corners and vibrant blue */}
          <Bar 
            dataKey="count" 
            fill="#3b82f6" 
            radius={[4, 4, 0, 0]} 
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}