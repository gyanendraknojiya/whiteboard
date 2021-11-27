import store from '../redux/store.js';
import { addLayers } from '../redux/boardSlice';

export const handleMouseDown = (e, isDrawing, dispatch) => {
  const { selectedTool, layers } = store.getState().boardReducer;
  const { strokeColor, strokeWidth } = store.getState().preferenceReducer;
  isDrawing.current = true;
  const pos = e.target.getStage().getPointerPosition();
  switch (selectedTool) {
    case 'pen':
    case 'eraser':
      dispatch(
        addLayers([
          ...layers,
          {
            tool: selectedTool,
            points: [pos.x, pos.y],
            strokeColor,
            strokeWidth,
          },
        ])
      );
      break;

    case 'square':
      let initSquare = {
        x: pos.x,
        y: pos.y,
        p: pos.x,
        q: pos.y,
      };
      dispatch(
        addLayers([
          ...layers,
          {
            tool: selectedTool,
            points: initSquare,
            strokeColor,
            strokeWidth,
          },
        ])
      );
      break;

    case 'triangle':
      let initTriangle = {
        x1: pos.x,
        y1: pos.y,
        x2: pos.x,
        y2: pos.y,
        x3: pos.x,
        y3: pos.y,
      };
      dispatch(
        addLayers([
          ...layers,
          {
            tool: selectedTool,
            points: initTriangle,
            strokeColor,
            strokeWidth,
          },
        ])
      );
      break;
  }
};

export const handleMouseMove = (e, isDrawing, dispatch) => {
  // no drawing - skipping
  if (!isDrawing.current) {
    return;
  }

  const { selectedTool, layers } = store.getState().boardReducer;
  const stage = e.target.getStage();
  const point = stage.getPointerPosition();

  let allLayers = [...layers];
  let lastLayer = allLayers[layers.length - 1];

  switch (selectedTool) {
    case 'pen':
    case 'eraser':
      lastLayer = {
        ...lastLayer,
        points: lastLayer.points.concat([point.x, point.y]),
      };
      allLayers.splice(layers.length - 1, 1, lastLayer);
      dispatch(addLayers(allLayers.concat()));

      break;
    case 'square':
      let init = {
        p: point.x,
        q: point.y,
      };
      lastLayer = {
        ...lastLayer,
        points: {
          ...lastLayer.points,
          ...init,
        },
      };

      allLayers.splice(layers.length - 1, 1, lastLayer);
      dispatch(addLayers(allLayers.concat()));

      break;
    case 'triangle':
      let initTriangle = {
        x2: point.x,
        y2: point.y,
        x3: point.x,
        y3: point.y,
      };
      lastLayer = {
        ...lastLayer,
        points: {
          ...lastLayer.points,
          ...initTriangle,
        },
      };

      allLayers.splice(layers.length - 1, 1, lastLayer);
      dispatch(addLayers(allLayers.concat()));

      break;
  }
};

export const handleMouseUp = (e, isDrawing) => {
  isDrawing.current = false;
};
