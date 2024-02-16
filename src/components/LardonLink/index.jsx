import { Link } from 'react-router-dom';

const LardonLink = ({ to, children, className = '' }) => {
  return (
    <Link to={to} className={'text-blue-500 hover:underline ' + className}>
      {children}
    </Link>
  );
};

export default LardonLink;
