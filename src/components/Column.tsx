import type { Task } from '../types/task.ts'
import TaskCard from './TaskCard'

type ColumnProps = {
  title: string;
  tasks: Task[];
};

function Column(props: ColumnProps) {
  
  const {
    title,
    tasks
  } = props;

  return (
    <div>
      <h2>{title}</h2>
      
      {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}  
          />
      ))}
    </div>
  )

}


export default Column;

  