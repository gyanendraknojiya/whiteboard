import React, { useState } from 'react';
import './App.css';
import { Layer, Line, Stage } from 'react-konva';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
} from './lib/boardEventHandlers';
import { useSelector, useDispatch } from 'react-redux';

var App = () => {
  const isDrawing = React.useRef(false);
  const selectedTool = useSelector((state) => state.boardReducer.selectedTool);
  const lines = useSelector((state) => state.boardReducer.lines);
  const dispatch = useDispatch();

  const mouseDown = (e) => {
    handleMouseDown(e, isDrawing, selectedTool, lines, dispatch);
  };

  const mouseMove = (e) => {
    handleMouseMove(e, isDrawing, selectedTool, lines, dispatch);
  };

  const mouseUp = (e) => {
    handleMouseUp(e, isDrawing);
  };

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={mouseDown}
        onMousemove={mouseMove}
        onMouseup={mouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.selectedTool === 'eraser'
                  ? 'destination-out'
                  : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
      <Header />
      <Toolbar />
    </div>
  );
};

export default App;
