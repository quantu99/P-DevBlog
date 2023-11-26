'use client';
import React, { useEffect, useState } from 'react';
import styles from './SingleCategory.module.css';
import { getAllPosts } from '@/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import Post from '@/components/post/Post';
import Pagination from '@/components/pagination/Pagination';
const SingleCategory = ({ searchParams }) => {
    const { cat } = searchParams;
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
    const catPosts = allPosts?.filter((posts) => posts.cat.includes(`${cat}`));
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = catPosts?.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>{cat} Blog</h1>
            </div>

            <div className={styles.postContainer}>
                {currentPosts?.map((post) => (
                    <Post key={post?._id} post={post} />
                ))}
                <Pagination
                    currentPage={currentPage}
                    postsPerPage={postsPerPage}
                    totalPosts={catPosts?.length}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default SingleCategory;
