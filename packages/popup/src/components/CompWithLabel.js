import PropTypes from 'prop-types'

function CompWithLabel({label, children, className = ''}) {
  return (
    <div className={`${className}`}>
      <span className="text-gray-80 my-3 inline-block">{label}</span>
      {children}
    </div>
  )
}

CompWithLabel.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
}

export default CompWithLabel
