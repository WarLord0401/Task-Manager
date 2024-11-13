import React, { useState } from "react";
import styled from "styled-components";

const Form = ({ addTask }) => {
  const [title, setTitle] = useState(""); // New state for the title
  const [message, setMessage] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [priority, setPriority] = useState("");
  const [isTitleValid, setIsTitleValid] = useState(true); // Validation for title
  const [isMessageValid, setIsMessageValid] = useState(true);
  const [isReminderTimeValid, setIsReminderTimeValid] = useState(true);
  const [isPriorityValid, setIsPriorityValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!title) {
      setIsTitleValid(false);
      valid = false;
    }
    if (!message) {
      setIsMessageValid(false);
      valid = false;
    }
    if (!reminderTime) {
      setIsReminderTimeValid(false);
      valid = false;
    }
    if (!priority) {
      setIsPriorityValid(false);
      valid = false;
    }

    if (valid) {
      addTask(title, message, reminderTime, priority); // Include title in task
      setTitle("");
      setMessage("");
      setReminderTime("");
      setPriority("");
      setIsTitleValid(true);
      setIsMessageValid(true);
      setIsReminderTimeValid(true);
      setIsPriorityValid(true);
    } else {
      alert("Please completely fill all the fields!");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Enter task title" // Title input placeholder
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setIsTitleValid(true); // Reset validation on change
        }}
        isValid={isTitleValid}
      />
      <Input
        type="text"
        placeholder="Enter task message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          setIsMessageValid(true);
        }}
        isValid={isMessageValid}
      />
      <Property>
        <InputTime
          type="datetime-local"
          value={reminderTime}
          onChange={(e) => {
            setReminderTime(e.target.value);
            setIsReminderTimeValid(true);
          }}
          isValid={isReminderTimeValid}
        />
        <Select
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
            setIsPriorityValid(true);
          }}
          isValid={isPriorityValid}
        >
          <option value="" disabled>
            Priority
          </option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Select>
      </Property>
      <Button type="submit">Add Task</Button>
    </FormContainer>
  );
};

export default Form;

// Styled Components
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px;
  background-color: #f8f9fa;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin: 0 auto;
`;

const Property = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: ${(props) => (props.isValid ? "1px solid #ddd" : "1px solid red")};
  border-radius: 8px;
  box-shadow: ${(props) =>
    props.isValid ? "none" : "0px 0px 5px rgba(255, 0, 0, 0.3)"};
  outline: none;
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0px 4px 10px rgba(0, 123, 255, 0.2);
    border-color: #007bff;
  }
`;

const InputTime = styled.input`
  padding: 12px;
  font-size: 15px;
  width: 50%;
  border-radius: 8px;
  border: ${(props) => (props.isValid ? "1px solid #ddd" : "1px solid red")};
  box-shadow: ${(props) =>
    props.isValid ? "none" : "0px 0px 5px rgba(255, 0, 0, 0.3)"};
  outline: none;
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0px 4px 10px rgba(0, 123, 255, 0.2);
    border-color: #007bff;
  }
`;

const Select = styled.select`
  padding: 12px;
  width: 50%;
  border-radius: 8px;
  font-size: 15px;
  border: ${(props) => (props.isValid ? "1px solid #ddd" : "1px solid red")};
  box-shadow: ${(props) =>
    props.isValid ? "none" : "0px 0px 5px rgba(255, 0, 0, 0.3)"};
  outline: none;
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0px 4px 10px rgba(0, 123, 255, 0.2);
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 12px;
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
