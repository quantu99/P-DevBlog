// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBE_CzMByuoSWPbWKj5f50Qy98HRV7MG4k',
    authDomain: 'blog-app-5070e.firebaseapp.com',
    projectId: 'blog-app-5070e',
    storageBucket: 'blog-app-5070e.appspot.com',
    messagingSenderId: '130117492902',
    appId: '1:130117492902:web:4faea18bae76ae4d3ad467',
    measurementId: 'G-FW7FKN322N',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
