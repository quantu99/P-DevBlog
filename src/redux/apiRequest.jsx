'use client';
import axios from 'axios';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutFailed,
    logoutStart,
    logoutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from './authSlice';
import {
    getAllPostsFailed,
    getAllPostsStart,
    getAllPostsSuccess,
    getSinglePostFailed,
    getSinglePostStart,
    getSinglePostSuccess,
    postFailed,
    postStart,
    postSuccess,
} from './postSlice';
import { createNewCommentFailed, createNewCommentStart, createNewCommentSuccess } from './commentSlice';
import { getAllUsersFailed, getAllUsersStart, getAllUsersSuccess } from './userSlice';
export const loginUser = async (user, dispatch, router) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('https://p-devblog.onrender.com/v1/auth/login', user);
        dispatch(loginSuccess(res.data));
        router.push('/');
    } catch (err) {
        dispatch(loginFailed());
    }
};
export const registerUser = async (user, dispatch, router) => {
    dispatch(registerStart());
    try {
        const res = await axios.post('https://p-devblog.onrender.com/v1/auth/register', user);
        dispatch(registerSuccess(res.data));
        router.push('/register-success');
    } catch (err) {
        dispatch(registerFailed());
    }
};
export const logoutUser = async (accessToken, id, dispatch, router) => {
    dispatch(logoutStart());
    try {
        await axios.post('https://p-devblog.onrender.com/v1/auth/logout', id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(logoutSuccess());
        router.push('/login');
    } catch (err) {
        dispatch(logoutFailed());
    }
};
export const createNewPost = async (post, dispatch, router) => {
    dispatch(postStart());
    try {
        const res = await axios.post('https://p-devblog.onrender.com/v1/post', post);
        dispatch(postSuccess(res.data));
        router.push('/');
    } catch (err) {
        dispatch(postFailed());
    }
};
export const getAllPosts = async (dispatch) => {
    dispatch(getAllPostsStart());
    try {
        const res = await axios.get('https://p-devblog.onrender.com/v1/post/all');
        dispatch(getAllPostsSuccess(res.data));
    } catch (err) {
        dispatch(getAllPostsFailed());
    }
};
export const getSinglePost = async (id, dispatch) => {
    dispatch(getSinglePostStart());
    try {
        const res = await axios.get('https://p-devblog.onrender.com/v1/post/' + id);
        dispatch(getSinglePostSuccess(res.data));
    } catch (err) {
        dispatch(getSinglePostFailed());
    }
};
export const createNewComment = async (comment, dispatch) => {
    dispatch(createNewCommentStart());
    try {
        const res = await axios.post('https://p-devblog.onrender.com/v1/comment', comment);
        dispatch(createNewCommentSuccess(res.data));
    } catch (err) {
        dispatch(createNewCommentFailed());
    }
};
export const getAllUsers = async (dispatch) => {
    dispatch(getAllUsersStart());
    try {
        const res = await axios.get('https://p-devblog.onrender.com/v1/user/all');
        dispatch(getAllUsersSuccess(res.data));
    } catch (err) {
        dispatch(getAllUsersFailed());
    }
};
