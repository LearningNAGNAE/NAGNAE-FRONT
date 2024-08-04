import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/api/nagnae/users';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/test`, 
      { email, password }, 
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    const fullToken = response.headers['authorization'];
    if (!fullToken) {
      throw new Error('토큰이 응답에 없습니다.');
    }
    
    const token = fullToken.split(' ')[1]; // "Bearer" 제거
    return token;
  } catch (error) {
    console.error('로그인 실패:', error.response?.data || error.message);
    throw error;
  }
};

export const setAuthToken = (token) => {
  sessionStorage.setItem('token', token);
};

export const getAuthToken = () => {
  return sessionStorage.getItem('token');
};

export const removeAuthToken = () => {
  sessionStorage.removeItem('token');
};