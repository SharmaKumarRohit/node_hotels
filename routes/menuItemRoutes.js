const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const menu = req.body; // Assuming the request body contains menu item data
    const menuItem = new MenuItem(menu); // Create a new menu item using the Mongoose model(schema)
    const response = await menuItem.save(); // Save the new menu item to the database
    console.log("Menu data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find(); // Use the Mongoose model to find all menu items in the database
    console.log("data fetched");
    res.status(200).json(data); // Send the list of menu items as a JSON response
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste === "sweet" || taste === "spicy" || taste === "sour") {
      const response = await MenuItem.find({ taste });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await MenuItem.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).send({ error: "Menu not found" });
    }
    console.log("data updated");
    res.status(200).send({ message: "Data updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await MenuItem.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).send({ error: "Menu not found" });
    }
    console.log("Menu deleted");
    res.status(200).send({ message: "Menu deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// comment added for testing purpose

module.exports = router;
