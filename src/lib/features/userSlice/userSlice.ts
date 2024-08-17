import { createSlice } from "@reduxjs/toolkit";


export interface UserState {
    status: boolean;
    data: any;
}

const initialState: UserState = {
    status: false,
    data: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            // Magic
            // Immer will handle the mutation
            state.status = true;
            state.data = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.data = null;
        }
    },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;