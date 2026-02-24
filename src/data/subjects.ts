const subjects = [
  {
    id: 1,
    code: "IT101",
    title: "Introduction to IT",
    units: 3,
    semester: "1st Semester",
    termType: "Semester",
    program: "BSIT",
    prerequisites: [],
  },
  {
    id: 2,
    code: "IT201",
    title: "Data Structures",
    units: 3,
    semester: "2nd Semester",
    termType: "Semester",
    program: "BSIT",
    prerequisites: ["IT101"],
  },
];

export default subjects;
