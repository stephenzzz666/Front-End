import Dashboard from "./components/Dashboard";
import ProgramList from "./components/ProgramList";
import SubjectList from "./components/SubjectList";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>School Offerings System</h1>

      <Dashboard />

      <hr />

      <ProgramList />

      <hr />

      <SubjectList />
    </div>
  );
}
