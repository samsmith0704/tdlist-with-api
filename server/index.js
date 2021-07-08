const express = require("express");
const cors = require("cors");
const json = require("../client/src/data.json");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
  res.send(json.todos);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`Example app listening at http://localhost:${PORT}`);
// });
