const express = require("express");
const {
  addTodo,
  updateTodo,
  getTodo,
  deleteTask,
  searchName,
} = require("../controller/mongotodo.controller");

const router = express.Router();

router.post("/create", addTodo);
router.put("/update/:id", updateTodo);
router.get("/all", getTodo);
router.delete("/delete/:id", deleteTask);
router.get("/search", searchName);

module.exports = router;
