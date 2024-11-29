const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one item
router.get("/:id", getItem, (req, res) => {
  res.json(res.item);
});

// Create an item
router.post("/", async (req, res) => {
  const item = new Item({
    data: req.body.data,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an item
router.put("/:id", getItem, async (req, res) => {
  res.item.data = req.body.data || res.item.data;
  try {
    const updatedItem = await res.item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an item
router.delete("/:id", getItem, async (req, res) => {
  try {
    await res.item.remove();
    res.json({ message: "Deleted Item" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get item by ID
async function getItem(req, res, next) {
  let item;
  try {
    item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: "Cannot find item" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.item = item;
  next();
}

module.exports = router;
