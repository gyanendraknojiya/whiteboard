import { addLines } from '../redux/boardSlice';

export const handleMouseDown = (
  e,
  isDrawing,
  selectedTool,
  lines,
  dispatch
) => {
  isDrawing.current = true;
  const pos = e.target.getStage().getPointerPosition();
  switch (selectedTool) {
    case 'pen':
    case 'eraser':
      dispatch(addLines([...lines, { selectedTool, points: [pos.x, pos.y] }]));
  }
};

export const handleMouseMove = (
  e,
  isDrawing,
  selectedTool,
  lines,
  dispatch
) => {
  // no drawing - skipping
  if (!isDrawing.current) {
    return;
  }
  const stage = e.target.getStage();
  const point = stage.getPointerPosition();
  switch (selectedTool) {
    case 'pen':
    case 'eraser':
      let allLines = [...lines];
      let lastLine = allLines[lines.length - 1];
      console.log(lastLine);
      // add point
      lastLine = {
        ...lastLine,
        points: lastLine.points.concat([point.x, point.y]),
      };
      // replace last
      allLines.splice(lines.length - 1, 1, lastLine);
      dispatch(addLines(allLines.concat()));
  }
};

export const handleMouseUp = (e, isDrawing) => {
  isDrawing.current = false;
};
