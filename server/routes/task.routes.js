const router = require("express").Router();
const TaskController = require("../controllers/task.controller");
const { checkAuthorization } = require("../middlewares/userAutharization");

router.get("/assigned-users", checkAuthorization, TaskController.getAssignedUsers);
router.get("/", checkAuthorization, TaskController.getAllTasks);
router.post("/", checkAuthorization, TaskController.createTask);
router.put("/:taskId", checkAuthorization, TaskController.updateTask);
router.delete("/:taskId", checkAuthorization, TaskController.deleteTask);
router.get("/:taskId", checkAuthorization, TaskController.getTaskData);

module.exports = router;