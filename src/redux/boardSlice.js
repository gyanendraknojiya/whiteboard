import { createSlice, current } from '@reduxjs/toolkit';
const initialState = {
  layers: [],
  undoLayers: [],
  selectedTool: 'pen',
};
export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addLayers: (state, action) => {
      state.layers = action.payload;
    },
    setSelectedTool: (state, action) => {
      state.selectedTool = action.payload;
    },
    clearBoard: (state) => {
      state.layers = [];
    },
    handleUndo: (state) => {
      const currentAllLayers = [...current(state).layers];
      if (currentAllLayers.length) {
        const lastLayer = currentAllLayers.at(-1);
        state.undoLayers.push(lastLayer);
        state.layers = [
          ...currentAllLayers.splice(0, currentAllLayers.length - 1),
        ];
      }
    },
    handleRedo: (state) => {
      const currentUndoLayers = [...current(state).undoLayers];
      if (currentUndoLayers.length) {
        const lastUndoLayer = currentUndoLayers.at(-1);
        state.layers.push(lastUndoLayer);
        state.undoLayers = [
          ...currentUndoLayers.splice(0, currentUndoLayers.length - 1),
        ];
      }
    },
  },
});
export const {
  addLayers,
  setSelectedTool,
  clearBoard,
  handleUndo,
  handleRedo,
} = boardSlice.actions;
export default boardSlice.reducer;
