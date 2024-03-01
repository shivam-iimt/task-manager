const express = require("express");
const router = express.Router({ caseSensitive: true });

router.use("/tasks", require("./task.routes"));
router.use("/authantication", require("./authantication.routes"));

module.exports = router;
