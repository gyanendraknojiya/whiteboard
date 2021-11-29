import React from 'react';

const Credit = () => {
  return (
    <div className="fixed flex gap-x-2 items-baseline	 bottom-2 right-2  text-black dark:text-white text-xs">
      Made with ❤️ by{' '}
      <a
        href="https://gyanendra.tech"
        target="_blank"
        rel="noreferrer"
        className="font-bold underline"
      >
        Gyanendra Knojiya
      </a>
      <a
        href="https://github.com/gyanendraknojiya/whiteboard"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="./images/github.png"
          className="filter dark:invert"
          alt="github"
          height={35}
          width={35}
        />
      </a>
    </div>
  );
};

export default Credit;
