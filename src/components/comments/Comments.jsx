'use client';
import React, { useEffect, useState } from 'react';
import styles from './Comments.module.css';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { createNewComment } from '@/redux/apiRequest';
import CommentPagination from '../commentPagination/CommentPagination';
const Comments = ({ singlePostId, singlePost }) => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const id = user?._id;
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        postId: '',
        userId: '',
        description: '',
    });
    useEffect(() => {
        setValues((prevValues) => ({
            ...prevValues,
            postId: singlePostId,
            userId: id,
        }));
    }, [singlePostId, id]);
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = () => {
        const newComment = {
            postId: values.postId,
            userId: values.userId,
            description: values.description,
        };
        createNewComment(newComment, dispatch);
        setValues({
            ...values,
            description: '',
        });
    };
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 6;
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = singlePost?.comment?.slice(indexOfFirstComment, indexOfLastComment);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className={styles.container}>
            <p className={styles.title}>Comments</p>
            {!user ? (
                <p>
                    Please{' '}
                    <Link className={styles.navigate} href="/login">
                        login
                    </Link>{' '}
                    to write your comment
                </p>
            ) : (
                <div className={styles.writeContainer}>
                    <textarea
                        value={values.description}
                        onChange={handleChange}
                        name="description"
                        placeholder="Write a comment..."
                        className={styles.input}
                    />
                    <button onClick={handleSubmit} className={styles.button}>
                        SEND
                    </button>
                </div>
            )}
            <div className={styles.commentsContainer}>
                {currentComments?.map((item) => (
                    <div key={item?._id} className={styles.comment}>
                        <div className={styles.info}>
                            {item?.user?.avatar && (
                                <Image
                                    src={item?.user?.avatar}
                                    height={60}
                                    width={60}
                                    alt="avatar"
                                    className={styles.avatar}
                                />
                            )}
                            <div className={styles.author}>
                                <span className={styles.name}>{item?.user?.username}</span>
                                <span className={styles.time}>{item?.createdAt.substring(0, 10)}</span>
                            </div>
                        </div>
                        <p className={styles.description}>{item?.description}</p>
                    </div>
                ))}
                <CommentPagination
                    currentPage={currentPage}
                    commentsPerPage={commentsPerPage}
                    totalComments={singlePost?.comment?.length}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default Comments;
