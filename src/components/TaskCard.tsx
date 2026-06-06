import { useState, useEffect } from 'react';
import type { Task, MoveSide } from '../types/task'

type TaskCardProps = {
  task: Task;
  editingId: string | null;
  moveTask: (id: string, side: MoveSide) => void;
  deleteTask: (id: string) => void;
  startEdit: (id: string) => void;
  saveEdit: (id: string, text: string) => void;
  cancelEdit: () => void;
};

function TaskCard(props: TaskCardProps ) {

  const {
    task,
    editingId,
    moveTask,
    deleteTask,
    startEdit,
    saveEdit,
    cancelEdit
  } = props

  const [editingInput, setEditingInput] = useState(task.title);


  useEffect(() => {
    if (editingId === task.id) {
      setEditingInput(task.title);
    } 
  }, [editingId, task.id, task.title])



  function handleSaveEdit() {
    saveEdit(task.id, editingInput);
  }

  function handleMoveTask(e: React.MouseEvent<HTMLButtonElement>, id: string, side: MoveSide) {
    e.stopPropagation();
    moveTask(id, side);
  }

  function handleDeleteTask(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    deleteTask(task.id);
  }

  function handleCancelTask() {
    cancelEdit();
  }

  return (
    <div className="task-card-column">
      {editingId !== task.id ? 
      <div>
        {task.status !== 'todo' 
        && 
        <button 
          onClick={(e) => handleMoveTask(e, task.id, 'back')}>←
        </button>}
        <span>{task.title}</span>
        {task.status !== 'done' 
        && 
        <button 
          onClick={(e) => handleMoveTask(e, task.id, 'forward')}>→</button>}
        <button 
          onClick={handleDeleteTask}
          className="card-btn"
          >❌</button>
        <button
          onClick={() => startEdit(task.id)}
          className="card-btn"
        >✏️</button>  
      </div> : 
      <div>
        <input 
          value={editingInput} 
          onChange={(e) => setEditingInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSaveEdit();
            } else if (e.key === 'Escape') {
              handleCancelTask();
            }
          }}
          />
          
        <button onClick={handleSaveEdit}>✔️</button>
      </div>}
    </div>
  )
}

export default TaskCard;