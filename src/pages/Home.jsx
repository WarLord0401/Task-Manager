import React, { useEffect, useState } from "react";
import Form from "../components/Form"; // Adjust as per your file structure
import TaskList from "../components/TaskList"; // Adjust as per your file structure

const Home = () => {
  // Load tasks from localStorage when the component first loads
  const loadTasksFromLocalStorage = () => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  };

  const [tasks, setTasks] = useState(loadTasksFromLocalStorage());

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); // This will run whenever tasks are updated

  const addTask = (message, reminderTime, priority) => {
    const newTask = { message, reminderTime, priority };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const removeTask = (taskMessage) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.message !== taskMessage)
    );
  };

  return (
    <div>
      <Form addTask={addTask} />
      <TaskList tasks={tasks} removeTask={removeTask} />
    </div>
  );
};

export default Home;
