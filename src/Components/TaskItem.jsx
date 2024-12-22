import { CheckCircle, Star, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

const TaskItem = ({ task, updateTask, deleteTask, isHovered, setHovered }) => {
  const priorities = ['Basse', 'Moyenne', 'Haute'];

  const toggleComplete = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  const toggleStar = () => {
    updateTask({ ...task, starred: !task.starred });
  };

  const updatePriority = (priority) => {
    updateTask({ ...task, priority });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Haute': return 'text-red-500';
      case 'Moyenne': return 'text-yellow-500';
      case 'Basse': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 
        ${isHovered ? 'bg-purple-50 scale-102' : 'bg-gray-50'}
        ${task.completed ? 'opacity-75' : ''}`}
    >
      <button
        onClick={toggleComplete}
        className={`transition-all duration-300 
          ${task.completed ? 'text-green-500' : 'text-gray-400 hover:text-purple-500'}`}
      >
        <CheckCircle size={20} />
      </button>

      <button
        onClick={toggleStar}
        className={`transition-all duration-300 
          ${task.starred ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
      >
        <Star size={20} />
      </button>

      <span className={`flex-1 transition-all duration-300 
        ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}
        ${isHovered ? 'transform translate-x-2' : ''}`}>
        {task.text}
      </span>

      <span className="px-2 py-1 text-sm rounded-lg bg-gray-100 text-gray-600">
        {task.category}
      </span>

      <select
        value={task.priority}
        onChange={(e) => updatePriority(e.target.value)}
        className={`p-1 rounded-lg text-sm ${getPriorityColor(task.priority)} border-0 bg-transparent`}
      >
        {priorities.map(priority => (
          <option key={priority} value={priority}>{priority}</option>
        ))}
      </select>

      <button
        onClick={() => deleteTask(task.id)}
        className={`text-gray-400 hover:text-red-500 transition-all duration-300 
          ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        <Trash2 size={20} />
      </button>
    </li>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    dueDate: PropTypes.instanceOf(Date),
    category: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    starred: PropTypes.bool.isRequired,
  }).isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  isHovered: PropTypes.bool.isRequired,
  setHovered: PropTypes.func.isRequired,
};

export default TaskItem;
