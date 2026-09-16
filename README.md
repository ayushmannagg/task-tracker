# Task Tracker

A simple full-stack task management app built with React for the frontend and Python-FastAPI for the backend.

## Features

- Add new tasks with an optional deadline
- Mark tasks as completed or pending
- Edit task title and deadline
- Delete tasks
- Filter tasks by All, Pending, and Completed
- View total, completed, and remaining task counts
- Sorted tasks by nearest deadline first

## Tech Stack

- Frontend: React
- Backend: Python-FastAPI
- API communication: Fetch API
- Styling: CSS

## Project Structure

```text
task-tracker/
├── backend/                  # Python FastAPI server
│   ├── main.py              # API endpoints and database
│   └── requirements.txt      # Python dependencies
│
└── frontend/                # React application
    ├── src/
    │   ├── components/       # Reusable UI components
    │   │   ├── TaskForm.js   # Input form for new tasks
    │   │   ├── TaskItem.js   # Individual task display
    │   │   └── TaskList.js   # List container with filtering/sorting
    │   ├── pages/
    │   │   └── Home.js       # Main page & state management
    │   ├── services/
    │   │   └── task-service.js  # API communication
    │   ├── utils/
    │   │   └── helpers.js    # Helper functions (formatting)
    │   ├── App.js            # App wrapper
    │   ├── App.css           # Styling
    │   └── index.js          # React entry point
    └── package.json
```

## Getting Started

### 1. Backend setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will run at:
- http://localhost:8000

### 2. Frontend setup

```bash
cd frontend
npm install
npm start
```

The app will run at:
- http://localhost:3000

## API Endpoints

- `GET /api/tasks` - get all tasks
- `POST /api/tasks` - create a task
- `PUT /api/tasks/{task_id}` - update a task
- `DELETE /api/tasks/{task_id}` - delete a task

## Notes

This project is a lightweight task tracker designed for demonstration. It stores tasks in memory, so data resets when the backend server restarts.
