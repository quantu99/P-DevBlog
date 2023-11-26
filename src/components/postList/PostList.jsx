'use client';
import React, { useEffect, useState } from 'react';
import styles from './PostList.module.css';
import Post from '../post/Post';
import Pagination from '../pagination/Pagination';
import { getAllPosts } from '@/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
const PostList = () => {
    const dispatch = useDispatch();
    const allPosts = useSelector((state) => state.post.getAllPosts?.allPosts);
    const [isCallingAPI, setIsCallingAPI] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;
    useEffect(() => {
        if (!isCallingAPI) {
            setIsCallingAPI(true);
            getAllPosts(dispatch);
            setTimeout(() => {
                setIsCallingAPI(false);
            }, 10000);
        }
    }, [allPosts, isCallingAPI, dispatch]);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = allPosts?.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className={styles.container}>
            <p className={styles.heading}>New posts</p>
            {currentPosts?.map((post) => (
                <div key={post._id} className={styles.postContainer}>
                    <Post post={post} />
                </div>
            ))}
            <Pagination
                currentPage={currentPage}
                postsPerPage={postsPerPage}
                totalPosts={allPosts?.length}
                paginate={paginate}
            />
        </div>
    );
};

export default PostList;
