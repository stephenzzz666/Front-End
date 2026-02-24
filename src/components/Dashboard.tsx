import programs from "../data/programs";
import subjects from "../data/subjects";

export default function Dashboard() {
  const totalPrograms = programs.length;
  const totalSubjects = subjects.length;

  const activePrograms = programs.filter((p) => p.status === "Active").length;

  const firstSemSubjects = subjects.filter(
    (s) => s.semester === "1st Semester"
  ).length;

  const secondSemSubjects = subjects.filter(
    (s) => s.semester === "2nd Semester"
  ).length;

  const subjectsWithPrereq = subjects.filter(
    (s) => s.prerequisites.length > 0
  ).length;

  const recentlyAdded = programs.slice(-1);

  return (
    <div>
      <h2>Dashboard</h2>

      <p>Total Programs: {totalPrograms}</p>
      <p>Total Subjects: {totalSubjects}</p>
      <p>Active Programs: {activePrograms}</p>

      <p>1st Semester Subjects: {firstSemSubjects}</p>
      <p>2nd Semester Subjects: {secondSemSubjects}</p>

      <p>Subjects with Pre-requisites: {subjectsWithPrereq}</p>

      <h4>Recently Added Program:</h4>
      {recentlyAdded.map((p) => (
        <p key={p.id}>{p.name}</p>
      ))}
    </div>
  );
}
