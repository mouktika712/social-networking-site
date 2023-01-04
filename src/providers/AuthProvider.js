import { createContext } from 'react';
import { useProvideAuth } from '../hooks';

const initialState = {
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
  signup: () => {},
  updateUser: () => {},
  updateUserFriends: () => {},
};

export const AuthContext = createContext(initialState);

//this function is added in root index.js file as : <AuthProvider></AuthProvider>
export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
