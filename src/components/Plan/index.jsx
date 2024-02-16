import Text from '../Text';
import Title from '../Title';

const Plan = ({ name, items, price, className = '' }) => {
  return (
    <div
      className={
        'transition-all duration-300 bg-gray-100 p-6 rounded-lg shadow-lg hover:bg-white hover:shadow-xl hover:scale-105 ' +
        className
      }
    >
      <Title level={3} className='mb-1'>
        {name}
      </Title>

      <ul className='list-disc pl-6 mb-4'>
        {items.map((item, index) => (
          <li key={index + item}>{item}</li>
        ))}
      </ul>

      <Text className='font-semibold text-xl'>{price}</Text>
    </div>
  );
};

export default Plan;
