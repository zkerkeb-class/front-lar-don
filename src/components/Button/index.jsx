const Button = ({ children, type = 'button', className = '', disabled = false, onClick = () => {}, ...props }) => {
  return (
    <button
      type={type}
      className={
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ' +
        className +
        (disabled ? ' opacity-50 pointer-events-none' : '')
      }
      {...props}
      onClick={onClick()}
    >
      {children}
    </button>
  );
};

export default Button;
