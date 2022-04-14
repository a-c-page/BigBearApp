import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBr0omeiFrYpgUpMMXm5_isLtaOVbptmgU",
    authDomain: "big-bear-app.firebaseapp.com",
    projectId: "big-bear-app",
    storageBucket: "big-bear-app.appspot.com",
    messagingSenderId: "799071253302",
    appId: "1:799071253302:web:89e3f731b732d2da9f7997",
    measurementId: "G-QSMQCFVNRE",
};

const app = initializeApp(firebaseConfig);

export { app };
