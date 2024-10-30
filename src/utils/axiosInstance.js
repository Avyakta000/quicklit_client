"use client";
import axios from 'axios';
import { handleLogout } from './helper';

let store, router;

// Inject dispatch and router for logout functionality
export const injectStore = (_store, _router) => {
  store = _store;
  router = _router;
};

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, 
  timeout: 20000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.defaults.withCredentials = true;

const MAX_RETRY_ATTEMPTS = 4; // Maximum number of retries
let retryCount = 0; // Initialize retry counter

// Axios response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response; 
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Check if the error is 401 (Unauthorized) and that this request hasn't been retried too many times
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Set flag to avoid retrying indefinitely
      
      // Increment retry counter
      retryCount += 1;
    
      // If retryCount exceeds the limit, stop retrying
      if (retryCount >= MAX_RETRY_ATTEMPTS) {
        localStorage.removeItem("q_exp")
        // const router = getRouter()
        handleLogout(store.dispatch, router);
        console.error('Max retry attempts reached. Logging out user.');
        retryCount = 0; 
        return Promise.reject(error); 
      }

      try {
        // Send request to refresh the token
        const response = await axiosInstance.post("/account/rest-auth/token/refresh/", {}, {
          withCredentials: true, 
        });

        console.log(response.data, 'response new 4 refresh');

        retryCount = 0; // Reset retry counter on successful refresh
        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Token refresh failed:', err);
        return Promise.reject(err); // Reject if the refresh fails
      }
    }

    return Promise.reject(error); // Reject for other errors
  }
);

export default axiosInstance;


