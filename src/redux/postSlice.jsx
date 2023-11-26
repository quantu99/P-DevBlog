import { createSlice } from '@reduxjs/toolkit';
const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: {
            isFetching: false,
            success: false,
            error: false,
        },
        getAllPosts: {
            allPosts: null,
            isFetching: false,
            error: false,
        },
        getSinglePost: {
            singlePost: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        postStart: (state) => {
            state.post.isFetching = true;
        },
        postSuccess: (state) => {
            state.post.isFetching = false;
            state.post.success = true;
        },
        postFailed: (state) => {
            state.post.isFetching = false;
            state.post.error = true;
        },
        getAllPostsStart: (state) => {
            state.getAllPosts.isFetching = true;
        },
        getAllPostsSuccess: (state, action) => {
            state.getAllPosts.isFetching = false;
            state.getAllPosts.allPosts = action.payload;
        },
        getAllPostsFailed: (state) => {
            state.getAllPosts.isFetching = false;
            state.getAllPosts.error = true;
        },
        getSinglePostStart: (state) => {
            state.getSinglePost.isFetching = true;
        },
        getSinglePostSuccess: (state, action) => {
            state.getSinglePost.isFetching = false;
            state.getSinglePost.singlePost = action.payload;
        },
        getSinglePostFailed: (state) => {
            state.getSinglePost.isFetching = false;
            state.getSinglePost.error = true;
        },
    },
});
export const {
    postStart,
    postSuccess,
    postFailed,
    getAllPostsStart,
    getAllPostsFailed,
    getAllPostsSuccess,
    getSinglePostStart,
    getSinglePostSuccess,
    getSinglePostFailed,
} = postSlice.actions;
export default postSlice.reducer;
