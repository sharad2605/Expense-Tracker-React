import { createSlice } from '@reduxjs/toolkit';

const initialDarkModeState = {
  isDarkMode: false, // Initial dark mode state
  isPremiumActivated: false,

};
 const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: initialDarkModeState,
  reducers: {
    toggleDarkMode: (state) => {
      if (state.isPremiumActivated) {
        state.isDarkMode = !state.isDarkMode;
      }
    },
    activatePremium: (state) => {
      state.isPremiumActivated = true;
    },
  },
});

export const darkModeActions = darkModeSlice.actions;

export default darkModeSlice.reducer;