require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT;
const app = express();
const router = require("./routes/Router.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

require("./config/db.js");

app.use(router);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
