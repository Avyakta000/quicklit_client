import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.defaults.withCredentials = true;

// Axios response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response; 
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is a 401 and that this request has not been retried yet
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loop
      try {
        const response = await axiosInstance.post("/account/rest-auth/token/refresh/", {
            
          });
        console.log(response.data, 'response refresh')
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Cookie refresh failed:', err);
        return Promise.reject(err); // Reject if the refresh fails
      }
    }

    return Promise.reject(error); // Reject for any other errors
  }
);

export default axiosInstance;
