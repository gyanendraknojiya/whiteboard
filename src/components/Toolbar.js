import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearBoard, setSelectedTool } from '../redux/boardSlice';

import Popover from '@mui/material/Popover';
import { setBackgroundImage } from '../redux/preferenceSlice';

const Toolbar = () => {
  const [openBackgroundSelectPopover, setOpenBackgroundSelectPopover] =
    useState(false);
  const tools = ['drag', 'pen', 'eraser', 'square', 'triangle', 'circle'];
  const bgImages = ['grids', 'dots', 'none'];
  const selectedTool = useSelector((state) => state.boardReducer.selectedTool);

  const { backgroundImage } = useSelector((state) => state.preferenceReducer);

  const dispatch = useDispatch();

  window.ondragstart = () => false;

  const open = Boolean(openBackgroundSelectPopover);

  return (
    <div className="fixed left-2 md:left-5 top-24 z-50 pr-2 select-none">
      <div className="border border-black dark:border-white shadow-inner bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 py-5 px-2 rounded-lg">
        {tools.map((item) => (
          <div
            key={item}
            title={item.toUpperCase()}
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
            src="./icons/background.png"
            className="filter dark:invert"
            alt="clear"
            height={25}
            width={25}
          />

          <Popover
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
            <div className="bg-gray-100 dark:bg-gray-800 py-2 text-yellow-600 dark:text-yellow-400 ">
              <div className="text-center">Change Background</div>
              <div className="flex gap-x-2 p-2 ">
                {bgImages.map((item) => (
                  <span
                    key={item}
                    title={item.toUpperCase()}
                    className="cursor-pointer my-2"
                    onMouseDown={() => dispatch(setBackgroundImage(item))}
                  >
                    <div
                      className={`p-1 rounded-lg overflow-hidden bg-white dark:bg-black  ${
                        backgroundImage === item &&
                        'shadow-inner border border-black dark:border-white'
                      }`}
                      style={{
                        height: 50,
                        width: 70,
                      }}
                    >
                      {item !== 'none' ? (
                        <img
                          src={`./images/${item}.png`}
                          className="filter dark:invert object-cover"
                          alt={item}
                          style={{
                            height: 200,
                            width: 200,
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-white dark:bg-gray-900" />
                      )}
                    </div>
                    <div className="text-gray-700 dark:text-gray-200 text-xs text-center mt-2">
                      {item.toUpperCase()}
                    </div>
                  </span>
                ))}
              </div>
            </div>
          </Popover>
        </div>
        <div
          className="p-2 cursor-pointer my-2 rounded-lg"
          onClick={() => dispatch(clearBoard())}
        >
          <img
            src="./icons/clear.png"
            className="filter dark:invert "
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
