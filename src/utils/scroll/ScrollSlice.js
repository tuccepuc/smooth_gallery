import { createSlice } from '@reduxjs/toolkit';

export const scrollSlice = createSlice({
	name: 'scroller',
	initialState: {
		value: 0,
	},
	reducers: {
		updateScroll: (state, action) => {
			
			// TODO :: height calc needs to go elsewhere
			var body = document.body,
			html = document.documentElement;

			var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ) - window.innerHeight;
			
			// min-scroll
			if ((state.value + action.payload) < 0) 
			{
				state = {value : 0};
				return state;
			}
			// max-scroll
			else if ((state.value + action.payload) > height)
			{
				state = {value : height};
				return state;
			}
			else
			{
				state.value += action.payload;
			}
		},
	},
});

// expose methods as actions
export const { updateScroll } = scrollSlice.actions;

export default scrollSlice.reducer;
