const { Pool } = require("pg");

const PG_URI =
  "postgres://ttozzfip:Jml-H0FXtGe-k7pEcclQqpqsDCj9JEaE@fanny.db.elephantsql.com/ttozzfip";

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
