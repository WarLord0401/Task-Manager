// Home.jsx
import React, { useState } from "react";
import Form from "../components/Form";
import TaskList from "../components/TaskList";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (message, reminderTime, priority) => {
    setTasks([...tasks, { message, reminderTime, priority }]);
  };

  const removeTask = (message) => {
    setTasks(tasks.filter((task) => task.message !== message));
  };

  return (
    <div>
      <Form addTask={addTask} />
      <TaskList tasks={tasks} removeTask={removeTask} />
    </div>
  );
};

export default Home;
