import axios from 'axios';
import store from '../../redux/Store';

const SpringbaseUrl = store.getState().url.SpringbaseUrl;

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${SpringbaseUrl}/users/login`, 
      { email, password }, 
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    const fullToken = response.headers['authorization'];
    if (!fullToken) {
      throw new Error('토큰이 응답에 없습니다.');
    }
    
    const token = fullToken.split(' ')[1]; // "Bearer" 제거

    
    // 응답 데이터와 함께 저장
    const userData = response.data;
    sessionStorage.setItem('userData', JSON.stringify(userData));


    return { token, userData };
  } catch (error) {
    console.error('로그인 실패:', error.response?.data || error.message);
    throw error;
  }
};





export const sendTokenToBackend = async (tokenId) => {
  try {
    const response = await axios.post(`${SpringbaseUrl}/users/api/google-login`, 
      { tokenId: tokenId }, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    
    const fullToken = response.headers['authorization'];
    if (!fullToken) {
      throw new Error('토큰이 응답에 없습니다.');
    }
    
    const token = fullToken.split(' ')[1]; // "Bearer" 제거

    
    const userData = response.data;
    // console.log('222=================');
    // console.log(userData);
    // console.log(userData);
    // console.log(userData);
    // console.log('=================');

    sessionStorage.setItem('userData', JSON.stringify(userData));
    // 응답 데이터와 함께 저장
    // const userData = response.data;

    // sessionStorage.setItem('userData', JSON.stringify(userData));
    return { token, userData };
  } catch (error) {
    console.error('Google 로그인 실패:', error.response?.data || error.message);
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
