import React, { useState } from 'react';
import './App.css';
import { Layer, Line, Stage, Rect, Circle } from 'react-konva';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
} from './lib/boardEventHandlers';
import { useSelector, useDispatch } from 'react-redux';
import PreferenceSelector from './components/PreferenceSelector';
import { addLayers } from './redux/boardSlice';

var App = () => {
  const isDrawing = React.useRef(false);
  const { layers, selectedTool } = useSelector((state) => state.boardReducer);
  const { backgroundImage } = useSelector((state) => state.preferenceReducer);

  const dispatch = useDispatch();

  const mouseDown = (e) => {
    handleMouseDown(e, isDrawing, dispatch);
  };

  const mouseMove = (e) => {
    handleMouseMove(e, isDrawing, dispatch);
  };

  const mouseUp = (e) => {
    handleMouseUp(e, isDrawing);
  };

  const getCursor = () => {
    switch (selectedTool) {
      case 'pen':
        return 'cursor-pen';
      case 'eraser':
        return 'cursor-eraser';
      case 'drag':
        return 'drag';
      default:
        return 'crosshair';
    }
  };

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={mouseDown}
        onMousemove={mouseMove}
        onMouseup={mouseUp}
        onTouchStart={mouseDown}
        onTouchMove={mouseMove}
        onTouchEnd={mouseUp}
        onTouchCancel={mouseUp}
        style={{
          backgroundImage: `url(./images/${backgroundImage}.png)`,
        }}
        className={`${getCursor()} dark:bg-gray-900`}
      >
        <Layer>
          {layers.map((layer, i) => (
            <>
              {(layer.tool === 'pen' || layer.tool === 'eraser') && (
                <Line
                  key={i}
                  id={i}
                  points={layer.points}
                  stroke={layer.strokeColor}
                  strokeWidth={layer.strokeWidth}
                  tension={0.5}
                  lineCap="round"
                  globalCompositeOperation={
                    layer.tool === 'eraser' ? 'destination-out' : 'source-over'
                  }
                  draggable={selectedTool === 'drag'}
                />
              )}
              {layer.tool === 'square' && (
                <Rect
                  key={i}
                  id={i}
                  x={layer.points.x}
                  y={layer.points.y}
                  width={layer.points.p - layer.points.x}
                  height={layer.points.q - layer.points.y}
                  points={layer.points}
                  stroke={layer.strokeColor}
                  strokeWidth={layer.strokeWidth}
                  draggable={selectedTool === 'drag'}
                />
              )}
              {layer.tool === 'triangle' && (
                <Line
                  key={i}
                  id={i}
                  x={layer.points.x1}
                  y={layer.points.y1}
                  points={[
                    (layer.points.x2 - layer.points.x1) / 2,
                    0,
                    0,
                    layer.points.y2 - layer.points.y1,
                    layer.points.x3 - layer.points.x1,
                    layer.points.y3 - layer.points.y1,
                  ]}
                  tension={0}
                  closed
                  stroke={layer.strokeColor}
                  strokeWidth={layer.strokeWidth}
                />
              )}
              {layer.tool === 'circle' && (
                <>
                  <Circle
                    key={i}
                    id={i}
                    x={
                      layer.points.p +
                      Math.min(
                        layer.points.x - layer.points.p,
                        layer.points.y - layer.points.q
                      ) /
                        2
                    }
                    y={
                      layer.points.q +
                      Math.min(
                        layer.points.x - layer.points.p,
                        layer.points.y - layer.points.q
                      ) /
                        2
                    }
                    radius={
                      Math.min(
                        Math.abs(layer.points.y - layer.points.q),
                        Math.abs(layer.points.x - layer.points.p)
                      ) / 2
                    }
                    stroke={layer.strokeColor}
                    strokeWidth={layer.strokeWidth}
                  />
                </>
              )}
            </>
          ))}
        </Layer>
      </Stage>
      <Header />
      <Toolbar />
      <PreferenceSelector />
    </div>
  );
};

export default App;
