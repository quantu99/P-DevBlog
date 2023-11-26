import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
    name: 'user',
    initialState: {
        getAllUsers: {
            allUsers: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getAllUsersStart: (state) => {
            state.getAllUsers.isFetching = true;
        },
        getAllUsersSuccess: (state, action) => {
            state.getAllUsers.isFetching = false;
            state.getAllUsers.allUsers = action.payload;
        },
        getAllUsersFailed: (state) => {
            state.getAllUsers.isFetching = false;
            state.getAllUsers.error = true;
        },
    },
});
export const { getAllUsersStart, getAllUsersSuccess, getAllUsersFailed } = userSlice.actions;
export default userSlice.reducer;
