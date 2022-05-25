const { Timestamp } = require("bson");
const { timeStamp } = require("console");
const db = require("./queries");

let currentList = "todoList";

const todoMaker = {};

todoMaker.createItem = (req, res, next) => {
  const tempQuery = `Insert Into ${currentList} (activity, date, input_date)
    Values ($1,$2,$3);`;
  let tempDate = new Date();
  const safeChar = [req.body.activity, req.body.date, tempDate];

  db.query(tempQuery, safeChar)
    .then((data) => {
      next();
    })
    .catch((err) => {
      next({
        log: "Error on createItem",
        message: { err: "An Error Occured" },
      });
    });
};
todoMaker.updateItem = (req, res, next) => {
  const tempQuery = `UPDATE ${currentList} SET activity = '${req.body.activity}', date = '${req.body.date}' WHERE id = '${req.body.id}' ;`;
  db.query(tempQuery)
    .then((data) => {
      next();
    })
    .catch((err) => {
      next({
        log: "Error on updateItem",
        message: { err: "An Error Occured" },
      });
    });
};

todoMaker.deleteItem = (req, res, next) => {
  const tempQuery = `DELETE FROM ${currentList} WHERE id='${req.body.id}';`;
  db.query(tempQuery)
    .then((data) => {
      next();
    })
    .catch((err) => {
      next({
        log: "Error on deleteItem",
        message: { err: "An Error Occured" },
      });
    });
};

todoMaker.reset = (req, res, next) => {
  const tempQuery = `DELETE FROM ${currentList};`;
  db.query(tempQuery)
    .then((data) => {
      next();
    })
    .catch((err) => {
      next({
        log: "Error on deleteItem",
        message: { err: "An Error Occured" },
      });
    });
};
// DO NOT FORGET TO EXPORT MIDDLEWARES
module.exports = todoMaker;
