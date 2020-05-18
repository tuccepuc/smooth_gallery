import { createSlice } from '@reduxjs/toolkit';

export const smoothScrollSlice = createSlice({
	name: 'smooth-scroll',
	initialState: {
		value: 0,
	},
	reducers: {
		calculatedScroll: (state, action) => {
			
			state.value = action.payload;
		},
	},
});

// expose methods as actions
export const { calculatedScroll } = smoothScrollSlice.actions;

export default smoothScrollSlice.reducer;
