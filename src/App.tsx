import { useState, type FormEvent } from 'react'
import type { Task } from './types/task';

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

  function addTask(text: string) {

    if (!text.trim()) return;

    setTasks(prev => ([
      ...prev,
      {
        id: crypto.randomUUID(),
        title: text.trim(),
        status: 'todo'
      }
    ]));
  }


  return (
      <section id="center">
        <Column
          tasks={todoTasks}
          title="To Do"
        />
        <Column
          tasks={inProgressTasks}
          title="In Progress"
        />
        <Column
          tasks={doneTasks}
          title="Done"
        />
        <AddTaskForm
          addTask={addTask}
        />
        {/* <form onSubmit={addTask}>
          <input value={inputText} onChange={e => setInputText(e.target.value)}/>
          <button>Добавить</button>
        </form> */}
      </section>
  )
}

export default App
