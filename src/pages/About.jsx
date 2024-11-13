import React from "react";

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About the Task Manager</h1>
      <p style={styles.description}>
        This Task Manager app is designed to help you organize your tasks
        effectively. You can add, update, and delete tasks, as well as view a
        list of all your current tasks. It features a simple and user-friendly
        interface, making it easy to stay on top of your daily responsibilities.
      </p>
      <p style={styles.featuresTitle}>Key Features:</p>
      <ul style={styles.featuresList}>
        <li>Add new tasks quickly</li>
        <li>Edit and delete existing tasks</li>
        <li>View all tasks in a task list</li>
        <li>Sort tasks according to their priority</li>
        <li>Simple and responsive interface</li>
      </ul>
      <p style={styles.footer}>
        Developed with ❤️ by the Kanishk(developer). Visit the{" "}
        <a href="/" style={styles.link}>
          Home Page
        </a>{" "}
        to start managing your tasks!
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: "50px",
    maxWidth: "700px",
    margin: "0 auto",
    textAlign: "justify",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    color: "#555",
  },
  featuresTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
    marginTop: "20px",
  },
  featuresList: {
    textAlign: "left",
    margin: "0 auto",
    listStyleType: "disc",
    paddingLeft: "20px",
    fontSize: "1.1rem",
    color: "#555",
  },
  footer: {
    fontSize: "1rem",
    color: "#777",
    marginTop: "30px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default About;
