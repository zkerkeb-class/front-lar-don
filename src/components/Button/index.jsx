const Button = ({ children, type = 'button', className = '', onClick = () => {}, ...props }) => {
  return (
    <button
      type={type}
      className={
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ' +
        className
      }
      {...props}
      onClick={onClick()}
    >
      {children}
    </button>
  );
};

export default Button;
