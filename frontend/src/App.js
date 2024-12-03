import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ItemForm from "./itemForm";
import ItemList from "./itemList";
import Layout from "./layout";
import Profile from "./home";
import Attendance from "./attendance.js";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);

  const addItem = (item) => {
    const newItem = { ...item, id: Date.now() };
    const newItems = [...items, newItem];
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  };

  const updateItem = (updatedItem) => {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setEditingItem(null);
  };

  const deleteItem = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
    localStorage.setItem("items", JSON.stringify(filteredItems));
  };

  const editItem = (item) => {
    setEditingItem(item);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/form"
            element={
              <ItemForm
                addItem={addItem}
                updateItem={updateItem}
                editingItem={editingItem}
              />
            }
          />
          <Route
            path="/list"
            element={
              <ItemList
                items={items}
                deleteItem={deleteItem}
                editItem={editItem}
              />
            }
          />
          <Route path="/attendance/:id" element={<Attendance />} />

          <Route path="/profile" element={<Profile />} />
         
          <Route path="/" element={<Navigate to="/list" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
