import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./App.css";

function Attendance() {
  const { id } = useParams();
  const [attendance, setAttendance] = useState({});
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState({
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedAttendance =
      JSON.parse(localStorage.getItem("attendance")) || {};
    setAttendance(storedAttendance[id] || {});
  }, [id]);

  const formatSelectedDate = () => {
    return `${selectedDate.day}/${selectedDate.month}/${selectedDate.year}`;
  };

  const handleAttendanceChange = (e) => {
    const status = e.target.value;
    setAttendance((prev) => ({
      ...prev,
      [formatSelectedDate()]: status,
    }));

    const allAttendance = JSON.parse(localStorage.getItem("attendance")) || {};
    allAttendance[id] = {
      ...allAttendance[id],
      [formatSelectedDate()]: status,
    };
    localStorage.setItem("attendance", JSON.stringify(allAttendance));

    setMessage(`Attendance updated to ${status} for ${formatSelectedDate()}`);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setSelectedDate((prevDate) => ({
      ...prevDate,
      [name]: parseInt(value),
    }));
  };

  return (
    <div className="attendance-container">
      <h1 className="attendance-title">Attendance for ID: {id}</h1>

      <div className="date-selector">
        <select name="day" value={selectedDate.day} onChange={handleDateChange}>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select
          name="month"
          value={selectedDate.month}
          onChange={handleDateChange}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select
          name="year"
          value={selectedDate.year}
          onChange={handleDateChange}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <option
              key={today.getFullYear() - i}
              value={today.getFullYear() - i}
            >
              {today.getFullYear() - i}
            </option>
          ))}
        </select>
      </div>

      <div className="attendance-options">
        <label>
          <input
            type="radio"
            value="Present"
            checked={attendance[formatSelectedDate()] === "Present"}
            onChange={handleAttendanceChange}
          />
          Present
        </label>
        <label>
          <input
            type="radio"
            value="Absent"
            checked={attendance[formatSelectedDate()] === "Absent"}
            onChange={handleAttendanceChange}
          />
          Absent
        </label>
      </div>

      {message && <p className="attendance-message">{message}</p>}

      <h2>Attendance Record:</h2>
      <ul className="attendance-record">
        {Object.entries(attendance).map(([date, status]) => (
          <li key={date}>
            {date}: {status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Attendance;
