import { Button, ButtonGroup } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleRedo, handleUndo } from '../redux/boardSlice';

const LayerActions = () => {
  const { layers, undoLayers, redoLayers } = useSelector(
    (state) => state.boardReducer
  );

  const dispatch = useDispatch();

  return (
    <ButtonGroup
      variant="outlined"
      color="success"
      className=" border border-black dark:border-white shadow-inner bg-gray-100 dark:bg-gray-700  "
    >
      <Button
        disabled={Boolean(!layers.length)}
        onClick={() => dispatch(handleUndo())}
      >
        <img
          src="./icons/undo.png"
          className="filter dark:invert "
          alt="clear"
          height={25}
          width={25}
        />
      </Button>
      <Button
        disabled={Boolean(!undoLayers.length)}
        onClick={() => dispatch(handleRedo())}
      >
        <img
          src="./icons/redo.png"
          className="filter dark:invert "
          alt="clear"
          height={25}
          width={25}
        />
      </Button>
    </ButtonGroup>
  );
};

export default LayerActions;
