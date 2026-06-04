import type { Task, MoveSide } from '../types/task.ts'
import TaskCard from './TaskCard'

type ColumnProps = {
  title: string;
  tasks: Task[];
  editingId: string;
  moveTask : (id: string, side: MoveSide) => void;
  deleteTask: (id: string) => void;
  startEdit: (id: string) => void;
  saveEdit: (id: string, text: string) => void;
};

function Column(props: ColumnProps) {
  const {
    title,
    tasks,
    editingId,
    moveTask,
    deleteTask,
    startEdit,
    saveEdit
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
          />
      ))}
    </div>
  )

}


export default Column;

  