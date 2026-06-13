import { useState, useEffect } from "react";
import type { Task, TaskStatus, MoveSide } from "./types/task";

import Column from "./components/Column.tsx";
import AddTaskForm from "./components/AddTaskForm.tsx";

import "./styles/App.css";
import Box from "@mui/material/Box";

function App() {

  const [tasks, setTasks] = useState<Task[]>(() => {
    const result = localStorage.getItem("tasks");
    if (!result)  return [];

    try {
      return JSON.parse(result) as Task[];
    } catch {
      return [];
    }
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  const [editingId, setEditingId] = useState<string | null>(null);

  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<TaskStatus | null>(null);


  // Фильтры
  const todoTasks = tasks.filter(
    task => task.status === "todo"
  );

  const inProgressTasks = tasks.filter(
    task => task.status === "inProgress"
  );

  const doneTasks = tasks.filter(
    task => task.status === "done"
  );



  function addTask(text: string, taskStatus: TaskStatus) {

    if (!text.trim()) return;

    setTasks(prev => ([
      ...prev,
      {
        id: crypto.randomUUID(),
        title: text.trim(),
        status: taskStatus
      }
    ]));
  }

  function deleteTask(id: string) {
    setTasks(prev => 
      prev.filter(task => task.id !== id));
  }

  function moveTask(id: string, side: MoveSide) {
    if (side === "forward") {
      setTasks(prev => prev.map(task => {

        if (task.id !== id) return task;

        if (task.status === "todo") {
          return {
            ...task,
            status: "inProgress"
          };
        }

        if (task.status === "inProgress") {
          return {
            ...task,
            status: "done"
          }
        }

        return task
      }))
    }
    if (side === "back") {
      setTasks(prev => prev.map(task => {

        if (task.id !== id) return task;

        if (task.status === "inProgress") {
          return {
            ...task,
            status: "todo"
          };
        }

        if (task.status === "done") {
          return {
            ...task,
            status: "inProgress"
          }
        }

        return task
      }))
    }


  }

  function startEdit(id: string) {
    setEditingId(id)
  }

  function saveEdit(id: string, text: string) {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        return {
          ...task,
          title: text
        }
      } else return task
    }))

    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
  }


  function startDrag(id: string) {
    setDraggedTaskId(id)
  }

  function dropTask(status: TaskStatus) {
    if (!draggedTaskId) return;

    setTasks(prev => 
      prev.map(task => 
        task.id === draggedTaskId ? {
          ...task,
          status: status,
        }: task
      ) 
    )

    setDraggedTaskId(null);
    setDragOverStatus(null);
  }

  function handleEditDragOverStatus(status: TaskStatus) {
    if (!status) return;

    setDragOverStatus(status);
  }

  function clearDragOverStatus() {
    setDragOverStatus(null);
  }


  return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 15
        }}>
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          mb: 10,
          gap: 3,
        }}>
          <Column
            tasks={todoTasks}
            editingId={editingId}
            dragOverStatus={dragOverStatus}
            title="To Do"
            status={"todo"}
            moveTask={moveTask}
            deleteTask={deleteTask}
            startEdit={startEdit}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            startDrag={startDrag}
            dropTask={dropTask}
            handleEditDragOverStatus={handleEditDragOverStatus}
            clearDragOverStatus={clearDragOverStatus}
          />
          <Column
            tasks={inProgressTasks}
            editingId={editingId}
            dragOverStatus={dragOverStatus}
            title="In Progress"
            status={"inProgress"}
            moveTask={moveTask}
            deleteTask={deleteTask}
            startEdit={startEdit}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            startDrag={startDrag}
            dropTask={dropTask}
            handleEditDragOverStatus={handleEditDragOverStatus}
            clearDragOverStatus={clearDragOverStatus}
          />
          <Column
            tasks={doneTasks}
            editingId={editingId}
            dragOverStatus={dragOverStatus}
            title="Done"
            status={"done"}
            moveTask={moveTask}
            deleteTask={deleteTask}
            startEdit={startEdit}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            startDrag={startDrag}
            dropTask={dropTask}
            handleEditDragOverStatus={handleEditDragOverStatus}
            clearDragOverStatus={clearDragOverStatus}
          />
        </Box>
        <AddTaskForm
          addTask={addTask}
        />
      </Box>
  )
}

export default App
