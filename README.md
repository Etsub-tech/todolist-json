To-Do Application (JSON Server)

This is a simple To-Do web application built using HTML, CSS, and JavaScript, with JSON Server used as a mock backend.
The project was done to practice frontend development and working with REST APIs.

What the App Can Do
Basic Features

Add a task with:

title

description

category

due date

View all tasks in a card layout

Mark tasks as completed or incomplete

Edit existing tasks

Delete tasks

Extra Features

Search tasks by title or description

Filter tasks by category (Work, Personal, Shopping, Health, Other)

Sort tasks (newest, oldest, due date, title)

Light and dark mode (saved in the browser)

Tools Used

HTML
CSS
JavaScript (Vanilla JS)
JSON Server (for backend simulation)
Node.js & npm

How to Run the Project
Requirements
Node.js installed on your computer

Steps
Install the required dependency:
npm install

Start JSON Server:
npm start


This will run the backend at:

http://localhost:3000


Open index.html in your browser to use the app.

API Endpoints Used

JSON Server automatically creates these endpoints from db.json:

GET /todos – get all tasks

POST /todos – add a new task

PATCH /todos/:id – update a task

DELETE /todos/:id – delete a task


How to Use the App

Fill the form and click Add Task to create a task

Click Complete to mark a task as done

Click Edit to modify a task

Click Delete to remove a task

Use the search box to find tasks

Use the dropdowns to filter or sort tasks

Click the moon/sun icon to switch themes

Notes

JSON Server must be running for the app to work properly

All task data is stored in db.json

Theme preference is saved using localStorage

The app works on both desktop and mobile screens