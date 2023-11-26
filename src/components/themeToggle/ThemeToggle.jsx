'use client';
import React, { useContext } from 'react';
import styles from './ThemeToggle.module.css';
import Image from 'next/image';
import { ThemeContext } from '@/context/ThemeContext';
const ThemeToggle = () => {
    const { toggle, theme } = useContext(ThemeContext);
    return (
        <div
            style={theme === 'dark' ? { left: 1, backgroundColor: '#fff' } : { right: 1, backgroundColor: '#0f172a' }}
            onClick={() => toggle()}
            className={styles.container}
        >
            <Image src="/moon.png" height={14} width={14} alt="moon" />
            <div
                style={
                    theme === 'dark' ? { left: 1, backgroundColor: '#0f172a' } : { right: 1, backgroundColor: '#fff' }
                }
                className={styles.switch}
            ></div>
            <Image src="/sun.png" height={14} width={14} alt="sun" />
        </div>
    );
};

export default ThemeToggle;
