import { useState, useEffect } from 'react';
import type { Task, TaskStatus, MoveSide } from './types/task';

import Column from './components/Column.tsx';
import AddTaskForm from './components/AddTaskForm.tsx';

import './styles/App.css'

function App() {


  const [editingId, setEditingId] = useState<string | null>(null);

  const [tasks, setTasks] = useState<Task[]>(() => {
    const result = localStorage.getItem('tasks');
    if (!result)  return [];

    try {
      return JSON.parse(result) as Task[];
    } catch {
      return [];
    }
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  // Фильтры
  const todoTasks = tasks.filter(
    task => task.status === 'todo'
  );

  const inProgressTasks = tasks.filter(
    task => task.status === 'inProgress'
  );

  const doneTasks = tasks.filter(
    task => task.status === 'done'
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
    if (side === 'forward') {
      setTasks(prev => prev.map(task => {

        if (task.id !== id) return task;

        if (task.status === 'todo') {
          return {
            ...task,
            status: 'inProgress'
          };
        }

        if (task.status === 'inProgress') {
          return {
            ...task,
            status: 'done'
          }
        }

        return task
      }))
    }
    if (side === 'back') {
      setTasks(prev => prev.map(task => {

        if (task.id !== id) return task;

        if (task.status === 'inProgress') {
          return {
            ...task,
            status: 'todo'
          };
        }

        if (task.status === 'done') {
          return {
            ...task,
            status: 'inProgress'
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
    console.log(id, text)
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


  return (
      <section id="center">
        <div className="columns-wrapper">
          <Column
            tasks={todoTasks}
            editingId={editingId}
            title="To Do"
            moveTask={moveTask}
            deleteTask={deleteTask}
            startEdit={startEdit}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
          />
          <Column
            tasks={inProgressTasks}
            editingId={editingId}
            title="In Progress"
            moveTask={moveTask}
            deleteTask={deleteTask}
            startEdit={startEdit}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
          />
          <Column
            tasks={doneTasks}
            editingId={editingId}
            title="Done"
            moveTask={moveTask}
            deleteTask={deleteTask}
            startEdit={startEdit}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
          />
        </div>
        <AddTaskForm
          addTask={addTask}
        />
      </section>
  )
}

export default App
