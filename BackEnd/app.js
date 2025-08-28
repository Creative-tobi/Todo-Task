const express = require("express");
const dotenv = require("dotenv");
const mongoTodo = require("./routes/mongotodo.routes");
const connectDB = require("./config/db");
const cors = require('cors');

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/db", mongoTodo);

app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});
