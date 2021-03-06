import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStrokeColor, setStrokeWidth } from '../redux/preferenceSlice';

const isDarkMode = () => {
  return localStorage.getItem('dark-mode') === 'dark';
};

const PreferenceSelector = () => {
  const { strokeColor, strokeWidth } = useSelector(
    (state) => state.preferenceReducer
  );
  const dispatch = useDispatch();

  const strokeWidthOptions = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
    { value: 11, label: 11 },
    { value: 12, label: 12 },
    { value: 13, label: 13 },
    { value: 14, label: 14 },
    { value: 15, label: 15 },
    { value: 16, label: 16 },
  ];

  const handleStrokeWidthChange = (e) =>
    dispatch(setStrokeWidth(e.target.value));

  const handleColorChange = (e) => dispatch(setStrokeColor(e.target.value));

  window.ondragstart = () => false;
  return (
    <div className="fixed bottom-5  left-2 md:left-5 z-50  select-none ">
      <div className="border border-black dark:border-white flex gap-x-3 shadow-inner bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 py-2 px-5 rounded-lg">
        <span title="Stroke Color" className="relative">
          <input
            type="color"
            className="absolute opacity-0 cursor-pointer z-10 left-0"
            style={{ height: 35, width: 35 }}
            value={strokeColor}
            onChange={handleColorChange}
          />
          <span
            className="block rounded shadow-inner"
            style={{ backgroundColor: strokeColor, height: 35, width: 35 }}
          />
        </span>
        <span title="Stroke Width" className="relative">
          <select
            value={strokeWidth}
            onChange={handleStrokeWidthChange}
            className="absolute opacity-0 cursor-pointer z-10 left-0 h-full w-full text-gray-800 text-center"
          >
            {strokeWidthOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <span
            className="block rounded shadow-inner bg-gray-200 dark:bg-gray-900 text-center pt-2"
            style={{ height: 35, width: 35 }}
          >
            {strokeWidth}
          </span>
        </span>
      </div>
    </div>
  );
};

export default PreferenceSelector;
