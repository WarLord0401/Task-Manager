import { motion } from "framer-motion"; // Import Framer Motion
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Form from "../components/Form";
import TaskList from "../components/TaskList";

const Home = () => {
  const loadTasksFromLocalStorage = () => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  };

  const [tasks, setTasks] = useState(loadTasksFromLocalStorage());

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
      <Title
        as={motion.div} // Make Title a motion component
        initial={{ opacity: 0, y: -50 }} // Starting animation state
        animate={{ opacity: 1, y: 0 }} // End animation state
        transition={{ duration: 0.5 }} // Animation duration
      >
        <h1>TASK MANAGER</h1>
        <p>Add, Search, and Remove tasks as per your requirement.</p>
      </Title>

      <Form addTask={addTask} />
      <TaskList
        tasks={tasks}
        removeTask={removeTask}
        as={motion.div}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }, // Stagger animation for children
          },
        }}
      />
    </div>
  );
};

export default Home;

const Title = styled.div`
margin-top: 50px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

// Assume each tile within TaskList has motion settings
