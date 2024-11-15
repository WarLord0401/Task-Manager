import { motion } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";

const TaskList = ({ tasks, removeTask, taskContainerRef }) => {
  const [sortedTasks, setSortedTasks] = useState(tasks);
  const [sortCriteria, setSortCriteria] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
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
  const filterTasks = (tasks, query) => {
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.message.toLowerCase().includes(query.toLowerCase()) ||
        task.priority.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredTasks = useMemo(() => {
    const tasksToShow = showCompleted ? completedTasks : sortedTasks;
    return filterTasks(tasksToShow, searchQuery);
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
      <h1
        ref={taskContainerRef}
        id="task-container"
        style={{
          display: "flex",
          justifyContent: "center",
          color: "#3492d1",
          fontSize: "50px",
        }}
      >
        TASKS
      </h1>
      <ControlsContainer>
        <SearchBar
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            border: "1px solid grey",
            borderRadius: "10px",
            height: 40,
          }}
        >
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
              <option value="priorityDesc">
                Sort by Priority (Descending)
              </option>
            </SortDropdown>
          )}
        </div>
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
                <TaskMessage>
                  {expandedTaskId === task.id ? (
                    <p style={{ display: "flex", flexDirection: "column" }}>
                      {task.message.slice(0, 30)}...
                      <ReadMore onClick={() => setExpandedTaskId(task.id)}>
                        Read more
                      </ReadMore>
                    </p>
                  ) : (
                    <>
                      {task.message.length > 30 ? (
                        <p style={{ display: "flex", flexDirection: "column" }}>
                          {task.message.slice(0, 30)}...
                          <ReadMore onClick={() => setExpandedTaskId(task.id)}>
                            Read more
                          </ReadMore>
                        </p>
                      ) : (
                        <p>{task.message}</p>
                      )}
                    </>
                  )}
                </TaskMessage>
                {expandedTaskId === task.id && (
                  <FloatingTile>
                    <p>{task.message}</p>
                    <CloseButton onClick={() => setExpandedTaskId(null)}>
                      Close
                    </CloseButton>
                  </FloatingTile>
                )}

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

// Styled components

const ReadMore = styled.span`
  color: #0048ff;
  cursor: pointer;
  text-decoration: underline;
`;
const fadeInScale = keyframes`
  from{
    opacity: 0;
    transform: translate(-50%, -50%) scale()(0.8);
  }
  to{
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const FloatingTile = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  width: 100%;
  padding: 20px;
  background: #ffffffca;
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  opacity: 0;
  z-index: 1000;
  animation: ${fadeInScale} 0.3s forwards ease-in-out;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background: #ff5a5a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #100c0c;
  }
`;

const CompletionCheck = styled.div`
  width: 90%;
  padding: 14px;
  font-size: 18px;
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
  max-width: 100%;
  @media (max-width: 980px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  width: 60%;
  cursor: pointer;
  background-color: #d9d9d9;
  white-space: nowrap;
  color: #323232;
  border: none;
  border-start-start-radius: 10px;
  border-end-start-radius: 10px;
  &:hover {
    background-color: #e6e6e6;
  }
`;

const SortDropdown = styled.select`
  padding: 10px;
  font-size: 16px;
  width: 60%;
  cursor: pointer;
  background-color: #d9d9d9;
  color: #323232;
  border: none;
  border-start-end-radius: 10px;
  border-end-end-radius: 10px;

  &:focus {
    border-color: #80bfff;
    outline: none;
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
  gap: 20px;
  max-width: 100%;
  @media (max-width: 730px) {
    align-items: center;
  }
`;

const TaskTile = styled.div`
  padding: 20px;
  position: relative;
  margin-bottom: 25px;
  max-width: 100%;
  max-height: 100%;
  height: 80%;
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
