import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardSlice';
import preferenceReducer from './preferenceSlice.js';

const store = configureStore({
  reducer: { boardReducer, preferenceReducer },
});

export default store;
