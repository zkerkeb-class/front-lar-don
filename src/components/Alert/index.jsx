const Alert = ({ children, type = 'error' }) => {
  return (
    <div
      type={type}
      className={
        'border px-4 py-3 rounded relative mb-4 ' +
        (type === 'error'
          ? 'border-red-400 bg-red-100 text-red-700'
          : 'border-green-400 bg-green-100 text-green-700')
      }
    >
      {children}
    </div>
  );
};

export default Alert;
