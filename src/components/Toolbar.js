import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearBoard, setSelectedTool } from '../redux/boardSlice';

import Popover from '@mui/material/Popover';

const Toolbar = () => {
  const [openBackgroundSelectPopover, setOpenBackgroundSelectPopover] =
    useState(false);
  const tools = ['pen', 'eraser', 'square', 'triangle', 'circle'];
  const selectedTool = useSelector((state) => state.boardReducer.selectedTool);
  const dispatch = useDispatch();

  window.ondragstart = () => false;

  const open = Boolean(openBackgroundSelectPopover);

  return (
    <div className="fixed left-5 top-24 z-50 pr-2 select-none">
      <div className="border border-black dark:border-white shadow-inner bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 py-5 px-2 rounded-lg">
        {tools.map((item) => (
          <div
            key={item}
            className={`p-2 cursor-pointer my-2 rounded-lg  ${
              selectedTool === item &&
              'shadow-inner shadow bg-yellow-300 dark:bg-yellow-500'
            }`}
            onMouseDown={() => dispatch(setSelectedTool(item))}
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
        <div
          className="p-2 relative cursor-pointer my-2 rounded-lg"
          onClick={(e) =>
            setOpenBackgroundSelectPopover(
              openBackgroundSelectPopover ? null : e.currentTarget
            )
          }
        >
          <img
            src="./icons/clear.png"
            className="filter dark:invert"
            alt="clear"
            height={25}
            width={25}
          />

          <Popover
            className="z-50"
            anchorEl={openBackgroundSelectPopover}
            open={open}
            onClose={() => setOpenBackgroundSelectPopover(null)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            The content of the Popover.
          </Popover>
        </div>
        <div
          className="p-2 cursor-pointer my-2 rounded-lg"
          onClick={() => dispatch(clearBoard())}
        >
          <img
            src="./icons/clear.png"
            className="filter dark:invert"
            alt="clear"
            height={25}
            width={25}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
