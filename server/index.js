const express = require("express");
const cors = require("cors");
const json = require("../client/src/data.json");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const { response } = require("express");
app.disable("etag");

app.use(cors());
app.use(bodyParser.json());

// Difference between require and import?
const PORT = process.env.PORT || 3001;

const getJsonData = () => {
  return fs.readFileSync("./client/src/data.json", "utf-8");
};

app.put("/put", (req, res) => {
  let existingJson = getJsonData();
  existingJson = JSON.parse(existingJson);
  let newTodos = existingJson.todos;

  // let parsedBody = JSON.parse(req.body);
  //newTodos[parsedBody.text].done = !newTodos[parsedBody.text].done;
  newTodos.forEach((todo, index) => {
    if (todo.text === req.body.text) {
      newTodos[index].done = req.body.done;
    }
  });

  existingJson.todos = newTodos;
  existingJson = JSON.stringify(existingJson);

  fs.writeFile("./client/src/data.json", existingJson, (err, data) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

//SHOULD BE USING IDS FOR FILTER HERE
app.delete("/delete", (req, res) => {
  let existingJson = getJsonData();
  existingJson = JSON.parse(existingJson);

  //Why does this work even though obj is a string in this case?
  const newTodos = existingJson.todos.filter((obj) => {
    return obj.text !== req.body.text;
  });
  console.log(newTodos);

  existingJson.todos = newTodos;
  existingJson = JSON.stringify(existingJson);
  fs.writeFile("./client/src/data.json", existingJson, (err, data) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

app.post("/api/stuff", (req, res) => {
  let existingJson = getJsonData();
  existingJson = JSON.parse(existingJson);
  existingJson.todos.push(req.body);

  existingJson = JSON.stringify(existingJson);

  fs.writeFile("./client/src/data.json", existingJson, (err, data) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

app.get("/api", (req, res) => {
  res.send(getJsonData());
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
