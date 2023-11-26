import { createSlice } from '@reduxjs/toolkit';
const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        createNewComment: {
            isFetching: false,
            success: false,
            error: false,
        },
    },
    reducers: {
        createNewCommentStart: (state) => {
            state.createNewComment.isFetching = true;
        },
        createNewCommentSuccess: (state) => {
            state.createNewComment.isFetching = false;
            state.createNewComment.success = true;
        },
        createNewCommentFailed: (state) => {
            state.createNewComment.isFetching = false;
            state.createNewComment.error = true;
        },
    },
});
export const { createNewCommentStart, createNewCommentSuccess, createNewCommentFailed } = commentSlice.actions;
export default commentSlice.reducer;
