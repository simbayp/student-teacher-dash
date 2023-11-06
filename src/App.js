import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudentProvider } from "./context/StudentContext";
import SharedContent from "./Helper/SharedContent";
import Dashboard from "./Pages/Dashboard/Dashboard";
import StudentProfile from "./Pages/Student-Profile/StudentProfile";

const App = () => {
  return (
    <StudentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedContent />}>
            <Route index element={<Dashboard />} />
            <Route path="students/:id" element={<StudentProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StudentProvider>
  );
};

export default App;
