import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSelectedTool } from '../redux/boardSlice';

const Toolbar = () => {
  const tools = ['pen', 'eraser', 'square', 'triangle', 'circle'];
  const selectedTool = useSelector((state) => state.boardReducer.selectedTool);
  const dispatch = useDispatch();
  return (
    <div className="fixed left-5 top-24 z-50">
      <div className="shadow-inner bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 py-8 p-2 rounded-lg">
        {tools.map((item) => (
          <div
            key={item}
            className={`p-2 cursor-pointer my-2 rounded-lg  ${
              selectedTool === item &&
              'shadow-inner-xl shadow bg-yellow-300 dark:bg-green-800'
            }`}
            onClick={() => dispatch(setSelectedTool(item))}
          >
            <img
              src={`./icons/${item}.png`}
              className="filter dark:invert"
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
