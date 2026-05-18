import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'YOUR_API_KEY',
	authDomain: 'dreamtales-app.firebaseapp.com',
	projectId: 'dreamtales-app',
	storageBucket: 'dreamtales-app.appspot.com',
	messagingSenderId: 'YOUR_SENDER_ID',
	appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
export default app;
