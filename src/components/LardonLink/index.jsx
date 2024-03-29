import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const LardonLink = ({
  to,
  children,
  className = '',
  active = false,
  onClick = () => {},
}) => {
  useEffect(() => {
    console.log(to, active);
  }, []);

  return (
    <Link
      to={to}
      className={
        'transition-all duration-100 text-blue-500 ' +
        (active ? ' active text-black ' : ' hover:text-slate-500 ') +
        className
      }
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default LardonLink;
