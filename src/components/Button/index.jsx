const Button = ({ children, type = 'button', className = '', disabled = false, onClick = () => {}, ...props }) => {
  return (
    <button
      type={type}
      className={
        'bg-lolGrey-black text-lolGold-2 font-bold py-2 px-4 rounded ' +
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
