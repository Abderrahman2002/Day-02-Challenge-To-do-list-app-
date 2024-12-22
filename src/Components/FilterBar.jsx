import { ArrowUp, ArrowDown } from 'lucide-react';
import PropTypes from 'prop-types';

const FilterBar = ({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection
}) => {
  return (
    <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
      <div className="flex gap-2">
        {['all', 'active', 'completed', 'starred'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 
              ${filter === f ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-200'}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="flex gap-2 items-center">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border border-gray-200 rounded-lg"
        >
          <option value="date">Date</option>
          <option value="priority">Priorité</option>
          <option value="alphabetical">Alphabétique</option>
        </select>
        <button
          onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
          className="p-2 hover:bg-gray-200 rounded-lg transition-all duration-300"
        >
          {sortDirection === 'asc' ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
        </button>
      </div>
    </div>
  );
};

FilterBar.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
  sortDirection: PropTypes.string.isRequired,
  setSortDirection: PropTypes.func.isRequired,
};

export default FilterBar;

