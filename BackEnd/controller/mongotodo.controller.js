const express = require("express");
const Tasks = require("../models/Mongotodo.models");

// Add task
async function addTodo(req, res) {
  try {
    const { task } = req.body;
    if (!task) return res.status(400).send({ message: "Task is required" });

    const newTodo = new Tasks({
      task,
      completed: false,
      createdAt: new Date().toISOString(),
    });

    await newTodo.save();
    return res.status(201).send({ message: "Task created successfully", newTodo });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
}

// Update task
async function updateTodo(req, res) {
  try {
    const updateId = req.params.id;
    const { completed } = req.body;

    const taask = await Tasks.findById(updateId);
    if (!taask) return res.status(404).send({ message: "Task not found" });

    taask.completed = completed;
    taask.completedAt = completed ? new Date().toISOString() : null;

    await taask.save();
    return res.status(200).send({ message: "Task updated successfully", taask });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
}

// Get all tasks
async function getTodo(req, res) {
  try {
    const allTask = await Tasks.find();
    return res.status(200).send({ message: "Tasks fetched", allTask });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
}

// Delete task
async function deleteTask(req, res) {
  try {
    const deleteId = await Tasks.findByIdAndDelete(req.params.id);
    if (!deleteId) return res.status(404).send({ message: "Task not found" });

    return res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
}

// Search task
async function searchName(req, res) {
  try {
    const { task } = req.query;
    const taskName = await Tasks.findOne({ task });
    if (!taskName) return res.status(404).send({ message: "Task not found" });

    return res.status(200).send({ message: "Task data fetched", taskName });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
}

module.exports = { addTodo, updateTodo, getTodo, deleteTask, searchName };
