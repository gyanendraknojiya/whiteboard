import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  strokeColor: '#0ff',
  strokeWidth: 4,
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
  },
});

export const { setStrokeColor, setStrokeWidth } = preferenceSlice.actions;
export default preferenceSlice.reducer;
