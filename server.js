// First thing, we will include express framework to use express method
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const todoMaker = require("./controller");
const path = require("path");
const PORT = 3000;
const cors = require("cors");
// you can use express.json() since bodyparser is an old version

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
// THIS PART IS NOT WORKING
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "index.html"));
// });

// THIS ONE TO BE DELETED
app.get("/todoList", (req, res) => {
  res.json({ info: "NOW U R ON PAGE" });
});
// Route handler to send all todoList to the frontend
app.get("/todoList/getData", todoMaker.getList, (req, res) => {
  res.status(200).json(res.locals.getList);
});

// Route handler for creating Item.
app.post("/todoList", todoMaker.createItem, (req, res) => {
  res.status(200).json("To-do List has been updated!");
});
app.patch("/todoList", todoMaker.updateItem, (req, res) => {
  res.status(200).json("To-do List has been updated!");
});

app.delete("/todoList/itemdelete", todoMaker.deleteItem, (req, res) => {
  res.status(200).json("Item has been deleted");
});

app.delete("/todoList", todoMaker.reset, (req, res) => {
  res.status(200).json("To-do List has been reseted");
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const defaultError = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occured" },
  };
  const errorObj = Object.assign({}, defaultError, err);
  return res.status(errorObj.status).json(errorObj.message);
});

// BECAREFUL, THIS LAST SCRIPT LISTEN THE SERVER U CANT USE "USE" HERE
app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}.`);
});
