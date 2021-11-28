import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  strokeColor: '#df0000',
  strokeWidth: 4,
  backgroundImage: 'grids',
};

export const preferenceSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setStrokeColor: (state, action) => {
      state.strokeColor = action.payload;
    },
    setStrokeWidth: (state, action) => {
      state.strokeWidth = action.payload;
    },
    setBackgroundImage: (state, action) => {
      state.backgroundImage = action.payload;
    },
  },
});

export const { setStrokeColor, setStrokeWidth, setBackgroundImage } =
  preferenceSlice.actions;
export default preferenceSlice.reducer;
