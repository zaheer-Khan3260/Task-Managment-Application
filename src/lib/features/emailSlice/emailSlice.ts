import { createSlice } from "@reduxjs/toolkit";


export interface EmailState {
    email: string;
}

const initialState: EmailState = {
    email: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        add: (state, action) => {
            // Magic
            // Immer will handle the mutation
            state.email = action.payload;
        },
        remove: (state) => {
            state.email = '';
        }
    },
});

// Action creators are generated for each case reducer function
export const { add, remove } = userSlice.actions;

export default userSlice.reducer;