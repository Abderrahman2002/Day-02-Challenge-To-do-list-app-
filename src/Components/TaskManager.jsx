import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Facultatif, inclure si AuthContext est défini
import Header from './Header';
import TaskList from './TaskList';
import FilterBar from './FilterBar';
import Footer from './Footer';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { user, logout } = useAuth(); // Inclure seulement si vous utilisez un contexte d'authentification

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (!storedTasks) return [];
    return JSON.parse(storedTasks).map(task => ({
      ...task,
      createdAt: new Date(task.createdAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
    }));
  };

  useEffect(() => {
    setTasks(loadTasksFromLocalStorage());
  }, []);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <>
      <Header 
        addTask={addTask}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        user={user}
        logout={logout}
      />
      <FilterBar 
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      <TaskList 
        tasks={tasks}
        filter={filter}
        sortBy={sortBy}
        sortDirection={sortDirection}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
      <Footer tasks={tasks} />
    </>
  );
};

export default TaskManager;
