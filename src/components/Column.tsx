import type { Task, MoveSide } from "../types/task.ts";
import TaskCard from "./TaskCard";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type ColumnProps = {
  title: string;
  tasks: Task[];
  editingId: string | null;
  moveTask : (id: string, side: MoveSide) => void;
  deleteTask: (id: string) => void;
  startEdit: (id: string) => void;
  saveEdit: (id: string, text: string) => void;
  cancelEdit: () => void;
};

function Column(props: ColumnProps) {
  const {
    title,
    tasks,
    editingId,
    moveTask,
    deleteTask,
    startEdit,
    saveEdit,
    cancelEdit
  } = props;

  return (
    <Paper 
      elevation={3}
      sx={{
        p: 2,
        minWidth: 280,
        maxWidth: 320,
        flex: 1,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 2 }}
      >
        {title}
      </Typography>

      <Box>
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            editingId={editingId}
            moveTask={moveTask}
            deleteTask={deleteTask}
            startEdit={startEdit}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
          />
        ))}
      </Box>
    </Paper>
  )

}


export default Column;

  