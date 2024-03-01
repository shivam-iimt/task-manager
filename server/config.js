const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/";
const dbName = process.env.DB_NAME || "task-manager";

mongoose
  .connect(dbUrl,{dbName})
  .then(() => console.info(`Connection establised to ${dbName}`))
  .catch((err) =>
    console.error(`Could not connect to database: ${err.message}`)
  );
