import { useContext, useEffect, useState } from 'react';
import {
  editProfile,
  login as userLogin,
  register,
  fetchUserFriends,
  getPosts,
} from '../api';
import { AuthContext, PostsContext } from '../providers';
import jwt from 'jwt-decode';
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from '../utils';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //After auth the user will be set: setUser() and added to the LS..that means the state will change i.e the useEffect() called: we will retrive the token from the LS decode it using jwt and store it again in the LS
  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      if (userToken) {
        const user = jwt(userToken);

        // Add the friends array in user
        const response = await fetchUserFriends();
        // console.log(response);

        let friends = [];
        if (response.success) {
          friends = response.data.friends;
        } else {
          friends = [];
        }
        setUser({
          ...user,
          friends,
        });
      }

      setLoading(false);
    };
    getUser();
  }, [user]);

  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);

    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );

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

  const login = async (email, password) => {
    //this is an api call made through api.js login function
    const response = await userLogin(email, password);
    console.log(response);

    if (response.success) {
      //setting the user : this will be available globally due to context
      setUser(response.data.user);
      console.log('hooks login', response.data.token);
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

  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);

    if (response.success) {
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

  // Friendships needs to be updated in the api database as well as the context user
  const updateUserFriends = (addFriend, friend) => {
    console.log(friend);
    if (addFriend) {
      setUser({
        ...user,
        friends: [...user.friends, friend],
      });
      return;
    }

    // here we are getting array with removed "friend"
    const newFriends = user.friends.filter(
      (f) => f.to_user._id !== friend.to_user._id
    );
    setUser({
      ...user,
      friends: newFriends,
    });
  };

  return {
    user,
    login,
    logout,
    loading,
    signup,
    updateUser,
    updateUserFriends,
  };
};

// Posts Provider **************************

export const usePosts = () => {
  return useContext(PostsContext);
};

export const useProvidePosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  const addPostToState = (post) => {
    const newPosts = [post, ...posts];

    setPosts(newPosts);
  };

  const addComment = (comment, postId) => {
    const newPosts = posts.map((post) => {
      if (post._id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });

    setPosts(newPosts);
  };

  return {
    data: posts,
    loading,
    addPostToState,
    addComment,
  };
};
