# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Task Manager App

Overview

This project is a Task Manager Application designed to simplify task tracking and prioritize activities. The application is responsive, user-friendly, and allows users to add tasks, set reminders, assign priorities, and view their tasks seamlessly.


Features

Add tasks with title, message, reminder time, and priority level.

Validate inputs and display helpful error messages.

Sort added tasks on basis of priority or time added in ascending order/ descending order

Reminder pops on screen when time passes. It lasts for 5 secs.

A responsive design that adapts to different screen sizes.


Setup & Launch Instructions

Clone the repository to your local machine:
git clone https://github.com/username/task-manager-app.git

Navigate to the project directory:
cd task-manager-app

Install the required dependencies:
npm install

Start the development server:
npm start

Open the application in your browser at http://localhost:3000.


Development Assumptions

The app assumes the user will provide valid task data (title, message, reminder time, priority).

Default validation logic is used to ensure no empty fields are submitted.

Tasks are displayed in the order they are added without sorting by priority or time.
