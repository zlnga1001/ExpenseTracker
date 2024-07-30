const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Root route for basic server check
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Dynamically load routes from the 'routes' directory
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

// Server start function
const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("Server is listening on port:", PORT);
  });
};

server();
