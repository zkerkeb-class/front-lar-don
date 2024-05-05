import { Link } from 'react-router-dom';

const LardonLink = ({
  to,
  children,
  className = '',
  active = false,
  onClick = () => {},
}) => {
  return (
    <Link
      to={to}
      className={'transition-all duration-100 text-blue-500 ' + className}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default LardonLink;
