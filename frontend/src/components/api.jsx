// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:2300/api',  
//   // baseURL: 'https://c3eval-nem-1.onrender.com/api',
// });


// export default instance;


import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-render-7zzl.onrender.com/api', // Adjust this based on your backend URL
});

// Interceptor to add the access token to every request
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post('/refresh-token', { refreshToken });
          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (err) {
          // Handle refresh token failure (e.g., logout the user)
          console.error(err);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login'; // Redirect to login page
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
