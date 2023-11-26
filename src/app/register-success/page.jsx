'use client';
import React, { useState } from 'react';
import styles from './RegisterSuccess.module.css';
import Link from 'next/link';
const RegisterSuccess = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Register successful</h1>
            <Link href="/login">
                <button className={styles.button}>Sign in now</button>
            </Link>
        </div>
    );
};

export default RegisterSuccess;
