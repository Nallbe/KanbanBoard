import type { Task, MoveSide } from '../types/task.ts'
import TaskCard from './TaskCard'

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
    <div>
      <h2>{title}</h2>
      
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
    </div>
  )

}


export default Column;

  