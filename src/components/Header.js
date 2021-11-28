import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LayerActions from './LayerActions';

const Header = ({ stageRef }) => {
  const [mode, setMode] = useState(localStorage.getItem('dark-mode'));

  useEffect(() => {
    localStorage.setItem('dark-mode', mode);
    document.documentElement.className = mode;
  }, [mode]);

  function toggleTheme() {
    if (mode && mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  }
  window.ondragstart = () => false;

  function downloadURI(uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    console.log(uri);
    downloadURI(uri, 'stage.png');
  };
  return (
    <>
      <div className="fixed top-5 left-2 md:left-5 z-50 pb-2  select-none">
        <div className="border border-black dark:border-white bg-gray-100  shadow-inner rounded-lg dark:bg-gray-800 text-gray-800 dark:text-gray-50 font-bold py-2 px-4">
          Whiteboard
        </div>
      </div>
      <div className="flex gap-x-4 fixed top-5 right-2 md:right-5  select-none">
        <LayerActions handleExport={handleExport} />
        <div
          className="border border-black dark:border-white bg-gray-200 rounded-lg dark:bg-gray-700 text-gray-700 dark:text-gray-50 text-lg font-bold p-2 cursor-pointer"
          onClick={toggleTheme}
        >
          {mode && mode === 'dark' ? (
            <img src="./images/moon.png" alt="moon" height={25} width={25} />
          ) : (
            <img src="./images/sun.png" alt="sun" height={25} width={25} />
          )}
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  stageRef: PropTypes.any,
};

export default Header;
