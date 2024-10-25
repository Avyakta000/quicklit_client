import axios from 'axios';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ensure credentials (cookies) are included in requests
axiosInstance.defaults.withCredentials = true;

const MAX_RETRY_ATTEMPTS = 4; // Maximum number of retries
let retryCount = 0; // Initialize retry counter

// Axios response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Return successful responses as-is
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
        console.error('Max retry attempts reached. Logging out user.');
        retryCount = 0; // Reset retry counter after reaching the limit
        // Optionally, you can log out the user or redirect to login page here
        return Promise.reject(error); // Reject the request to stop further retries
      }

      try {
        // Send request to refresh the token
        const response = await axiosInstance.post("/account/rest-auth/token/refresh/", {}, {
          withCredentials: true, // Make sure to include cookies (refresh token) in the request
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



// import axios from 'axios';

// // Create Axios instance
// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, 
//   timeout: 10000, 
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Ensure credentials (cookies) are included in requests
// axiosInstance.defaults.withCredentials = true;

// // Axios response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response; // Return successful responses as-is
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if the error is 401 (Unauthorized) and that this request hasn't been retried
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Set flag to avoid retrying indefinitely

//       try {
//         // Send request to refresh the token
//         const response = await axiosInstance.post("/account/rest-auth/token/refresh/", {}, {
//           withCredentials: true, // Make sure to include cookies (refresh token) in the request
//         });

//         console.log(response.data, 'response new refresh');

//         // Retry the original request with the new token
//         return axiosInstance(originalRequest);
//       } catch (err) {
//         console.error('Token refresh failed:', err);
//         return Promise.reject(err); // Reject if the refresh fails
//       }
//     }

//     return Promise.reject(error); // Reject for other errors
//   }
// );

// export default axiosInstance;











