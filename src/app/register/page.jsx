'use client';
import React, { useEffect, useState } from 'react';
import styles from './Register.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { getAllUsers, registerUser } from '@/redux/apiRequest';
import { useRouter } from 'next/navigation';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '@/utils/firebase';
import validation from './validation';
const storage = getStorage(app);
const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const fetching = useSelector((state) => state.auth.register?.isFetching);
    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState(false);
    const [file, setFile] = useState(null);
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        avatar: '',
    });
    useEffect(() => {
        // Kiểm tra tính hợp lệ của các giá trị input
        const isValid =
            !values.username.indexOf(' ') !== -1 &&
            values.username.length >= 6 &&
            values.username !== '' &&
            !values.username.includes("'") &&
            /^[a-zA-Z0-9]+$/.test(values.username) &&
            values.email !== '' &&
            !values.email.indexOf(' ') !== -1 &&
            /\S+@\S+\.\S+/.test(values.email) &&
            !values.email.includes("'") &&
            values.password !== '' &&
            !values.password.indexOf(' ') !== -1 &&
            !values.password.includes("'") &&
            values.confirmPassword !== '' &&
            values.password.length >= 6 &&
            values.confirmPassword === values.password;
        setValid(isValid);
    }, [values]);
    useEffect(() => {
        getAllUsers(dispatch);
    }, []);
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const allUsers = useSelector((state) => state.user.getAllUsers?.allUsers);
    const allUsersUsername = allUsers?.map((user) => user.username);
    const allUsersEmail = allUsers?.map((user) => user.email);
    const checkUsername = (username) => {
        if (allUsersUsername.includes(username)) {
            return setUsernameError(true);
        }
    };
    const checkEmail = (email) => {
        if (allUsersEmail.includes(email)) {
            return setEmailError(true);
        }
    };
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
        setUsernameError(false);
        setErrors({});
    };
    useEffect(() => {
        const upload = () => {
            const name = new Date().getTime + file.name;
            const storageRef = ref(storage, name);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {},
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setValues({
                            ...values,
                            avatar: downloadURL,
                        });
                    });
                },
            );
        };
        file && upload();
    }, [file]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: values.username,
            email: values.email,
            password: values.password,
            avatar: values.avatar,
        };
        setErrors(validation(values));
        checkUsername(newUser.username);
        checkEmail(newUser.email);
        if (valid) {
            await registerUser(newUser, dispatch, router);
        }
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Register</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputContainer}>
                    <label htmlFor="username" className={styles.label}>
                        Username
                    </label>
                    <input onChange={handleChange} name="username" className={styles.input} id="username" type="text" />
                    {usernameError && <p className={styles.errors}>This username is already used, please try again.</p>}
                    {errors.username && <p className={styles.errors}>{errors.username}</p>}
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="email" className={styles.label}>
                        Email
                    </label>
                    <input onChange={handleChange} name="email" className={styles.input} id="email" type="text" />
                    {emailError && <p className={styles.errors}>This email is already used, please try again</p>}
                    {errors.email && <p className={styles.errors}>{errors.email}</p>}
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="password" className={styles.label}>
                        Password
                    </label>
                    <input
                        onChange={handleChange}
                        name="password"
                        className={styles.input}
                        id="password"
                        type="password"
                    />
                    {errors.password && <p className={styles.errors}>{errors.password}</p>}
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="confirmPassword" className={styles.label}>
                        Confirm password
                    </label>
                    <input
                        onChange={handleChange}
                        name="confirmPassword"
                        className={styles.input}
                        id="confirmPassword"
                        type="password"
                    />
                    {errors.confirmPassword && <p className={styles.errors}>{errors.confirmPassword}</p>}
                </div>
                <div className={styles.fileContainer}>
                    <label htmlFor="file">
                        <Image
                            style={{ cursor: 'pointer' }}
                            src="/empty-image.png"
                            height={40}
                            width={40}
                            className={styles.avatar}
                            alt="empty"
                        />
                    </label>
                    <label style={{ cursor: 'pointer' }} htmlFor="file" className={styles.label}>
                        Import your avatar
                    </label>
                    <input
                        onChange={(e) => setFile(e.target.files[0])}
                        name="avatar"
                        style={{ display: 'none' }}
                        className={styles.input}
                        id="file"
                        type="file"
                    />
                </div>
                <div className={styles.buttonContainer}>
                    {fetching && (
                        <button className={styles.loadingButton}>
                            <span className={styles.loadingBtnContent}>Please wait...</span>
                        </button>
                    )}
                    {!fetching && <button className={styles.button}>Sign in</button>}
                    <span>or</span>
                    <div className={styles.navigate}>
                        If this isn’t your first time on our site, you may already have an account with us.&nbsp;
                        <Link style={{ textDecoration: 'underline' }} href="/login">
                            Login here
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
