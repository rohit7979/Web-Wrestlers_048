import axios from 'axios';

const API_BASE_URL = 'http://localhost:9090';

export const getUserData = (token) => {
  return axios.get(`${API_BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePassword = (token, student_password) => {
  return axios.post(`${API_BASE_URL}/user/changePassword`, { student_password }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProject = (token, projectData) => {
  return axios.post(`${API_BASE_URL}/project/update`, projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
