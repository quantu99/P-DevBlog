import React from 'react';
import styles from './MenuCategories.module.css';
import Link from 'next/link';
const MenuCategories = () => {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <p className={styles.title}>Discover by topic</p>
                <p className={styles.titleSecond}>Categories</p>
            </div>
            <div className={styles.categories}>
                <Link href={`/categories?cat=travel`} className={`${styles.category} ${styles.travel}`}>
                    Travel
                </Link>
                <Link href={`/categories?cat=food`} className={`${styles.category} ${styles.food}`}>
                    Food
                </Link>
                <Link href={`/categories?cat=culture`} className={`${styles.category} ${styles.culture}`}>
                    Culture
                </Link>
                <Link href={`/categories?cat=coding`} className={`${styles.category} ${styles.coding}`}>
                    Coding
                </Link>
                <Link href={`/categories?cat=style`} className={`${styles.category} ${styles.style}`}>
                    Style
                </Link>
                <Link href={`/categories?cat=life`} className={`${styles.category} ${styles.life}`}>
                    Life
                </Link>
                <Link href={`/categories?cat=fashion`} className={`${styles.category} ${styles.fashion}`}>
                    Fashion
                </Link>
            </div>
        </div>
    );
};

export default MenuCategories;
