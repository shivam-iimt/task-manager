const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
require("./config");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
const routes = require("./routes");
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
