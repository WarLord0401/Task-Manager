import React, { useState } from "react";
import styled from "styled-components";

const Form = ({ addTask }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

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
      <div>
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
      <div>
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
      <Property>
        <div>
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
        </div>

        <div>
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
        </div>
      </Property>

      <Button type="submit">Add Task</Button>
    </FormContainer>
  );
};

export default Form;

// Styled Components
const FormContainer = styled.form`
  position: relative;
  width: 40vw;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Increased gap for better spacing between form elements */
  padding: 30px; /* Added more padding for a more spacious feel */
  background-color: #f8f9fa;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin: 40px auto; /* Increased margin for centering and spacing from the top */
`;

const Label = styled.label`
  font-size: 16px; /* Slightly increased font size */
  color: #333;
  margin-bottom: 8px; /* Increased bottom margin */
  display: block;
  font-weight: 600; /* Slightly bolder for better readability */
`;

const Property = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between; /* Ensures the elements are spaced apart */
  align-items: center; /* Vertically centers the child elements */
  margin-top: 15px; /* Added more spacing between fields */
  width: 100%;
  @media (max-width: 980px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Input = styled.input`
  width: 90%;
  padding: 14px; /* Added more padding for comfortable input */
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

const InputTime = styled(Input)`
  @media (max-width: 980px) {
    margin-bottom: 20px;
    width: 100px;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 14px; /* Increased padding for consistency */
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

const Button = styled.button`
  padding: 14px;
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
`;

const ErrorTile = styled.div`
  left: 30%;
  position: absolute; /* Position it absolutely within the container */
  transform: translateY(-50%); /* Center vertically */
  width: auto; /* Adjust width to content */
  padding: 12px 16px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  font-size: 14px; /* Increased font size for better readability */
  max-width: 100%;
  z-index: 10; /* Ensure it appears above other content */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow for better visibility */
`;

const ErrorTile2 = styled.div`
  top: 100%;
  right: -20%;
  position: absolute; /* Position it absolutely within the container */
  transform: translateY(-50%); /* Center vertically */
  width: auto; /* Adjust width to content */
  padding: 12px 16px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  font-size: 14px; /* Increased font size for better readability */
  max-width: 100%;
  z-index: 10; /* Ensure it appears above other content */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow for better visibility */
`;
