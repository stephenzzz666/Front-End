// frontend/src/components/dashboard/CourseDistributionChart.jsx
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";

export default function CourseDistributionChart({ students, courses }) {
  const data = courses.map((course) => ({
    name: course.name,
    value: students.filter((s) => s.course_id === course.id).length,
  })).filter(item => item.value > 0); // Only show courses that have students

  // Professional color palette for Dark Mode
  const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#ec4899", "#f97316", "#10b981"];

  return (
    <div className="bg-transparent w-full h-full">
      <h2 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-4">Course Distribution</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie 
            data={data} 
            dataKey="value" 
            nameKey="name" 
            outerRadius={80} 
            innerRadius={60} // Turned it into a Donut chart for a more modern look
            paddingAngle={5}
            stroke="#0f172a" // Matches the card background
            strokeWidth={2}
            label={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid #1e293b', 
              borderRadius: '8px',
              color: '#f8fafc' 
            }}
            itemStyle={{ fontSize: '12px' }}
          />

          <Legend 
            verticalAlign="bottom" 
            height={36} 
            wrapperStyle={{ fontSize: '10px', color: '#94a3b8', paddingTop: '20px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}