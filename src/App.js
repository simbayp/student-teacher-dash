import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StudentProvider } from './contexts/StudentContext';
import SharedContent from './utils/SharedContent';
import Dashboard from './pages/dashboard/Dashboard';
import StudentProfile from './pages/student-profile/StudentProfile';

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
