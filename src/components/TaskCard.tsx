import type { Task } from '../types/task'

type TaskCardProps = {
  task: Task;
};

function TaskCard(props: TaskCardProps ) {

  const {task} = props

  return (
    <div>
      {task.title}
    </div>
  )
}

export default TaskCard;