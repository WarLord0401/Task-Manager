import { motion } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

const TaskList = ({ tasks, removeTask }) => {
  const [sortedTasks, setSortedTasks] = useState(tasks);
  const [sortCriteria, setSortCriteria] = useState(""); // Default sorting by time ascending
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [showCompleted, setShowCompleted] = useState(false); // State to toggle Completed Tasks view
  const [completedTasks, setCompletedTasks] = useState([]); // State to store completed tasks

  // Handle task completion toggle
  const handleTaskCompletion = (taskId) => {
    setCompletedTasks((prev) => {
      const taskIndex = prev.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) {
        const task = tasks.find((task) => task.id === taskId);
        return [...prev, { ...task, completed: true }];
      } else {
        return prev.filter((task) => task.id !== taskId);
      }
    });
  };

  // Filter tasks by completed status
  const filteredTasks = useMemo(() => {
    const tasksToShow = showCompleted ? completedTasks : sortedTasks;
    return tasksToShow.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.priority.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [showCompleted, searchQuery, sortedTasks, completedTasks]);

  const sortByPriorityAsc = (a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  };

  const sortByPriorityDesc = (a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  };

  const sortByTimeAsc = (a, b) => {
    const timeA = new Date(a.reminderTime);
    const timeB = new Date(b.reminderTime);
    return timeA - timeB;
  };

  const sortByTimeDesc = (a, b) => {
    const timeA = new Date(a.reminderTime);
    const timeB = new Date(b.reminderTime);
    return timeB - timeA;
  };

  const handleSort = useCallback(
    (criteria) => {
      setSortCriteria(criteria);
      let sortedArray = [...tasks];

      switch (criteria) {
        case "priorityAsc":
          sortedArray.sort(sortByPriorityAsc);
          break;
        case "priorityDesc":
          sortedArray.sort(sortByPriorityDesc);
          break;
        case "timeAsc":
          sortedArray.sort(sortByTimeAsc);
          break;
        case "timeDesc":
          sortedArray.sort(sortByTimeDesc);
          break;
        default:
          break;
      }

      setSortedTasks(sortedArray);
    },
    [tasks]
  );

  useEffect(() => {
    handleSort(sortCriteria);
  }, [tasks, sortCriteria, handleSort]);

  return (
    <div>
      <ControlsContainer>
        <SearchBar
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={() => setShowCompleted((prev) => !prev)}>
          {showCompleted ? "All Tasks" : "Completed Tasks"}
        </Button>
        {tasks.length > 1 && (
          <SortDropdown
            onChange={(e) => handleSort(e.target.value)}
            value={sortCriteria}
          >
            <option value="timeAsc">Sort by Time (Ascending)</option>
            <option value="timeDesc">Sort by Time (Descending)</option>
            <option value="priorityAsc">Sort by Priority (Ascending)</option>
            <option value="priorityDesc">Sort by Priority (Descending)</option>
          </SortDropdown>
        )}
      </ControlsContainer>

      {/* Displaying message for no tasks or search results */}
      {filteredTasks.length === 0 ? (
        searchQuery ? (
          <Message>Not Found</Message> // Show "Not Found" if search query is provided and no tasks match.
        ) : showCompleted ? (
          completedTasks.length === 0 ? (
            <Message>No task completed</Message> // Show "No task completed" if showCompleted is true and no completed tasks exist.
          ) : (
            <Message>Not Found</Message> // Show "Not Found" if showCompleted is true but no tasks match the completed tasks.
          )
        ) : (
          <Message>No tasks available. Add a task!</Message> // Show this when there are no tasks available to display.
        )
      ) : (
        <TaskContainer>
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <TaskTile>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskMessage>{task.message}</TaskMessage>
                <Details>
                  <TimeDetails>
                    {new Date(task.reminderTime).toLocaleString()}
                  </TimeDetails>
                  <PriorityTag priority={task.priority}>
                    {task.priority}
                  </PriorityTag>
                </Details>
                <CompletionCheck>
                  <input
                    type="checkbox"
                    id={`task-complete-${task.id}`}
                    name="task-status"
                    checked={completedTasks.some((t) => t.id === task.id)}
                    onChange={() => handleTaskCompletion(task.id)}
                  />
                  <label htmlFor={`task-complete-${task.id}`}>Complete</label>
                </CompletionCheck>
                <DeleteButton onClick={() => removeTask(task.id)}>
                  Delete
                </DeleteButton>
              </TaskTile>
            </motion.div>
          ))}
        </TaskContainer>
      )}
    </div>
  );
};

export default TaskList;

const Button = styled.button`
  padding: 10px;
  display: flex;
  font-size: 16px;
  cursor: pointer;
  background-color: #f3f3f3;
  color: #323232;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease;

  &:hover {
    background-color: #e6e6e6;
  }
`;
const CompletionCheck = styled.div`
  width: 90%;
  padding: 14px;
  font-size: 16px;
  border-radius: 15px;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &:focus {
    box-shadow: 0px 4px 10px rgba(0, 123, 255, 0.2);
    border-color: #007bff;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  gap: 10px;
  @media (max-width: 980px) {
    display: flex;
    flex-direction: column;
  }
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin: 20px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  box-sizing: border-box;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:focus {
    background-color: #e6f7ff;
    border-color: #80bfff;
    outline: none;
  }
`;

const TaskContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-top: 10px;
  width: 100%;
  max-width: 100%;

  @media (max-width: 730px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TaskTile = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 350px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: linear-gradient(145deg, #f5f5f5, #727272);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  & > * {
    margin-bottom: 10px;
  }

  @media (max-width: 730px) {
    max-height: fit-content;
    width: 100%;
  }
`;

const TaskTitle = styled.h3`
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-bottom: 5px;
  text-transform: capitalize;
`;

const TaskMessage = styled.h4`
  text-align: justify;
  font-size: 16px;
  color: #5f5f5f;
  margin-bottom: 5px;
`;

const TimeDetails = styled.p`
  font-size: 14px;
  color: #777;
  line-height: 1.4;
  margin-bottom: 10px;
`;

const PriorityTag = styled.span`
  margin-right: 8px;
  min-width: 5vw;
  text-align: center;
  background-color: ${(props) =>
    props.priority === "High"
      ? "#d9534f"
      : props.priority === "Medium"
      ? "#f0ad4e"
      : "#5cb85c"};
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
`;

const DeleteButton = styled.button`
  background-color: #d9534f;
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  width: 90%;
  margin: 0 auto;
  display: block;
  cursor: pointer;
  &:hover {
    background-color: #c9302c;
  }
`;

// Adjust other styling as needed for layout and spacing.

const SortDropdown = styled.select`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #f3f3f3;
  color: #323232;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #80bfff;
    outline: none;
  }
`;
const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 730px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;
const Message = styled.div`
  font-size: 18px;
  color: #555;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
