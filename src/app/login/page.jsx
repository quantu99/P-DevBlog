'use client';
import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { loginUser } from '@/redux/apiRequest';
import { useRouter } from 'next/navigation';
import validation from './validation';
const Login = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const router = useRouter();
    const dispatch = useDispatch();
    const fetching = useSelector((state) => state.auth.login?.isFetching);
    const loginError = useSelector((state) => state.auth.login?.error);
    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState(false);
    const [values, setValues] = useState({
        username: '',
        password: '',
    });
    console.log(values);
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
        setErrors({});
    };
    useEffect(() => {
        const isValid =
            values.username !== '' &&
            !values.username.indexOf(' ') !== -1 &&
            /^[a-zA-Z0-9]+$/.test(values.username) &&
            values.password !== '' &&
            !values.password.includes("'") &&
            !values.password.indexOf(' ') !== -1;
        setValid(isValid);
    }, [values]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: values.username,
            password: values.password,
        };
        setErrors(validation(values));
        if (valid) {
            await loginUser(user, dispatch, router);
        }
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputContainer}>
                    <label htmlFor="username" className={styles.label}>
                        Username
                    </label>
                    <input name="username" onChange={handleChange} className={styles.input} id="username" type="text" />
                    {errors.username && <p className={styles.errors}>{errors.username}</p>}
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="password" className={styles.label}>
                        Password
                    </label>
                    <input
                        name="password"
                        onChange={handleChange}
                        className={styles.input}
                        id="password"
                        type="password"
                    />
                    {errors.password && <p className={styles.errors}>{errors.password}</p>}
                </div>
                {loginError && !user && <p className={styles.errors}>Something went wrong, please try again!</p>}

                <div className={styles.buttonContainer}>
                    {fetching && (
                        <button className={styles.loadingButton}>
                            <span className={styles.loadingBtnContent}>Please wait...</span>
                        </button>
                    )}
                    {!fetching && <button className={styles.button}>Sign in</button>}
                    <span>or</span>
                    <div className={styles.navigate}>
                        If you are new, you can create your account in&nbsp;
                        <Link style={{ textDecoration: 'underline' }} href="/register">
                            here
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
