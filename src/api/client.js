// src/api/client.js
import axios from 'axios';
import { auth } from '../config/firebase';


const BASE_URL = 'http://192.168.0.157:8080/api/v1';

const apiClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Intercept requests and attach the Firebase token automatically
apiClient.interceptors.request.use(
	async (config) => {
		const user = auth.currentUser;
		if (user) {
			const token = await user.getIdToken(true);
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default apiClient;
