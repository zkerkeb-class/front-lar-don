import { Link } from 'react-router-dom';

function LardonLink({ to, children }) {
  return (
    <Link to={to} className='text-blue-500 hover:underline'>
      {children}
    </Link>
  );
}

export default LardonLink;
