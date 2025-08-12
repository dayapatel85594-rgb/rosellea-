import { createContext, useContext, useReducer, useEffect } from 'react';
import apiService from '../utils/apiService';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { token, user: parsedUser }
        });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (credentials) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const response = await apiService.login(credentials);
      if (response.success && response.token && response.user) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            token: response.token,
            user: response.user
          }
        });
        return { success: true };
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: response.message || 'Login failed'
        });
        return { success: false, error: response.message || 'Login failed' };
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message || 'Login failed'
      });
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const response = await apiService.register(userData);
      if (response.success) {
        // Registration successful, do not auto-login
        dispatch({ type: 'LOGIN_FAILURE', payload: null });
        return { success: true };
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: response.message || 'Registration failed'
        });
        return { success: false, error: response.message || 'Registration failed' };
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message || 'Registration failed'
      });
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = async (userData) => {
    try {
      const response = await apiService.updateProfile(userData);

      if (response.success) {
        const updatedUser = response.user;
        localStorage.setItem('user', JSON.stringify(updatedUser));

        dispatch({
          type: 'UPDATE_USER',
          payload: updatedUser
        });

        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};