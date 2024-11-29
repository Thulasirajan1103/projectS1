import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Form() {
  const navigate = useNavigate();

  // Define your state for form fields and loading status
  const [formData, setFormData] = useState({
    number: "",
    firstName: "",
    lastName: "",
    email: "",
    dept: "",
    year: "",
    gender: "",
    dob: "",
    file: null,
  });

  const [isEditMode, setIsEditMode] = useState(false);

  // Check if we are editing a pre-existing item from localStorage
  useEffect(() => {
    const editingItem = JSON.parse(localStorage.getItem("editingItem"));
    if (editingItem && editingItem.data) {
      setFormData({
        number: editingItem.data.number || "",
        firstName: editingItem.data.firstName || "",
        lastName: editingItem.data.lastName || "",
        email: editingItem.data.email || "",
        dept: editingItem.data.dept || "",
        year: editingItem.data.year || "",
        gender: editingItem.data.gender || "",
        dob: editingItem.data.dob || "",
        file: editingItem.data.file || null,
      });
      setIsEditMode(true);
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        // Update existing item
        const itemId = JSON.parse(localStorage.getItem("editingItem")).id;
        await axios.put(`http://localhost:5002/api/items/${itemId}`, {
          data: formData,
        });
      } else {
        // Create new item
        await axios.post("http://localhost:5002/api/items", { data: formData });
      }

      // Clear localStorage and navigate to the dashboard
      localStorage.removeItem("editingItem");
      navigate("/list");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Handle changes in form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0], // assuming a single file is uploaded
    }));
  };

  return (
    <div className="form-container">
      <h1>{isEditMode ? "Edit" : "Register"} Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Register No:</label>
          <br />
          <input
            type="text"
            className="input"
            name="number"
            value={formData?.number || ""} // Add fallback in case formData is undefined
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>First Name:</label>
          <br />
          <input
            type="text"
            className="input"
            name="firstName"
            value={formData?.firstName || ""} // Add fallback
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <br />
          <input
            type="text"
            className="input"
            name="lastName"
            value={formData?.lastName || ""} // Add fallback
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            className="input"
            name="email"
            value={formData?.email || ""} // Add fallback
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <br />
          <input
            type="text"
            className="input"
            name="dept"
            value={formData?.dept || ""} // Add fallback
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <br />
          <input
            type="text"
            className="input"
            name="year"
            value={formData?.year || ""} // Add fallback
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <br />
          <input
            type="text"
            className="input"
            name="gender"
            value={formData?.gender || ""} // Add fallback
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <br />
          <input
            type="date"
            name="dob"
            value={formData?.dob || ""} // Add fallback
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Marksheet (optional):</label>
          <br />
          <input type="file" name="file" onChange={handleFileChange} />
        </div>

        <button type="submit" className="submit">
          {isEditMode ? "Update" : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Form;
