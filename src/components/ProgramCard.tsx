type Program = {
  id: number;
  code: string;
  name: string;
  type: string;
  duration: string;
  units: number;
  status: string;
};

type Props = {
  program: Program;
};

export default function ProgramCard({ program }: Props) {
  return (
    <div style={cardStyle}>
      <h3>{program.code}</h3>
      <p>{program.name}</p>
      <p>Type: {program.type}</p>
      <p>Duration: {program.duration}</p>
      <p>Total Units: {program.units}</p>
      <p>Status: {program.status}</p>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  border: "1px solid gray",
  padding: "10px",
  margin: "10px",
  borderRadius: "8px",
};
