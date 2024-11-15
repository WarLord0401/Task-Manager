import { motion } from "framer-motion"; // Import Framer Motion
import React, { useEffect, useRef, useState } from "react";
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

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const removeTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const taskContainerRef = useRef(null);

  return (
    <div>
      <div
        style={{
          marginTop: 55,
          marginBottom: 5,
          padding: 5,
          paddingBottom: 50,
          backgroundColor: "#e4e2e2",
          borderRadius: 10,
          
        }}
      >
        <Title
          as={motion.div} // Make Title a motion component
          initial={{ opacity: 0, y: -50 }} // Starting animation state
          animate={{ opacity: 1, y: 0 }} // End animation state
          transition={{ duration: 0.5 }} // Animation duration
        >
          <h1>TASK MANAGER</h1>
          <p>Add, Search, and Remove tasks as per your requirement.</p>
        </Title>
        <Form
          taskContainerRef={taskContainerRef}
          addTask={(task) => addTask(task)}
        />
      </div>
      <div>
        <TaskList
          tasks={tasks}
          taskContainerRef={taskContainerRef}
          removeTask={removeTask}
          as={motion.div}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        />
      </div>
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
