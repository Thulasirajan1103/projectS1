// AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5002/api/attendance"
        ); // Ensure this endpoint exists
        setAttendanceRecords(response.data);
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      }
    };

    fetchAttendanceRecords();
  }, []);

  const handleDeleteAttendance = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this attendance record?")
    ) {
      try {
        await axios.delete(`http://localhost:5002/api/attendance/${id}`);
        setAttendanceRecords((prevRecords) =>
          prevRecords.filter((record) => record.id !== id)
        );
      } catch (error) {
        console.error("Error deleting attendance record:", error);
      }
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.studentId}</td>
              <td>{record.date}</td>
              <td>{record.status}</td>
              <td>
                <button onClick={() => handleDeleteAttendance(record.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
