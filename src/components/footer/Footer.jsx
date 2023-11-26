import React from 'react';
import styles from './Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.introduce}>
                <div className={styles.logoContainer}>
                    <Image src="/logo.jfif" width={60} height={60} alt="logo" className={styles.logoImage} />
                    <p className={styles.logo}>PaulyBlog</p>
                </div>
                <div className={styles.textContainer}>
                    <p className={styles.text}>
                        Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries
                        for previewing layouts and visual mockups.
                    </p>
                </div>
                <div className={styles.social}>
                    <Link target="_blank" href={'https://www.facebook.com/quan.tu.353/'} className={styles.link}>
                        <Image alt="facebook" src="/facebook.png" width={30} height={30} className={styles.image} />
                    </Link>
                    <Link target="_blank" href={'https://github.com/quantu99'} className={styles.link}>
                        <Image alt="github" src="/github.png" width={30} height={30} className={styles.image} />
                    </Link>
                    <Link href="/" className={styles.link}>
                        <Image alt="linkedin" src="/linkedin.png" width={30} height={30} className={styles.image} />
                    </Link>
                    <Link target="_blank" href={'https://gmail.com'} className={styles.link}>
                        <Image alt="gmail" src="/gmail.png" width={30} height={30} className={styles.image} />
                    </Link>
                </div>
            </div>
            <div className={styles.navigation}>
                <div className={styles.links}>
                    <h1 className={styles.linksHeading}>Links</h1>
                    <ul className={styles.linksList}>
                        <li className={styles.linksListItem}>Homepage</li>
                        <li className={styles.linksListItem}>Contact</li>
                        <li className={styles.linksListItem}>About</li>
                    </ul>
                </div>
                <div className={styles.links}>
                    <h1 className={styles.linksHeading}>Tags</h1>
                    <ul className={styles.linksList}>
                        <li className={styles.linksListItem}>Style</li>
                        <li className={styles.linksListItem}>Fashion</li>
                        <li className={styles.linksListItem}>Life</li>
                        <li className={styles.linksListItem}>Coding</li>
                    </ul>
                </div>{' '}
                <div className={styles.links}>
                    <h1 className={styles.linksHeading}>Social</h1>
                    <ul className={styles.linksList}>
                        <li className={styles.linksListItem}>Facebook</li>
                        <li className={styles.linksListItem}>Github</li>
                        <li className={styles.linksListItem}>Linkedin</li>
                        <li className={styles.linksListItem}>Gmail</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
