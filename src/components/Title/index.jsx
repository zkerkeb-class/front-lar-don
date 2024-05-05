const Title = ({ level = 1, children, className = '' }) => {
  const Tag = `h${level}`;
  return <Tag className={'text-3xl text-lolGold-2 font-serif font-bold mb-4 ' + className}>{children}</Tag>;
}

export default Title;