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
                <Link target="_blank" href={'https://www.facebook.com/quan.tu.353/'} className={styles.link}>
                    <Image alt="facebook" src="/facebook.png" width={24} height={24} className={styles.image} />
                </Link>
                <Link target="_blank" href={'https://github.com/quantu99'} className={styles.link}>
                    <Image alt="github" src="/github.png" width={24} height={24} className={styles.image} />
                </Link>
                <Link href="/" className={styles.link}>
                    <Image alt="linkedin" src="/linkedin.png" width={24} height={24} className={styles.image} />
                </Link>
                <Link target="_blank" href={'https://gmail.com'} className={styles.link}>
                    <Image alt="gmail" src="/gmail.png" width={24} height={24} className={styles.image} />
                </Link>
            </div>
            <div className={styles.logo}>PaulyBlog</div>
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
