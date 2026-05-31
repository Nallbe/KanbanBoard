import { useState } from 'react'
import type { Task, TaskStatus, MoveSide } from './types/task';

import Column from './components/Column.tsx';
import AddTaskForm from './components/AddTaskForm.tsx';

import './styles/App.css'

function App() {

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: crypto.randomUUID(),
      title: 'Изучит TypeScript',
      status: 'todo'
    },
    {
      id: crypto.randomUUID(),
      title: 'Кефтеме',
      status: 'inProgress'
    },
    {
      id: crypto.randomUUID(),
      title: 'Так нужно!',
      status: 'done'
    }
  ])

  

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


  return (
      <section id="center">
        <div className="columns-wrapper">
          <Column
            tasks={todoTasks}
            title="To Do"
            moveTask={moveTask}
          />
          <Column
            tasks={inProgressTasks}
            title="In Progress"
            moveTask={moveTask}
          />
          <Column
            tasks={doneTasks}
            title="Done"
            moveTask={moveTask}
          />
        </div>
        <AddTaskForm
          addTask={addTask}
        />
      </section>
  )
}

export default App
