import jwt_decode from 'jwt-decode';

// Get the token from localStorage
export const getToken = () => localStorage.getItem('token');

// Save the token to localStorage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Remove the token from localStorage (logout)
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Decode the token to get user info
export const getUserInfo = () => {
  const token = getToken();
  if (token) {
    try {
      return jwt_decode(token);  // Decode the token to get user information
    } catch (error) {
      console.error("Failed to decode token", error);
      return null;
    }
  }
  return null;
};
