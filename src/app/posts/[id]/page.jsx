'use client';
import React, { useEffect, useState } from 'react';
import styles from './SinglePost.module.css';
import Image from 'next/image';
import Comments from '@/components/comments/Comments';
import MenuCategories from '@/components/menuCategories/MenuCategories';
import Recommend from '@/components/recommend/Recommend';
import { getSinglePost } from '@/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
const SinglePost = ({ params }) => {
    const dispatch = useDispatch();
    const { id } = params;
    const singlePost = useSelector((state) => state.post.getSinglePost?.singlePost);
    const [isCallingAPI, setIsCallingAPI] = useState(false);
    useEffect(() => {
        if (!isCallingAPI) {
            setIsCallingAPI(true);
            getSinglePost(id, dispatch);

            setTimeout(() => {
                setIsCallingAPI(false);
            }, 10000);
        }
    }, [singlePost?.comment, isCallingAPI, dispatch, id]);
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{singlePost?.title}</h1>
            <div className={styles.author}>
                {singlePost?.user?.avatar && (
                    <Image
                        src={singlePost.user.avatar}
                        alt="logo"
                        width={70}
                        height={70}
                        className={styles.logoImage}
                    />
                )}

                <div className={styles.infoContainer}>
                    <p className={styles.name}>{singlePost?.user?.email}</p>
                    <p className={styles.time}>{singlePost?.user?.createdAt.substring(0, 10)}</p>
                </div>
            </div>
            <div className={styles.postContainer}>
                <p className={styles.description}>{singlePost?.description}</p>
                {singlePost?.image && (
                    <div className={styles.imageContainer}>
                        <Image src={singlePost?.image} fill alt="writer-picture" className={styles.image}></Image>
                    </div>
                )}
            </div>
            <div className={styles.underContainer}>
                <div className={styles.commentsContainer}>
                    <Comments singlePost={singlePost} singlePostId={singlePost?._id} />
                </div>
                <div className={styles.menuContainer}>
                    <MenuCategories />
                    <Recommend singlePost={singlePost} />
                </div>
            </div>
        </div>
    );
};

export default SinglePost;
