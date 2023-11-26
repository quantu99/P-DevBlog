import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import postSlice from './postSlice';
import commentSlice from './commentSlice';
import userSlice from './userSlice';
const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
        comment: commentSlice,
        user: userSlice,
    },
});

export default store;
