import { createContext } from 'react';
import { useProvidePosts } from '../hooks';

const initialState = {
  posts: [],
  loading: true,
  addPostToState: () => {},
  addComment: () => {},
  toggleALike: () => {},
};

export const PostsContext = createContext(initialState);

//this function is added in root index.js file as : <AuthProvider></AuthProvider>
export const PostsProvider = ({ children }) => {
  const posts = useProvidePosts();
  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
};
