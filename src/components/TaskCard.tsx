import { useState } from 'react';
import type { Task, MoveSide } from '../types/task'

type TaskCardProps = {
  task: Task;
  editingId: string;
  moveTask: (id: string, side: MoveSide) => void;
  deleteTask: (id: string) => void;
  startEdit: (id: string) => void;
  saveEdit: (id: string, text: string) => void;
};

function TaskCard(props: TaskCardProps ) {

  const {
    task,
    editingId,
    moveTask,
    deleteTask,
    startEdit,
    saveEdit
  } = props

  const [editingInput, setEditingInput] = useState(task.title);


  function handleSaveEdit() {
    saveEdit(task.id, editingInput);
  }

  return (
    <div className="task-card-column">
      {editingId !== task.id ? <div onClick={() => startEdit(task.id)}>
        {task.status !== 'todo' 
        && 
        <button 
          onClick={() => moveTask(task.id, 'back')}
        >←</button>}
        <span>{task.title}</span>
      {task.status !== 'done' 
        && 
        <button 
          onClick={() => moveTask(task.id, 'forward')}>→</button>}
        <button 
          onClick={() => deleteTask(task.id)}
          className="card-remove-btn"
          >❌
        </button>
        <button
          onClick={() => startEdit(task.id)}
        >✏️</button>  
      </div> 
      : <div>
          <input type="text" value={editingInput} onChange={(e) => setEditingInput(e.target.value)} />
          <button onClick={handleSaveEdit}>✔️</button>
        </div>}
    </div>
  )
}

export default TaskCard;