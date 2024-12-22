import PropTypes from 'prop-types';

const Footer = ({ tasks }) => {
  return (
    <div className="p-4 border-t border-gray-100 text-sm text-gray-500 flex justify-between">
      <span>{tasks.length} tâches au total</span>
      <span>{tasks.filter(t => t.completed).length} tâches terminées</span>
      <span>{tasks.filter(t => t.starred).length} tâches favorites</span>
    </div>
  );
};

Footer.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool.isRequired,
      starred: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default Footer;

