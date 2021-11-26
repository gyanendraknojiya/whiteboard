import React from 'react';

const Toolbar = () => {
  const tools = ['circle', 'square', 'triangle'];
  return (
    <div className='fixed left-5 top-24'>
      <div className='shadow-inner bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 py-8 p-2 rounded-lg'>
        {tools.map((item) => (
          <div key={item} className='p-2 cursor-pointer my-2 '>
            <img
              src={`./icons/${item}.png`}
              className='filter dark:invert'
              alt={item}
              height={25}
              width={25}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
