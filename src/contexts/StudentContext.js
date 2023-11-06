import { createContext, useState } from "react";

const StudentContext = createContext("");

export const StudentProvider = ({ children }) => {
  const [studentName, setStudentName] = useState("Admin");
  const [isEdit, setIsEdit] = useState(false);
  const [tableData, setTableData] = useState({
    name: "",
    class: "",
    teacher: "",
    attendence: "",
  });
  const [editMarks, setEditMarks] = useState({
    Hindi: 0,
    English: 0,
    Maths: 0,
    Science: 0,
    Social: 0,
    Computer: 0,
  });

  return (
    <StudentContext.Provider
      value={{
        studentName,
        setStudentName,
        isEdit,
        setIsEdit,
        editMarks,
        setEditMarks,
        tableData,
        setTableData,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContext;
