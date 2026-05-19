import { initializeApp } from 'firebase/app';
import {
	getAuth,
	initializeAuth,
	getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
	apiKey: 'AIzaSyCdJPHXwwuP_tpArlpWsrRgaiDXqyWzcW4',
	authDomain: 'dreamtales-4c8ff.firebaseapp.com',
	projectId: 'dreamtales-4c8ff',
	storageBucket: 'dreamtales-4c8ff.firebasestorage.app',
	messagingSenderId: '844889440943',
	appId: '1:844889440943:web:67232507e30276c4930a5a',
	measurementId: 'G-ZJV092NGRB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage so the child stays logged in
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
