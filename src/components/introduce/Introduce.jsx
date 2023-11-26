import React from 'react';
import styles from './Introduce.module.css';
import Image from 'next/image';
const Introduce = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <b>Welcome to Q-DevBlog!</b> Discover my stories and something cool here
            </h1>
            <div className={styles.post}>
                <div className={styles.textContainer}>
                    <h1 className={styles.textTitle}>Why is Octopus?</h1>
                    <p className={styles.description}>
                        Since 2010, i began to watch the football. And at that time, the biggest event of Fooball on the
                        world was organized. Exactly, it was World Cup 2010 in South Africa. And in that event, we had a
                        special octopus called Paul, he could forecast the match result accurately. And that thing made
                        me impressed. This is reason why i get my name is Paul.
                    </p>
                    <button className={styles.button}>Read more</button>
                </div>
                <div className={styles.imageContainer}>
                    <img src="/logo.jfif" className={styles.image} />
                </div>
            </div>
        </div>
    );
};

export default Introduce;
