import React, { useState } from "react";
import styled from "styled-components";

const Form = ({ addTask }) => {
  const [message, setMessage] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message && reminderTime) {
      addTask(message, reminderTime, priority);
      setMessage("");
      setReminderTime("");
      setPriority("");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Enter task message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Input
        type="datetime-local"
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
      />
      <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </Select>
      <Button type="submit">Add Task</Button>
    </FormContainer>
  );
};

export default Form;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;
