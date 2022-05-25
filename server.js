// First thing, we will include express framework to use express method
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const todoMaker = require("./controller");
const path = require("path");
const PORT = 3000;

// you can use express.json() since bodyparser is an old version
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// THIS PART IS NOT WORKING
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
// THIS ONE TO BE DELETED
app.get("/todoList", (req, res) => {
  res.json({ info: "NOW U R ON PAGE" });
});

// Route handler for creating Item.
app.post("/todoList", todoMaker.createItem, (req, res) => {
  res.status(200).send("To-do List has been updated!");
});
app.patch("/todoList", todoMaker.updateItem, (req, res) => {
  res.status(200).send("To-do List has been updated!");
});

app.delete("/todoList", todoMaker.deleteItem, (req, res) => {
  res.status(200).send("Item has been deleted");
});

app.delete("/todoList", todoMaker.reset, (req, res) => {
  res.status(200).send("To-do List has been reseted");
});

// BECAREFUL, THIS LAST SCRIPT LISTEN THE SERVER U CANT USE "USE" HERE
app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}.`);
});
