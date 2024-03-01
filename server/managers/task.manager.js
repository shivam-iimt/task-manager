const TaskModel = require("../models/task.model");
const UserModel = require("../models/user.model");

const createTask = async (body, userId) => {
  try {
    body.createdBy = userId;
    let task = await TaskModel.create(body);
    let user = await UserModel.findOne(
      { _id: task.assignedTo },
      "fullName"
    ).lean();
    task = JSON.parse(JSON.stringify(task))
    if (user._id.toString() === userId.toString()) user.fullName = "Self";
    task.assignedTo = user.fullName;
    return { code: 201, data: { message: "Task created successfully", task } };
  } catch (error) {
    console.error(error);
    return { code: 500, data: "Internal Server Error" };
  }
};

const getAllTasks = async (body, userId) => {
  try {
    let tasks = await TaskModel.find({
      $or: [{ assignedTo: userId }, { createdBy: userId }],
    }).lean();

    tasks = await Promise.all(
      tasks.map(async (task) => {
        let user = await UserModel.findOne(
          { _id: task.assignedTo },
          "fullName"
        ).lean();
        if (user._id.toString() === userId.toString()) user.fullName = "Self";
        task.assignedTo = user.fullName;
        return task;
      })
    );
    return { code: 200, data: tasks };
  } catch (error) {
    console.error(error);
    return { code: 500, data: "Internal Server Error" };
  }
};

const getAssignedUsers = async (body, userId) => {
  try {
    let users = await UserModel.find({}, "fullName");
    users = users.map((user) => {
      if (user._id.toString() === userId.toString()) user.fullName = "Self";
      return user;
    });
    return { code: 200, data: users };
  } catch (error) {
    console.error(error);
    return { code: 500, data: "Internal Server Error" };
  }
};

const updateTask = async (body, userId) => {
  try {
    const task = await TaskModel.findOneAndUpdate(
      { _id: body._id },
      { $set: body },
      { new: true }
    ).lean();

    if (!task)
      return {
        code: 404,
        data: "Task not found",
      };
    let user = await UserModel.findOne(
      { _id: task.assignedTo },
      "fullName"
    ).lean();
    if (user._id.toString() === userId.toString()) user.fullName = "Self";
    task.assignedTo = user.fullName;
    return {
      code: 200,
      data: { task: task, message: "Task updated successfully" },
    };
  } catch (error) {
    console.error(error);
    return { code: 500, data: "Internal Server Error" };
  }
};

const deleteTask = async (taskId, userId) => {
  try {
    const deletedTask = await TaskModel.findOneAndDelete({ _id: taskId });

    if (!deletedTask)
      return {
        code: 404,
        data: "Task not found",
      };
    return {
      code: 200,
      data: "Task deleted successfully",
    };
  } catch (error) {
    console.error(error);
    return { code: 500, data: "Internal Server Error" };
  }
};

const getTaskData = async (taskId, userId) => {
  try {
    const taskData = await TaskModel.findOne({ _id: taskId });
    if (!taskData) return { code: 404, data: "Task not found" };
    return {
      code: 200,
      data: taskData,
    };
  } catch (error) {
    console.error(error);
    return { code: 500, data: "Internal Server Error" };
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getAssignedUsers,
  getTaskData,
};
