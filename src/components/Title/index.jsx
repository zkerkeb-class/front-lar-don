function Title({ level, children }) {
  const Tag = `h${level}`;
  return <Tag className='text-2xl font-bold mb-4'>{children}</Tag>;
}

export default Title;