type Subject = {
  id: number;
  code: string;
  title: string;
  units: number;
  semester: string;
  termType: string;
  program: string;
  prerequisites: string[];
};

type Props = {
  subject: Subject;
};

export default function SubjectCard({ subject }: Props) {
  return (
    <div style={cardStyle}>
      <h3>
        {subject.code} - {subject.title}
      </h3>
      <p>Units: {subject.units}</p>
      <p>Semester: {subject.semester}</p>
      <p>Program: {subject.program}</p>

      <p>
        Pre-requisites:{" "}
        {subject.prerequisites.length > 0
          ? subject.prerequisites.join(", ")
          : "None"}
      </p>

      <span style={badgeStyle}>{subject.termType}</span>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  border: "1px solid gray",
  padding: "10px",
  margin: "10px",
  borderRadius: "8px",
};

const badgeStyle: React.CSSProperties = {
  backgroundColor: "blue",
  color: "white",
  padding: "4px 8px",
  borderRadius: "5px",
};
