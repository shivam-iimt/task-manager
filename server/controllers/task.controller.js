const TaskManager = require("../managers/task.manager");

exports.getAllTasks = function (request, response) {
  TaskManager.getAllTasks(request.query, request.userId)
    .then((result) => response.status(result.code).send(result.data))
    .catch((error) => response.status(500).send(error.message));
};

exports.getAssignedUsers = function (request, response) {
  TaskManager.getAssignedUsers(request.query, request.userId)
    .then((result) => response.status(result.code).send(result.data))
    .catch((error) => response.status(500).send(error.message));
};

exports.createTask = function (request, response) {
  TaskManager.createTask(request.body, request.userId)
    .then((result) => response.status(result.code).send(result.data))
    .catch((error) => response.status(500).send(error.message));
};

exports.updateTask = function (request, response) {
  TaskManager.updateTask(request.body, request.userId)
    .then((result) => response.status(result.code).send(result.data))
    .catch((error) => response.status(500).send(error.message));
};

exports.deleteTask = function (request, response) {
  TaskManager.deleteTask(request.params.taskId, request.userId)
    .then((result) => response.status(result.code).send(result.data))
    .catch((error) => response.status(500).send(error.message));
};

exports.getTaskData = function (request, response) {
  TaskManager.getTaskData(request.params.taskId, request.userId)
    .then((result) => response.status(result.code).send(result.data))
    .catch((error) => response.status(500).send(error.message));
};

