import { configureStore } from '@reduxjs/toolkit';
import scrollReducer from '../utils/scroll/ScrollSlice';
import smoothScrollReducer from '../utils/scroll/SmoothScroll';
import contentMapReducer from '../components/content/ContentMapSlice';

export default configureStore({
  reducer: {
    scrollReducer: scrollReducer,
    smoothScrollReducer: smoothScrollReducer,
    contentMapReducer: contentMapReducer
  }
});
