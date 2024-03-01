import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import "./scss/Home.scss";
const token = localStorage.getItem("token");

function Home() {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [taskData, setTaskData] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  const getTaskData = async (taskId) => {
    try {
      let res = await axios.get(`/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let taskData = {
        ...res.data,
        tags: res.data.tags.map((tag) => ({ label: tag, value: tag })),
        dueDate: new Date(res.data.dueDate).toISOString().split("T")[0],
        completionDate: new Date(res.data.completionDate)
          .toISOString()
          .split("T")[0],
      };
      setTaskData(taskData);
      setShow(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between m-5">
        <h1>Task Manager</h1>
        <div>
          <button
            className="btn btn-primary mr-1"
            type="button"
            onClick={() => setShow(true)}
          >
            Add New Task
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => {localStorage.removeItem("token"); window.location.reload();;}}
          >
            Log out
          </button>
        </div>
      </div>
      {!show && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S. no</th>
              <th scope="col">Title</th>
              <th scope="col">Priority</th>
              <th scope="col">Status</th>
              <th scope="col">Assigned To</th>
              <th scope="col">Tags</th>
              <th scope="col">Completion Date</th>
              <th scope="col">Action </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => (
              <tr>
                <th scope="row">{i + 1}</th>
                <td>{task.title}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>{task.assignedTo}</td>
                <td>
                  {task.tags?.length > 1 ? task.tags.join(", ") : task.tags}
                </td>
                <td>
                  {moment(task.completionDate).format("MM/DD/YYYY hh:mm A")}
                </td>
                <td>
                  <div className="">
                    <button
                      className="btn btn-primary me-md-1"
                      type="button"
                      onClick={() => getTaskData(task._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {show && (
        <TaskForm
          setTasks={setTasks}
          setShow={setShow}
          taskData={taskData}
          setTaskData={setTaskData}
        />
      )}
    </div>
  );
}

export default Home;
