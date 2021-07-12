const express = require("express");
const cors = require("cors");
const json = require("../client/src/data.json");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
app.use(cors());
app.use(bodyParser.json());

// Difference between require and import?
const PORT = process.env.PORT || 3001;

const getJsonData = () => {
  return fs.readFileSync("./client/src/data.json", "utf-8");
};

app.post("/api/stuff", async (req, res) => {
  let todo = {
    text: req.body.todoText,
    done: false,
  };
  console.log(todo.text);
  let existingJson = getJsonData();
  existingJson = JSON.parse(existingJson);
  existingJson.todos.push(todo);
  console.log(existingJson);
  existingJson = JSON.stringify(existingJson);
  console.log(existingJson);

  fs.writeFile("./client/src/data.json", existingJson, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File written successfully \n");
    }
  });
});

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
