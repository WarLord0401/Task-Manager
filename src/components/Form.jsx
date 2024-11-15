import React, { useState } from "react";
import styled from "styled-components";

const Form = ({ addTask, taskContainerRef }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [priority, setPriority] = useState("");

  const [errors, setErrors] = useState({
    title: false,
    message: false,
    reminderTime: false,
    priority: false,
  });

  const scrollToTasks = () => {
    /* used to scroll to tasks */

    if (taskContainerRef.current) {
      taskContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* Check if field is filled or not */

    setErrors({
      title: false,
      message: false,
      reminderTime: false,
      priority: false,
    });

    let isValid = true;
    const newErrors = {};

    if (!title) {
      isValid = false;
      newErrors.title = true;
    }
    if (!message) {
      isValid = false;
      newErrors.message = true;
    }
    if (!reminderTime) {
      isValid = false;
      newErrors.reminderTime = true;
    }
    if (!priority) {
      isValid = false;
      newErrors.priority = true;
    }

    setErrors(newErrors);

    if (isValid) {
      // Pass the task as a simple object without nested fields
      addTask({
        title,
        message,
        reminderTime,
        priority,
      });

      // Clear form fields after submission
      setTitle("");
      setMessage("");
      setReminderTime("");
      setPriority("");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {/* Enter Title of Task */}
      <div style={{ position: "relative" }}>
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <ErrorTile>Please enter a valid title.</ErrorTile>}
      </div>

      {/* Enter Message of Task */}

      <div style={{ position: "relative", marginTop: "15px" }}>
        <Label htmlFor="message">Task Message</Label>
        <Input
          id="message"
          type="text"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {errors.message && <ErrorTile>Please enter a valid message.</ErrorTile>}
      </div>

      {/* Enter Date & Priority of Task */}

      <Property>
        <Container>
          <Label htmlFor="reminderTime">Reminder Time</Label>
          <InputTime
            id="reminderTime"
            type="datetime-local"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
          />
          {errors.reminderTime && (
            <ErrorTile>Please select a valid reminder time.</ErrorTile>
          )}
        </Container>

        <Container>
          <Label htmlFor="priority">Priority</Label>
          <Select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="" disabled>
              Set Priority
            </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
          {errors.priority && (
            <ErrorTile2>Please select a priority.</ErrorTile2>
          )}
        </Container>
      </Property>

      {/* Buttons for Submission and Scroll */}
      <ButtonWrapper>
        <Button type="submit">Add Task</Button>
        <ViewButton type="button" onClick={scrollToTasks}>
          View Tasks
        </ViewButton>
      </ButtonWrapper>
    </FormContainer>
  );
};

export default Form;

// Styled Components
const FormContainer = styled.form`
  position: relative;
  width: 50%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  gap: 40px;
  padding: 40px;
  padding-right: 60px;
  background-color: #f8f9fa;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin: 40px auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Label = styled.label`
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
  display: block;
  font-weight: 600;
`;

const Input = styled.input`
  max-width: 100%;
  width: 97%;
  padding: 14px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  &:focus {
    box-shadow: 0px 4px 10px rgba(0, 123, 255, 0.2);
    border-color: #007bff;
  }
`;

const Property = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 15px;
  max-width: 100%;
  width: 97%;
  margin-bottom: 15px;
  gap: 50px;

  @media (max-width: 768px) {
    gap: 50px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const InputTime = styled.input`
  max-width: 100%;
  width: 100%;
  padding: 14px;
  margin-right: 1%;
  border-radius: 8px;
  color: #333;
  font-size: 16px;
  border: 1px solid #ddd;
  outline: none;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &:focus {
    box-shadow: 0px 4px 10px rgba(0, 123, 255, 0.2);
    border-color: #007bff;
  }
`;

const Select = styled.select`
  max-width: 100%;
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  border: 1px solid #ddd;
  outline: none;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  text-align: justify;
  &:focus {
    box-shadow: 0px 4px 10px rgba(0, 123, 255, 0.2);
    border-color: #007bff;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 100%;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Button = styled.button`
  max-width: 100%;
  width: 50%;
  padding: 14px;
  margin-right: 1%;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #004085;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    white-space: nowrap;
    padding: 10px;
    width: 100%;
  }
`;

const ViewButton = styled.button`
  max-width: 100%;
  width: 50%;
  margin-right: 0px;
  padding: 14px;
  font-size: 16px;
  color: #3c3c3c;
  background-color: #bbbbbb;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #2f2f2f;
    transform: translateY(-2px);
    color: #bbbbbb;
  }

  &:active {
    background-color: #004085;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    white-space: nowrap;
    width: 100%;
    padding: 10px;
  }
`;

const ErrorTile = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateY(4px);
  padding: 10px 14px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  font-size: 14px; /* Readable text */
  max-width: calc(100% - 10px);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  @media (max-width: 768px) {
    font-size: 12px;
    max-width: 100%;
  }
`;

const ErrorTile2 = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateY(4px);
  padding: 10px 14px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  font-size: 14px;
  max-width: calc(100% - 10px);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  z-index: 10;

  @media (max-width: 768px) {
    font-size: 12px;
    max-width: 100%;
  }
`;
