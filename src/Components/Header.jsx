import { useState } from 'react';
import { Plus, Search, LogOut } from 'lucide-react';
import PropTypes from 'prop-types';

const Header = ({ 
  addTask, 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  user,
  logout
}) => {
  const [task, setTask] = useState('');
  const categories = ['Travail', 'Personnel', 'Courses', 'Urgent'];

  const handleAddTask = () => {
    if (task.trim() && user) {
      const newTask = {
        id: Date.now(),
        text: task.trim(),
        completed: false,
        createdAt: new Date(),
        dueDate: null,
        category: selectedCategory === 'all' ? 'Personnel' : selectedCategory,
        priority: 'Moyenne',
        starred: false,
        userId: user.id
      };
      addTask(newTask);
      setTask('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAddTask();
  };

  return (
    <div className="p-8 border-b border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Gestionnaire de Tâches
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Bonjour, {user?.name}</span>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </div>
      
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 p-3 border-2 border-gray-100 rounded-xl focus:border-purple-300 outline-none transition-all duration-300"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 border-2 border-gray-100 rounded-xl focus:border-purple-300 outline-none transition-all duration-300"
        >
          <option value="all">Toutes les catégories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nouvelle tâche..."
          className="flex-1 p-3 border-2 border-gray-100 rounded-xl focus:border-purple-300 outline-none transition-all duration-300"
        />
        <button
          onClick={handleAddTask}
          className="p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition-all duration-300 hover:scale-105"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {
  addTask: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

export default Header;

