import type { Task, MoveSide } from '../types/task'

type TaskCardProps = {
  task: Task;
  moveTask: (id: string, side: MoveSide) => void;
  deleteTask: (id: string) => void;
};

function TaskCard(props: TaskCardProps ) {

  const {
    task,
    moveTask,
    deleteTask
  } = props

  return (
    <div 
      className="task-card-column">
      {task.status !== 'todo' 
        && <button
          onClick={() => moveTask(task.id, 'back')}>
          ←
          </button>}
      {task.title}
      {task.status !== 'done' 
        && <button 
          onClick={() => moveTask(task.id, 'forward')}>
          →
        </button>}
        <button 
          onClick={() => deleteTask(task.id)}
          className="card-remove-btn"
          >❌
        </button>
    </div>
  )
}

export default TaskCard;