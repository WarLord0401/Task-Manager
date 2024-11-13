import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const About = () => {
  return (
    <Container>
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About the Task Manager
      </Title>
      <Description
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        This Task Manager app is designed to help you organize your tasks
        effectively. You can add, update, and delete tasks, as well as view a
        list of all your current tasks. It features a simple and user-friendly
        interface, making it easy to stay on top of your daily responsibilities.
      </Description>
      <FeaturesTitle
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Key Features:
      </FeaturesTitle>
      <FeaturesList
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <li>Add new tasks quickly</li>
        <li>Edit and delete existing tasks</li>
        <li>View all tasks in a task list</li>
        <li>Sort tasks according to their priority</li>
        <li>Simple and responsive interface</li>
      </FeaturesList>
      <Footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        Developed with ❤️ by Kanishk (developer). Visit the{" "}
        <a href="/" style={{ color: "#007bff", textDecoration: "none" }}>
          Home Page
        </a>{" "}
        to start managing your tasks!
      </Footer>
    </Container>
  );
};

// Styled-components with framer-motion animations
const Container = styled.div`
  padding: 50px;
  max-width: 700px;
  margin: 0 auto;
  text-align: justify;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
`;

const FeaturesTitle = styled(motion.p)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
`;

const FeaturesList = styled(motion.ul)`
  text-align: left;
  margin: 0 auto;
  list-style-type: disc;
  padding-left: 20px;
  font-size: 1.1rem;
  color: #555;
`;

const Footer = styled(motion.p)`
  font-size: 1rem;
  color: #777;
  margin-top: 30px;
`;

export default About;
