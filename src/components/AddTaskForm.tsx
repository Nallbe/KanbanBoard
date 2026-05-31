import { useState } from 'react'
import type { TaskStatus } from '../types/task';

type AddTaskFormProps = {
  addTask: (text: string, taskStatus: TaskStatus) => void;
};

function AddTaskForm(props: AddTaskFormProps) {
  
  const { addTask } = props

  const [inputText, setInputText] = useState<string>('');
  const [formSelect, setFormSelect] = useState<TaskStatus>('todo');


  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    addTask(inputText, formSelect);

    setInputText('');
    setFormSelect('todo');
  }

  function inputHandleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setInputText(e.target.value)
  }

  function selectHandleChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    setFormSelect(e.target.value as TaskStatus)
  }

  return (
    <form onSubmit={handleSubmit}>
      <select 
        value={formSelect}
        onChange={selectHandleChange}>
        <option value="todo">todo</option>
        <option value="inProgress">inProgress</option>
        <option value="done">done</option>
      </select>
      <input 
        value={inputText} 
        onChange={inputHandleChange}
      />

      <button>Добавить</button>
    </form>
  )
}

export default AddTaskForm;