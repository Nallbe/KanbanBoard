import type { Task, MoveSide, TaskStatus } from "../types/task.ts";
import TaskCard from "./TaskCard";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type ColumnProps = {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  editingId: string | null;
  dragOverStatus: TaskStatus | null;
  moveTask : (id: string, side: MoveSide) => void;
  deleteTask: (id: string) => void;
  startEdit: (id: string) => void;
  saveEdit: (id: string, text: string) => void;
  cancelEdit: () => void;
  startDrag : (id: string) => void ;
  dropTask: (status: TaskStatus) => void;
  handleEditDragOverStatus: (status: TaskStatus) => void;
  clearDragOverStatus: () => void;
};

function Column(props: ColumnProps) {
  const {
    title,
    status,
    tasks,
    editingId,
    dragOverStatus,
    moveTask,
    deleteTask,
    startEdit,
    saveEdit,
    cancelEdit,
    startDrag,
    dropTask,
    handleEditDragOverStatus,
    clearDragOverStatus
  } = props;



  return (
    <Paper 
      onDragOver={(e) => {
        e.preventDefault();
        handleEditDragOverStatus(status);
      }}
      onDragLeave={clearDragOverStatus}
      onDrop={() => dropTask(status)}
      elevation={3}
      sx={{
        p: 2,
        minWidth: 280,
        maxWidth: 320,
        flex: 1,
        borderRadius: 3,
        backgroundColor: dragOverStatus === status ? "#e3f2fd" : "#f5f5f5",
        transition: "background-color 0.2s ease",
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
            startDrag={startDrag}
          />
        ))}
      </Box>
    </Paper>
  )

}


export default Column;

  