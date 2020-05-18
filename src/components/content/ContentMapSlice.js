import { createSlice } from '@reduxjs/toolkit';

export const contentMapSlice = createSlice({
	name: 'content-map',
	initialState: {
		value: 0,
	},
	reducers: {
		mapProgress: (state, action) => {
			
			state = {value: action.payload};
			return state;
		},
	},
});

// expose methods as actions
export const { mapProgress } = contentMapSlice.actions;

export default contentMapSlice.reducer;
