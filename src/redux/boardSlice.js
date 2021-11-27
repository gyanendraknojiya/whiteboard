import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  layers: [],
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
  },
});
export const { addLayers, setSelectedTool, clearBoard } = boardSlice.actions;
export default boardSlice.reducer;
