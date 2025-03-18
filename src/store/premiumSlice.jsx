import { createSlice } from "@reduxjs/toolkit";

const initialPremiumState = {
    isPremiumActive: false
};

const premiumSlice = createSlice({
    name: "premium",
    initialState: initialPremiumState,
    reducers: {
        activatePremium(state) {
            state.isPremiumActive = true;
        },
        deactivatePremium(state) {
            state.isPremiumActive = false;
        }
    }
});

export const premiumActions = premiumSlice.actions;
export default premiumSlice.reducer;
