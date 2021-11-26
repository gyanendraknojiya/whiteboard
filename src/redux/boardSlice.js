import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  lines: [],
  selectedTool: 'pen',
};
export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addLines: (state, action) => {
      state.lines = action.payload;
    },
    setSelectedTool: (state, action) => {
      state.selectedTool = action.payload;
    },
  },
});
export const { addLines, setSelectedTool } = boardSlice.actions;
export default boardSlice.reducer;
