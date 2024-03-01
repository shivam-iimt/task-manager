import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import "../scss/TaskForm.scss";
const token = localStorage.getItem("token");
function TaskForm({ setTasks, setShow, taskData, setTaskData }) {
  const [users, setUsers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const getAssignedUsers = async () => {
    try {
      let res = await axios.get("/api/tasks/assigned-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setSelectedOptions([...selectedOptions, newOption]);
    setValue("tags", [...selectedOptions, newOption]);
  };

  const handleChange = (newValue) => {
    setSelectedOptions(newValue);
    setValue("tags", newValue);
  };

  useEffect(() => {
    getAssignedUsers();
  }, []);

  useEffect(() => {
    if (taskData) {
      setSelectedOptions(taskData?.tags || []);
      reset(taskData);
    }
  }, [taskData]);

  const onSubmit = async (data) => {
    try {
      data.tags = data.tags?.map((tag) => tag.value) || [];
      if (data._id) {
        const response = await axios.put(`/api/tasks/${data._id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === data._id ? response.data?.task : task
          )
        );
      } else {
        const response = await axios.post("/api/tasks", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks((prevTasks) => [...prevTasks, response.data?.task]);
      }
      setShow(false);
      reset({});
      setTaskData(null);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="task-form">
      <h2>Add New Task</h2>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <div className="col col-12">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                id="title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title.message}</div>
              )}
            </div>
            <div className="col col-12">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className={`form-control`}
                id="description"
                rows="3"
                {...register("description")}
              ></textarea>
            </div>
            <div className="col-md-6">
              <label htmlFor="tags" className="form-label">
                Tags
              </label>
              <CreatableSelect
                isMulti
                {...register("tags")}
                value={selectedOptions}
                onChange={handleChange}
                onCreateOption={handleCreate}
                options={selectedOptions}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                className={`form-control ${errors.status ? "is-invalid" : ""}`}
                id="status"
                {...register("status", { required: "Status is required" })}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              {errors.status && (
                <div className="invalid-feedback">{errors.status.message}</div>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <select
                className={`form-control ${
                  errors.priority ? "is-invalid" : ""
                }`}
                id="priority"
                {...register("priority", { required: "Priority is required" })}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              {errors.priority && (
                <div className="invalid-feedback">
                  {errors.priority.message}
                </div>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="assignedTo" className="form-label">
                Assigned To
              </label>
              <select
                className={`form-control ${
                  errors.assignedTo ? "is-invalid" : ""
                }`}
                id="assignedTo"
                {...register("assignedTo", {
                  required: "Assigned To is required",
                })}
              >
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.fullName}
                  </option>
                ))}
              </select>
              {errors.assignedTo && (
                <div className="invalid-feedback">
                  {errors.assignedTo.message}
                </div>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="dueDate" className="form-label">
                Due Date
              </label>
              <input
                type="date"
                className={`form-control ${errors.dueDate ? "is-invalid" : ""}`}
                id="dueDate"
                {...register("dueDate")}
              />
              {errors.dueDate && (
                <div className="invalid-feedback">{errors.dueDate.message}</div>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="completionDate" className="form-label">
                Completion Date
              </label>
              <input
                type="date"
                className={`form-control ${
                  errors.completionDate ? "is-invalid" : ""
                }`}
                id="completionDate"
                {...register("completionDate")}
              />
              {errors.completionDate && (
                <div className="invalid-feedback">
                  {errors.completionDate.message}
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              reset({});
              setShow(false);
            }}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
