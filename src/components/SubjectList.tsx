import { useState } from "react";
import subjects from "../data/subjects";
import SubjectCard from "./SubjectCard";

export default function SubjectList() {
  const [search, setSearch] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState<any>(null);

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      subject.title.toLowerCase().includes(search.toLowerCase()) ||
      subject.code.toLowerCase().includes(search.toLowerCase());

    const matchesSemester =
      semesterFilter === "All" || subject.semester === semesterFilter;

    return matchesSearch && matchesSemester;
  });

  return (
    <div>
      <h2>Subject Offerings</h2>

      <input
        type="text"
        placeholder="Search subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "5px", marginRight: "10px" }}
      />

      <select
        value={semesterFilter}
        onChange={(e) => setSemesterFilter(e.target.value)}
        style={{ padding: "5px" }}
      >
        <option value="All">All</option>
        <option value="1st Semester">1st Semester</option>
        <option value="2nd Semester">2nd Semester</option>
      </select>

      {filteredSubjects.map((subject) => (
        <div key={subject.id} onClick={() => setSelectedSubject(subject)}>
          <SubjectCard subject={subject} />
        </div>
      ))}

      {/* DETAILS */}
      {selectedSubject && (
        <div style={detailsStyle}>
          <h3>Subject Details</h3>
          <p>
            <strong>Code:</strong> {selectedSubject.code}
          </p>
          <p>
            <strong>Title:</strong> {selectedSubject.title}
          </p>
          <p>
            <strong>Units:</strong> {selectedSubject.units}
          </p>
          <p>
            <strong>Semester:</strong> {selectedSubject.semester}
          </p>
          <p>
            <strong>Program:</strong> {selectedSubject.program}
          </p>
          <p>
            <strong>Pre-requisites:</strong>{" "}
            {selectedSubject.prerequisites.length > 0
              ? selectedSubject.prerequisites.join(", ")
              : "None"}
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
