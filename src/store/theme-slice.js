import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    isDark: localStorage.getItem('isDark') === null ? false : true
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialstate,
    reducers: {
        toggleTheme(state) {
            state.isDark = !state.isDark;
            localStorage.setItem('isDark', state.isDark);
        }
    }
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;