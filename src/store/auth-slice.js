import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    token: localStorage.getItem('user'),
    userEmail: localStorage.getItem('userEmail'),
    isLoggedIn: localStorage.getItem("isLoggedIn"),
    isPremium: localStorage.getItem("isPremium")
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.userEmail = action.payload.email;
            localStorage.setItem("user", action.payload.token);
            localStorage.setItem("userEmail", action.payload.email);
            state.isLoggedIn = true;
            localStorage.setItem("isLoggedIn", true);
        },

        logout(state) {
            state.token = null;
            state.userEmail = null;
            localStorage.removeItem("user");
            localStorage.removeItem("userEmail");
            state.isLoggedIn = false;
            localStorage.removeItem("isLoggedIn");
        },
        setIsPremium(state) {
            state.isPremium = true;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;