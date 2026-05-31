import { useState } from 'react'

type AddTaskFormProps = {
  addTask: (text: string) => void;
};

function AddTaskForm(props: AddTaskFormProps) {
  
  const { addTask } = props

  const [inputText, setInputText] = useState<string>('');


  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    addTask(inputText);
    setInputText('');
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  )
  {
    setInputText(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
          <input 
            value={inputText} 
            onChange={handleChange}
          />

          <button>Добавить</button>
    </form>
  )
}

export default AddTaskForm;