import { useState } from 'react';
import TaskItem from './TaskItem';
import PropTypes from 'prop-types';

const TaskList = ({
  tasks,
  filter,
  sortBy,
  sortDirection,
  searchQuery,
  selectedCategory,
  updateTask,
  deleteTask,
}) => {
  const [hoveredTask, setHoveredTask] = useState(null);

  const priorities = ['Basse', 'Moyenne', 'Haute'];

  const filteredAndSortedTasks = tasks
    .filter(task => {
      const matchesFilter = 
        filter === 'all' || 
        (filter === 'completed' && task.completed) ||
        (filter === 'active' && !task.completed) ||
        (filter === 'starred' && task.starred);

      const matchesCategory = 
        selectedCategory === 'all' || 
        task.category === selectedCategory;

      const matchesSearch = 
        task.text.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'priority':
          comparison = priorities.indexOf(b.priority) - priorities.indexOf(a.priority);
          break;
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'alphabetical':
          comparison = a.text.localeCompare(b.text);
          break;
        default:
          break;
      }
      return sortDirection === 'desc' ? comparison * -1 : comparison;
    });

  return (
    <div className="p-6">
      <ul className="space-y-3">
        {filteredAndSortedTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
            isHovered={hoveredTask === task.id}
            setHovered={isHovered => setHoveredTask(isHovered ? task.id : null)}
          />
        ))}
      </ul>

      {filteredAndSortedTasks.length === 0 && (
        <div className="text-center text-gray-400 mt-8 animate-pulse">
          Aucune tâche ne correspond à vos critères
        </div>
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
      dueDate: PropTypes.instanceOf(Date),
      category: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      starred: PropTypes.bool.isRequired,
      userId: PropTypes.number.isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskList;
