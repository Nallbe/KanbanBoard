import { useState, useEffect } from 'react';
import type { Task, MoveSide } from '../types/task';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


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
        <Button 
          onClick={(e) => handleMoveTask(e, task.id, 'back')}
          variant="contained"
          size="small"
          >
            <ArrowBackIcon/>
        </Button>}
        <span>{task.title}</span>
        {task.status !== 'done' 
        && 
        <Button 
          onClick={(e) => handleMoveTask(e, task.id, 'forward')}
          variant="contained"
          size="small"
          >
            <ArrowForwardIcon/>
        </Button>}
        <Button 
          onClick={handleDeleteTask}
          variant="outlined"
          color="error"
          size="small"
          >
          <DeleteIcon/>
        </Button>
        <Button
          onClick={() => startEdit(task.id)}
          variant="outlined"
          size="small"
        >
          <EditIcon/>
        </Button>  
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
        <Button 
          onClick={handleSaveEdit}
          variant="contained"
          color="success"
          size="small"
          >
          <CheckIcon/>
        </Button>
      </div>}
    </div>
  )
}

export default TaskCard;