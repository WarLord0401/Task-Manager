import { motion } from "framer-motion"; // Import Framer Motion
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Form from "../components/Form";
import TaskList from "../components/TaskList";

const Home = () => {
  /** Storing and accessing Tasks from Local Storage */
  const loadTasksFromLocalStorage = () => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  };

  const [tasks, setTasks] = useState(loadTasksFromLocalStorage());
  const [reminder, setReminder] = useState(null); // Initialize reminder state

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

  const checkReminders = useCallback(() => {
    const now = new Date().toISOString();
    tasks.forEach((task) => {
      if (task.reminderTime && new Date(task.reminderTime) <= new Date(now)) {
        setReminder({
          title: task.title,
          message: task.message,
          priority: task.priority,
        });

        // Clear reminder message after 5 seconds
        setTimeout(() => {
          setReminder(null);
        }, 5000); // Clear the reminder after 5 seconds
      }
    });
  }, [tasks]); // Only recreate the function if 'tasks' change

  // Set an interval to check reminders every minute
  useEffect(() => {
    const interval = setInterval(() => {
      checkReminders();
    }, 60000); // Check reminders every minute
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [checkReminders]);

  const removeTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const taskContainerRef = useRef(null);

  return (
    <div>
      {reminder && (
        <ReminderDiv priority={reminder.priority}>
          <h3>{reminder.title}</h3>
          <p>{reminder.message}</p>
        </ReminderDiv>
      )}
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

const ReminderDiv = styled.div`
  position: fixed;
  width: 100%;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) =>
    props.priority === "High"
      ? "#d9534f"
      : props.priority === "Medium"
      ? "#f0ad4e"
      : "#5cb85c"};
  padding: 10px;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  z-index: 1000;
`;

const Title = styled.div`
  margin-top: 50px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;
