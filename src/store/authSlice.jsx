import {createSlice} from "@reduxjs/toolkit";

const token = localStorage.getItem('token') || null;
const email = localStorage.getItem("email") || null;
const fullName = localStorage.getItem("fullName") || ""; // Get saved name
const photoUrl = localStorage.getItem("photoUrl") || ""; // Get saved photo


const initialAuthState={    
    token:token,
    isLoggedIn:!!token,
    email: email,
    fullName: fullName,
    photoUrl: photoUrl,
}
 const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,    
    reducers: {
        login(state,action) {
            const { token, email } = action.payload;
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);
            state.token = token;
            state.isLoggedIn = true;
            state.email = email;  // Add email to state
        },
        logout(state) {
            localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("fullName");
      localStorage.removeItem("photoUrl");
      state.token = null;
      state.isLoggedIn = false;
      state.fullName = "";
      state.photoUrl = "";
        },
        updateProfile(state, action) {
            state.fullName = action.payload.fullName;
            state.photoUrl = action.payload.photoUrl;
            localStorage.setItem("fullName", action.payload.fullName);
            localStorage.setItem("photoUrl", action.payload.photoUrl);
          }
    }
})

export const authActions=authSlice.actions;
export default  authSlice.reducer;