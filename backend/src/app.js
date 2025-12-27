const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

app.use("/api/leads", require("./routes/lead.routes"));
app.use("/api/demos", require("./routes/demo.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));
module.exports = app;
