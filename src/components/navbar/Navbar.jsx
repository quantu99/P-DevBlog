import React from 'react';
import styles from './Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import AuthLink from '../authLink/AuthLink';
import ThemeToggle from '../themeToggle/ThemeToggle';
const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.social}>
                <Image src="/facebook.png" alt="facebook" width={24} height={24} className={styles.image} />
                <Image src="/github.png" alt="github" width={24} height={24} className={styles.image} />
                <Image src="/linkedin.png" alt="linkedin" width={24} height={24} className={styles.image} />
                <Image src="/gmail.png" alt="gmail" width={24} height={24} className={styles.image} />
            </div>
            <div className={styles.logo}>Q-DevBlog</div>
            <div className={styles.navigation}>
                <ThemeToggle />
                <Link className={styles.link} href="/">
                    Homepage
                </Link>
                <Link className={styles.link} href="/">
                    Contact
                </Link>
                <Link className={styles.link} href="/">
                    About
                </Link>
                <AuthLink />
            </div>
        </div>
    );
};

export default Navbar;
