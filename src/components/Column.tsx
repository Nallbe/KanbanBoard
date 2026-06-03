import type { Task, MoveSide } from '../types/task.ts'
import TaskCard from './TaskCard'

type ColumnProps = {
  title: string;
  tasks: Task[];
  moveTask : (id: string, side: MoveSide) => void;
  deleteTask: (id: string) => void;
};

function Column(props: ColumnProps) {
  const {
    title,
    tasks,
    moveTask,
    deleteTask
  } = props;

  return (
    <div>
      <h2>{title}</h2>
      
      {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            moveTask={moveTask}
            deleteTask={deleteTask}
          />
      ))}
    </div>
  )

}


export default Column;

  