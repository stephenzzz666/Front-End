import { useState } from "react";
import programs from "../data/programs";
import ProgramCard from "./ProgramCard";

export default function ProgramList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedProgram, setSelectedProgram] = useState<any>(null);

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(search.toLowerCase()) ||
      program.code.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || program.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h2>Program Offerings</h2>

      <input
        type="text"
        placeholder="Search program..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "5px", marginRight: "10px" }}
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{ padding: "5px" }}
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      {filteredPrograms.map((program) => (
        <div key={program.id} onClick={() => setSelectedProgram(program)}>
          <ProgramCard program={program} />
        </div>
      ))}

      {/* DETAILS SECTION */}
      {selectedProgram && (
        <div style={detailsStyle}>
          <h3>Program Details</h3>
          <p>
            <strong>Code:</strong> {selectedProgram.code}
          </p>
          <p>
            <strong>Name:</strong> {selectedProgram.name}
          </p>
          <p>
            <strong>Type:</strong> {selectedProgram.type}
          </p>
          <p>
            <strong>Duration:</strong> {selectedProgram.duration}
          </p>
          <p>
            <strong>Total Units:</strong> {selectedProgram.units}
          </p>
          <p>
            <strong>Status:</strong> {selectedProgram.status}
          </p>
        </div>
      )}
    </div>
  );
}

const detailsStyle: React.CSSProperties = {
  marginTop: "20px",
  padding: "15px",
  border: "2px solid black",
  borderRadius: "8px",
};
