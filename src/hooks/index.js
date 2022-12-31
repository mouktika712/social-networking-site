import { useContext, useState } from 'react';
import { login as userLogin } from '../api';
import { AuthContext } from '../providers/AuthProvider';
import { setItemInLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage } from '../utils';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    //this is an api call made through api.js login function
    const response = await userLogin(email, password);

    if (response.success) {
      //seeting the user : this will be available globally due to context
      setUser(response.data.user);
      //for persisting user
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      //this response will be returned to login.js handleSubmit()
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  return {
    user,
    login,
    logout,
    loading,
  };
};
