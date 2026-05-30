import { useState, type FormEvent } from 'react'
import type { Task } from './types/task';
import Column from './components/Column.tsx';
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

  const [inputText, setInputText] = useState<string>('');

  const todoTasks = tasks.filter(
    task => task.status === 'todo'
  );

  const inProgressTasks = tasks.filter(
    task => task.status === 'inProgress'
  );

  const doneTasks = tasks.filter(
    task => task.status === 'done'
  );

  function addTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setTasks(prev => ([
      ...prev,
      {
        id: crypto.randomUUID(),
        title: inputText.trim(),
        status: 'todo'
      }
    ]));

    setInputText('');
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

        <form onSubmit={addTask}>
          <input value={inputText} onChange={e => setInputText(e.target.value)}/>
          <button>Добавить</button>
        </form>
      </section>
  )
}

export default App
