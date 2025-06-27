'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

// Create Auth Context
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  // Initialize axios instance
  const authAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  // Helper function to validate tokens
  const isTokenValid = useCallback(token => {
    if (!token) return false
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp * 1000 > Date.now()
    } catch {
      return false
    }
  }, [])

  // Add request interceptor to include auth token
  authAxios.interceptors.request.use(
    config => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  authAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // Handle token refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        // Differentiate between expired token and invalid token
        if (isTokenValid(accessToken)) {
          // Token exists but request failed - might be server-side invalidation
          logout();
          return Promise.reject(error);
        }
        
        try {
          const { data } = await refreshAuthToken();
          setAccessToken(data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return authAxios(originalRequest);
        } catch (refreshError) {
          // Handle refresh token expiration
          if (refreshError.response?.status === 401) {
            logout();
            router.push('/login?session_expired=true');
          }
          return Promise.reject(refreshError);
        }
      }
      
      // Handle other errors
      if (error.response?.status === 403) {
        router.push('/unauthorized');
      }
      
      return Promise.reject(error);
    }
  );

  // Check if user is authenticated on initial load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        if (storedUser && storedAccessToken && storedRefreshToken) {
          if (isTokenValid(storedAccessToken)) {
            setUser(JSON.parse(storedUser));
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
          } else if (isTokenValid(storedRefreshToken)) {
            // Access token expired but refresh token is valid
            await refreshAuthToken(storedRefreshToken);
          } else {
            // Both tokens expired
            logout();
          }
        }
      } catch (err) {
        console.error('Initialization error:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [isTokenValid]);

  // Set up token refresh timer
  useEffect(() => {
    let timeoutId;
    
    const scheduleRefresh = () => {
      if (accessToken) {
        try {
          const { exp } = JSON.parse(atob(accessToken.split('.')[1]));
          const expiresIn = exp * 1000 - Date.now();
          const refreshThreshold = 15000; // 15 seconds before expiration
          
          if (expiresIn < refreshThreshold) {
            refreshAuthToken().catch(logout);
          } else {
            timeoutId = setTimeout(() => {
              refreshAuthToken().catch(logout);
            }, expiresIn - refreshThreshold);
          }
        } catch (e) {
          console.error('Token parsing error:', e);
          logout();
        }
      }
    };

    scheduleRefresh();
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [accessToken]);

  // Register user
  const register = async userData => {
    try {
      setError(null)
      const { data } = await authAxios.post('/auth/register/', userData)
      console.log(data)
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
      return data
    } catch (err) {
      setError(err.response?.data || 'Registration failed')
      throw err
    }
  }

  // Login user
  const login = async credentials => {
    try {
      setError(null)
      const { data } = await authAxios.post('/auth/token/', credentials)
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('accessToken', data.access)
      localStorage.setItem('refreshToken', data.refresh)
      setUser(data.user)
      setAccessToken(data.access)
      setRefreshToken(data.refresh)
      return data
    } catch (err) {
      setError(err.response?.data || 'Login failed')
      throw err
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
    setAccessToken(null)
    setRefreshToken(null)
    router.push('/login')
  }

  // Refresh auth token
  const refreshAuthToken = async (customRefreshToken = null) => {
    try {
      const tokenToUse = customRefreshToken || refreshToken;
      if (!tokenToUse) throw new Error('No refresh token available');
      
      const { data } = await authAxios.post('/auth/token/refresh/',
        { refresh: tokenToUse }
      );
      
      localStorage.setItem('accessToken', data.access);
      setAccessToken(data.access);
      
      return data;
    } catch (err) {
      console.error('Token refresh failed:', err);
      throw err;
    }
  };

  // Verify account with OTP
  const verifyAccount = async verificationData => {
    try {
      setError(null)
      const { data } = await authAxios.post(
        '/auth/verify-account/',
        verificationData
      )
      return data
    } catch (err) {
      setError(err.response?.data || 'Verification failed')
      throw err
    }
  }

  // Resend OTP
  const resendOtp = async emailOrUsername => {
    try {
      setError(null)
      const { data } = await authAxios.post(
        '/auth/resend-otp/',
        emailOrUsername
      )
      return data
    } catch (err) {
      setError(err.response?.data || 'Failed to resend OTP')
      throw err
    }
  }

  // Update email
  const updateEmail = async emailData => {
    try {
      setError(null)
      const { data } = await authAxios.post('/auth/update-email/', emailData)
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user))
        setUser(data.user)
      }
      return data
    } catch (err) {
      setError(err.response?.data || 'Email update failed')
      throw err
    }
  }

  // Change password
  const changePassword = async passwordData => {
    try {
      setError(null)
      const { data } = await authAxios.post(
        '/auth/change-password/',
        passwordData
      )
      return data
    } catch (err) {
      setError(err.response?.data || 'Password change failed')
      throw err
    }
  }

  // Check if user is authenticated
  const isAuthenticated = () => {
    return isTokenValid(accessToken);
  };


  // Context value
  const value = {
    user,
    accessToken,
    loading,
    error,
    authAxios,
    register,
    login,
    logout,
    verifyAccount,
    resendOtp,
    updateEmail,
    changePassword,
    isAuthenticated,
    refreshAuthToken
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
