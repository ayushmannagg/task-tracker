from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# Enable CORS for local React development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock database
tasks_db = []
task_counter = 0

# Pydantic models for data validation
class TaskCreate(BaseModel):
    title: str
    deadline: Optional[str] = None  # Format: "YYYY-MM-DDTHH:mm"

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    status: Optional[str] = None
    deadline: Optional[str] = None

@app.get("/api/tasks")
def get_all_tasks():
    """Retrieves all tasks from the tracker."""
    return tasks_db

@app.post("/api/tasks", status_code=201)
def create_new_task(task: TaskCreate):
    """Adds a new task to the tracker."""
    global task_counter
    task_counter += 1
    new_task = {
        "id": task_counter,
        "title": task.title,
        "status": "Pending",
        "deadline": task.deadline  # Optional deadline
    }
    tasks_db.append(new_task)
    return new_task

@app.put("/api/tasks/{task_id}")
def update_existing_task(task_id: int, task_update: TaskUpdate):
    """Updates a task's status, title, or deadline."""
    for task in tasks_db:
        if task["id"] == task_id:
            if task_update.title is not None:
                task["title"] = task_update.title
            if task_update.status is not None:
                task["status"] = task_update.status
            if task_update.deadline is not None:
                task["deadline"] = task_update.deadline
            return task
    raise HTTPException(status_code=404, detail="Task not found")

@app.delete("/api/tasks/{task_id}", status_code=204)
def delete_existing_task(task_id: int):
    """Removes a task from the tracker by ID."""
    global tasks_db
    tasks_db = [t for t in tasks_db if t["id"] != task_id]
    return None