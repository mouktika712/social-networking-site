import { useContext, useEffect, useState } from 'react';
import { login as userLogin } from '../api';
import { AuthContext } from '../providers/AuthProvider';
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from '../utils';
import jwt from 'jwt-decode';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //After auth the user will be set: setUser() and added to the LS..that means the state will change i.e the useEffect() called: we will retrive the token from the LS decode it using jwt and store it again in the LS
  useEffect(() => {
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

    if (userToken) {
      const user = jwt(userToken);
      setUser(user);
    }

    setLoading(false);
  }, []);

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
