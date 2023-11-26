'use client';
import React, { useEffect, useState } from 'react';
import styles from './Recommend.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts, getSinglePost } from '@/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
const Recommend = ({ singlePost }) => {
    const [length, setLength] = useState(100);
    const dispatch = useDispatch();
    const allPosts = useSelector((state) => state.post.getAllPosts?.allPosts);
    useEffect(() => {
        getAllPosts(dispatch);
    }, [dispatch]);
    const relatedPosts = allPosts?.filter((item) => {
        return singlePost?.cat?.some((element) => item.type === element.type);
    });
    const handleClick = (postId) => {
        getSinglePost(postId, dispatch);
    };
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <p className={styles.title}>Related to post</p>
                <p className={styles.titleSecond}>Editor recommend</p>
            </div>
            <div className={styles.menuPostsContainer}>
                {relatedPosts?.map((post) => (
                    <Link
                        key={post?._id}
                        href={`/posts/${post._id}`}
                        onClick={() => handleClick(post._id)}
                        className={styles.menuPosts}
                    >
                        {post?.image && (
                            <div className={styles.imageContainer}>
                                <Image src={post?.image} alt="menu-post" fill className={styles.image} />
                            </div>
                        )}
                        <div className={styles.detail}>
                            <div className={styles.catContainer}>
                                {post?.cat.map((item) => (
                                    <Link
                                        key={item}
                                        href={`/categories?cat=${item}`}
                                        className={`${styles.category} ${styles[item]}`}
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                            <p className={styles.description}>{post?.description?.substring(0, length) + '...'}</p>
                            <div className={styles.author}>
                                <span className={styles.name}>John Doe- </span>
                                <span className={styles.time}>10.04.2024</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Recommend;
