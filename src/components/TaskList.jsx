import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const TaskList = ({ tasks, removeTask }) => {
  const [sortedTasks, setSortedTasks] = useState(tasks);
  const [sortCriteria, setSortCriteria] = useState("timeAsc"); // Default sorting by time ascending

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
  }, [tasks, sortCriteria, handleSort]); // Adding 'handleSort' to dependencies

  return (
    <div>
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
            <div>
              <strong>{tasks[0].message}</strong>
              <p>{new Date(tasks[0].reminderTime).toLocaleString()}</p>
              <p>Priority: {tasks[0].priority}</p>
            </div>
            <button onClick={() => removeTask(tasks[0].message)}>Delete</button>
          </TaskTile>
        </TaskContainer>
      ) : (
        <TaskContainer>
          {sortedTasks.map((task, index) => (
            <TaskTile key={index}>
              <div>
                <strong>{task.message}</strong>
                <p>{new Date(task.reminderTime).toLocaleString()}</p>
                <p>Priority: {task.priority}</p>
              </div>
              <button onClick={() => removeTask(task.message)}>Delete</button>
            </TaskTile>
          ))}
        </TaskContainer>
      )}
    </div>
  );
};

export default TaskList;

// Styled components
const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const TaskTile = styled.div`
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
`;
