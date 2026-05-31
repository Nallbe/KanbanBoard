import type { Task, MoveSide } from '../types/task'

type TaskCardProps = {
  task: Task;
  moveTask: (id: string, side: MoveSide) => void;
};

function TaskCard(props: TaskCardProps ) {

  const {
    task,
    moveTask
  } = props

  return (
    <div className="task-card-column">
      <button
        onClick={() => moveTask(task.id, 'back')}>
          ←
      </button>
      {task.title}
      <button 
        onClick={() => moveTask(task.id, 'forward')}>
          →
      </button>
    </div>
  )
}

export default TaskCard;