import { useState, useEffect } from 'react';
import type { Task, MoveSide } from '../types/task';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


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
    <Card sx={{ 
      borderRadius: 5,
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      mb: 2,
      p: 2,
      maxWidth: '250px'
      }}>
      
        {editingId !== task.id ? 
        <Box>

          <CardContent>
            <Typography sx={{
              wordBreak: 'break-word',
              overflowWrap: 'anywhere'
            }}>
              {task.title}
            </Typography>
          </CardContent>

          <CardActions sx={{
              mx: 'auto',
              gap: 1,
            }}>
            {task.status !== 'todo' 
            && 
            <IconButton 
              onClick={(e) => handleMoveTask(e, task.id, 'back')}
              size="small"
              >
              <ArrowBackIcon/>
            </IconButton>}
          
            <IconButton 
              onClick={handleDeleteTask}
              color="error"
              size="small"
              >
              <DeleteIcon/>
            </IconButton>

            <IconButton
              onClick={() => startEdit(task.id)}
              size="small"
            >
              <EditIcon/>
            </IconButton>

            {task.status !== 'done' 
            && 
            <IconButton 
              onClick={(e) => handleMoveTask(e, task.id, 'forward')}
              size="small"
              >
              <ArrowForwardIcon/>
            </IconButton>}

          </CardActions>
        </Box> : 
        <Box>
          <TextField
            sx={{
              mb: 2
            }}
            fullWidth
            size="small"
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
          <IconButton 
            onClick={handleSaveEdit}
            color="success"
            size="small"
            >
            <CheckIcon/>
          </IconButton>
        </Box>}
    </Card>
  )
}

export default TaskCard;