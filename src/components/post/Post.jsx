'use client';
import React, { useState } from 'react';
import styles from './Post.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { getSinglePost } from '@/redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
const Post = ({ post }) => {
    const dispatch = useDispatch();
    const handleClick = (postId) => {
        getSinglePost(postId, dispatch);
    };
    const [length, setLength] = useState(400);
    return (
        <div className={styles.container}>
            {post?.image && (
                <div className={styles.imageContainer}>
                    <Image src={post.image} fill alt="pic" className={styles.image} />
                </div>
            )}
            <div className={styles.contentContainer}>
                <div className={styles.categories}>
                    {post?.cat.map((catItem) => (
                        <Link href={`/categories?cat=${catItem}`} className={`${styles.category} ${styles[catItem]}`}>
                            {catItem}
                        </Link>
                    ))}
                </div>
                <div className={styles.author}>
                    <p className={styles.name}>{post.user.username} - </p>
                    <p className={styles.time}>{post.createdAt.substring(0, 10)}</p>
                </div>
                <h1 className={styles.title}>{post?.title}</h1>
                <p className={styles.description}>{post?.description.substring(0, length) + '...'}</p>
                <Link href={`posts/${post._id}`} onClick={() => handleClick(post._id)} className={styles.button}>
                    Read more
                </Link>
            </div>
        </div>
    );
};

export default Post;
