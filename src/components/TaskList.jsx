import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const TaskList = ({ tasks, removeTask }) => {
  const [sortedTasks, setSortedTasks] = useState(tasks);
  const [sortCriteria, setSortCriteria] = useState("timeAsc"); // Default sorting by time ascending
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Sorting function based on priority
  const sortByPriorityAsc = (a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  };

  const sortByPriorityDesc = (a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  };

  // Sorting function based on time
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

  // Memoized handleSort function to avoid unnecessary re-creations
  const handleSort = useCallback(
    (criteria) => {
      setSortCriteria(criteria);
      let sortedArray = [...tasks]; // Create a copy of the tasks

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
  ); // Only recreate handleSort if 'tasks' changes

  // Update sorted tasks whenever 'tasks' or 'sortCriteria' changes
  useEffect(() => {
    handleSort(sortCriteria);
  }, [tasks, sortCriteria, handleSort]);

  return (
    <div>
      {/* search bar */}
      <SearchBar
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* Conditionally render sorting options */}
      {tasks.length > 1 && (
        <SortDropdown
          onChange={(e) => handleSort(e.target.value)}
          value={sortCriteria}
        >
          <option value="timeAsc">Sort by Time (Ascending)</option>
          <option value="timeDesc">Sort by Time (Descending)</option>
          <option value="priorityDesc">Sort by Priority (Ascending)</option>
          <option value="priorityAsc">Sort by Priority (Descending)</option>
        </SortDropdown>
      )}

      {/* Conditionally render task list or message */}
      {tasks.length === 0 ? (
        <Message>No tasks available. Add a task!</Message>
      ) : tasks.length === 1 ? (
        <TaskContainer>
          <TaskTile>
            <TaskTitle>{tasks[0].message}</TaskTitle>
            <TimeDetails>
              {new Date(tasks[0].reminderTime).toLocaleString()}
            </TimeDetails>
            <PriorityTag priority={tasks[0].priority}>
              Priority: {tasks[0].priority}
            </PriorityTag>

            <DeleteButton onClick={() => removeTask(tasks[0].message)}>
              Delete
            </DeleteButton>
          </TaskTile>
        </TaskContainer>
      ) : (
        <TaskContainer>
          {sortedTasks.map((task, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <TaskTile>
                <TaskTitle>{task.message}</TaskTitle>
                <Details>
                  <TimeDetails>
                    {new Date(task.reminderTime).toLocaleString()}
                  </TimeDetails>
                  <PriorityTag priority={task.priority}>
                    Priority: {task.priority}
                  </PriorityTag>
                </Details>
                <DeleteButton onClick={() => removeTask(task.message)}>
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

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin: 20px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  box-sizing: border-box;
  transition: background-color 0.3s ease;

  &:focus {
    background-color: #e6f7ff;
    border-color: #80bfff;
    outline: none;
  }
`;

// Styled components
const TaskContainer = styled(motion.div)`
  display: flex;
  gap: 15px;
  padding: 10px;
  width: 100%; /* Ensure full width */
  max-width: 100%; /* Optional, as width: 100% would already suffice */
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  justify-content: space-between; /* Ensure even distribution of items */

  @media (max-width: 730px) {
    flex-direction: column; /* Stack items vertically on small screens */
    align-items: center; /* Center items on smaller screens */
  }
`;

const TaskTile = styled.div`
  background-color: #ffffff;
  padding: 20px;
  width: 20vw;
  max-width: 350px; /* To prevent the tile from becoming too large on bigger screens */
  max-height: 20vh;
  min-height: 150px; /* Set a minimum height for consistency */
  border-radius: 12px; /* Slightly more rounded corners */
  display: flex;
  flex-direction: column; /* Stack items vertically */
  justify-content: space-between;
  align-items: flex-start;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth hover effect */
  background: linear-gradient(
    145deg,
    #f0f0f0,
    #e6e6e6
  ); /* Soft gradient for a modern look */

  &:hover {
    transform: translateY(-5px); /* Lift the card on hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Slightly stronger shadow on hover */
  }

  & > * {
    margin-bottom: 10px; /* Add spacing between child elements */
  }
  @media (max-width: 730px) {
    max-height: fit-content;
    width: 50%;
  }
`;

const TaskTitle = styled.h3`
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-bottom: 5px; /* Space between title and content */
`;

const TimeDetails = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.4;
  margin-bottom: 10px;
`;

const PriorityTag = styled.span`
  margin-right: 0px;
  background-color: ${(props) =>
    props.priority === "High"
      ? "#9c34fd"
      : props.priority === "Medium"
      ? "#66b3ff"
      : "#28f919"};
  color: white;
  padding: 12px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* Aligns items vertically in the center */
  width: 100%; /* Ensures it takes up the full width of the container */
  @media (max-width: 730px) {
    flex-direction: column;
    align-items: flex-start; /* Aligns items to the start on smaller screens */
  }
`;

const DeleteButton = styled.button`
  background-color: #f49b36; /* Red button for delete */
  padding: 8px 16px;
  font-size: 14px;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e53935; /* Darker red on hover */
  }
`;

const SortDropdown = styled.select`
  padding: 10px;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  background-color: #282c34;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #3a3f47;
  }
`;

const Message = styled.div`
  font-size: 18px;
  color: #555;
  margin-top: 20px;
  text-align: center;
`;
