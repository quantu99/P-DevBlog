'use client';
import React, { useEffect, useState } from 'react';
import styles from './AuthLink.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { createNewPost, logoutUser } from '@/redux/apiRequest';
import { useRouter } from 'next/navigation';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '@/utils/firebase';
const storage = getStorage(app);
const AuthLink = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const id = user?._id;
    const accessToken = user?.accessToken;
    const [checked, setChecked] = useState(false);
    const [checked2nd, setChecked2nd] = useState(false);
    const [category, setCategory] = useState([]);
    const handleLogout = () => {
        logoutUser(accessToken, id, dispatch, router);
    };
    const handleAddCat = (e) => {
        const isChecked = e.target.checked;
        const value = e.target.value;
        if (isChecked) {
            setCategory((prevCat) => [...prevCat, value]);
        } else {
            setCategory((prevCat) => prevCat.filter((category) => category !== value));
        }
    };
    const [file, setFile] = useState(null);
    const [values, setValues] = useState({
        userId: '',
        title: '',
        description: '',
        image: '',
        cat: [],
    });
    useEffect(() => {
        setValues((prevValues) => ({
            ...prevValues,
            cat: category,
        }));
    }, [category]);
    useEffect(() => {
        setValues((prevValues) => ({
            ...prevValues,
            userId: id,
        }));
    }, [id]);
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
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
                            image: downloadURL,
                        });
                    });
                },
            );
        };
        file && upload();
    }, [file]);
    const handlePublish = (e) => {
        const newPost = {
            userId: values.userId,
            title: values.title,
            description: values.description,
            image: values.image,
            cat: values.cat,
        };
        createNewPost(newPost, dispatch, router);
        setCategory([]);
        setValues({
            ...values,
            title: '',
            description: '',
            image: '',
            cat: [],
        });
        setChecked(!checked);
    };
    return (
        <>
            {!user ? (
                <Link className={styles.link} href="/login">
                    Login
                </Link>
            ) : (
                <>
                    <label htmlFor="checkbox" className={styles.link}>
                        Write
                    </label>{' '}
                    <span onClick={handleLogout} className={styles.link}>
                        Logout
                    </span>
                    <input
                        onChange={() => setChecked(!checked)}
                        checked={checked}
                        type="checkbox"
                        id="checkbox"
                        className={styles.checkbox}
                        style={{ display: 'none' }}
                    />
                    <label onClick={() => setChecked2nd(false)} className={styles.writeForm}>
                        <h1 className={styles.writeTitle}>What's going on today, buddy?</h1>
                        <div className={styles.titleInputContainer}>
                            <input
                                onClick={() => setChecked2nd(false)}
                                value={values.title}
                                onChange={handleChange}
                                name="title"
                                className={styles.titleInput}
                                placeholder="Title"
                                type="text"
                            />
                            <div className={styles.radio} id="type">
                                <label htmlFor="radio-checkbox" className={styles.openRadio}>
                                    Categories
                                </label>
                                <div className={styles.menuRadio}>
                                    {category?.map((item) => (
                                        <div className={`${styles.category} ${styles[item]}`}>{item}</div>
                                    ))}
                                </div>
                                <input
                                    onChange={() => setChecked2nd(!checked2nd)}
                                    checked={checked2nd}
                                    type="checkbox"
                                    className={styles.checkboxRadio}
                                    id="radio-checkbox"
                                />
                                <div className={styles.listRadio}>
                                    <label className={styles.label} htmlFor="travel">
                                        Travel
                                    </label>
                                    <input
                                        onChange={handleAddCat}
                                        className={styles.input}
                                        id="travel"
                                        type="checkbox"
                                        name="option"
                                        value="travel"
                                    />{' '}
                                    <label className={styles.label} htmlFor="fashion">
                                        Fashion
                                    </label>
                                    <input
                                        id="fashion"
                                        onChange={handleAddCat}
                                        className={styles.input}
                                        type="checkbox"
                                        name="option"
                                        value="fashion"
                                    />{' '}
                                    <label className={styles.label} htmlFor="food">
                                        Food
                                    </label>
                                    <input
                                        onChange={handleAddCat}
                                        className={styles.input}
                                        type="checkbox"
                                        name="option"
                                        value="food"
                                        id="food"
                                    />{' '}
                                    <label className={styles.label} htmlFor="culture">
                                        Culture
                                    </label>
                                    <input
                                        onChange={handleAddCat}
                                        className={styles.input}
                                        type="checkbox"
                                        name="option"
                                        value="culture"
                                        id="culture"
                                    />{' '}
                                    <label className={styles.label} htmlFor="coding">
                                        Coding
                                    </label>
                                    <input
                                        onChange={handleAddCat}
                                        className={styles.input}
                                        type="checkbox"
                                        name="option"
                                        value="coding"
                                        id="coding"
                                    />{' '}
                                    <label className={styles.label} htmlFor="style">
                                        Style
                                    </label>
                                    <input
                                        onChange={handleAddCat}
                                        className={styles.input}
                                        type="checkbox"
                                        name="option"
                                        value="style"
                                        id="style"
                                    />{' '}
                                    <label className={styles.label} htmlFor="life">
                                        Life
                                    </label>
                                    <input
                                        onChange={handleAddCat}
                                        className={styles.input}
                                        type="checkbox"
                                        name="option"
                                        value="life"
                                        id="life"
                                    />{' '}
                                </div>
                            </div>
                        </div>
                        <textarea
                            onClick={() => setChecked2nd(false)}
                            value={values.description}
                            onChange={handleChange}
                            name="description"
                            className={styles.descInput}
                            placeholder="Tell your story..."
                        />
                        <label htmlFor="upload" className={styles.editContainer}>
                            <Image src="/plus.png" className={styles.plusImage} width={20} height={20} alt="plus" />
                            <label htmlFor="upload" className={styles.uploadContainer}>
                                <Image
                                    style={{ cursor: 'pointer' }}
                                    src="/image.png"
                                    className={styles.image}
                                    width={20}
                                    height={20}
                                    alt="image-upload"
                                />
                                <span style={{ cursor: 'pointer' }}> Add image</span>
                            </label>
                            <input
                                onChange={(e) => setFile(e.target.files[0])}
                                id="upload"
                                type="file"
                                style={{ display: 'none' }}
                            />
                        </label>
                        <button onClick={handlePublish} className={styles.button}>
                            Publish
                        </button>
                    </label>
                    <label htmlFor="checkbox" className={styles.overlay}></label>
                </>
            )}
            <div onClick={handleOpen} className={styles.burger}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
            {open && (
                <div className={styles.responsiveMenu}>
                    <Link href="/">Homepage</Link>
                    <Link href="/">About</Link>
                    <Link href="/">Contact</Link>
                    {!user ? (
                        <Link href="/login">Login</Link>
                    ) : (
                        <>
                            <Link href="/write">Write</Link> <span>Logout</span>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default AuthLink;
