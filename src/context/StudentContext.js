import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const StudentContext = createContext();

const initialStudents = [
  { id: uuidv4(), name: 'Aarav Sharma', email: 'aarav@edu.com', course: 'Computer Science', grade: 'A', year: '3rd Year', phone: '9876543210', avatar: 'AS', status: 'Active' },
  { id: uuidv4(), name: 'Priya Patel', email: 'priya@edu.com', course: 'Mathematics', grade: 'A+', year: '2nd Year', phone: '9123456789', avatar: 'PP', status: 'Active' },
  { id: uuidv4(), name: 'Rohan Mehta', email: 'rohan@edu.com', course: 'Physics', grade: 'B+', year: '1st Year', phone: '9988776655', avatar: 'RM', status: 'Active' },
  { id: uuidv4(), name: 'Sneha Gupta', email: 'sneha@edu.com', course: 'Chemistry', grade: 'A', year: '4th Year', phone: '9871234560', avatar: 'SG', status: 'Inactive' },
  { id: uuidv4(), name: 'Karan Singh', email: 'karan@edu.com', course: 'Biology', grade: 'B', year: '2nd Year', phone: '9765432108', avatar: 'KS', status: 'Active' },
  { id: uuidv4(), name: 'Ananya Joshi', email: 'ananya@edu.com', course: 'Engineering', grade: 'A+', year: '3rd Year', phone: '9654321087', avatar: 'AJ', status: 'Active' },
];

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');

  const addStudent = (student) => {
    setStudents(prev => [{ ...student, id: uuidv4() }, ...prev]);
  };

  const updateStudent = (id, updatedData) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <StudentContext.Provider value={{
      students, filteredStudents, searchQuery,
      setSearchQuery, addStudent, updateStudent, deleteStudent
    }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => useContext(StudentContext);