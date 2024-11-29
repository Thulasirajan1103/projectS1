import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

function ItemList() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // Load stored items from localStorage initially
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);

  // Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/items");

        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  // Handle edit action
  const handleEdit = (item) => {
    localStorage.setItem("editingItem", JSON.stringify(item));
    navigate("/form");
  };

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedItems = items.filter((item) => item.id !== id);
      localStorage.setItem("items", JSON.stringify(updatedItems));
      setItems(updatedItems); // Update the local state

      try {
        await axios.delete(`http://localhost:5002/api/items/${id}`);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  // Handle attendance action
  const handleAttendance = (id) => {
    navigate(`/attendance/${id}`);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {items.length === 0 ? (
        <p>No items to display.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>REGISTER NO</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>DEPARTMENT</th>
              <th>YEAR</th>
              <th>GENDER</th>
              <th>DOB</th>
              <th>MARKSHEET</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item?.data?.number}</td>
                <td>{item?.data?.firstName || "No first name"}</td>
                <td>{item?.data?.lastName || "No last name"}</td>
                <td>{item?.data?.email || "No email"}</td>
                <td>{item?.data?.dept || "No department"}</td>
                <td>{item?.data?.year || "No year"}</td>
                <td>{item?.data?.gender || "No gender"}</td>
                <td>{item?.data?.dob || "No DOB"}</td>
                <td>
                  {item?.data?.file ? (
                    <a
                      href={item.data.file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.data.file.name}
                    </a>
                  ) : (
                    "No file"
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleAttendance(item.id)}
                    className="attendance"
                  >
                    View Attendance
                  </button>
                </td>
                <td>
                  <button onClick={() => handleEdit(item)} className="edit">
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ItemList;
