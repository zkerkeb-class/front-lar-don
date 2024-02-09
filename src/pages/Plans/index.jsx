import React from 'react';

function Plans () {
  return (
    <div className='flex justify-center'>
      <div className='w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold mb-4'>Plan 1</h1>
        <ul className='list-disc pl-6'>
          <li>Advantage 1</li>
          <li>Advantage 2</li>
          <li>Advantage 3</li>
        </ul>
      </div>
      <div className='w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg mx-4'>
        <h1 className='text-2xl font-bold mb-4'>Plan 2</h1>
        <ul className='list-disc pl-6'>
          <li>Advantage 1</li>
          <li>Advantage 2</li>
          <li>Advantage 3</li>
        </ul>
      </div>
      <div className='w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold mb-4'>Plan 3</h1>
        <ul className='list-disc pl-6'>
          <li>Advantage 1</li>
          <li>Advantage 2</li>
          <li>Advantage 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Plans;
