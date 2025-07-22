const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// POST /api/task - Create a new task
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newTask = new Task(data);
    await newTask.save();
    console.log("Task saved");
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:priority", async (req, res) => {
  try {
    const priority = req.params.priority;
    if (priority === "high" || priority === "medium" || priority === "low") {
      const response = await Task.find({ priority });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid priority" });
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
    const response = await Task.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).send({ error: "Task not found" });
    }
    console.log("Task updated");
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Task.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).send({ error: "Task not found" });
    }
    console.log("Task deleted");
    res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
