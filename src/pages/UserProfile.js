import styles from '../styles/settings.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { toast } from 'react-toastify';
import { Loader } from '../components';
import { useAuth } from '../hooks';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  const redirect = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);

      const response = await fetchUserProfile(userId);

      if (response.success) {
        setUser(response.data.user);
        // console.log('user***',response.data.user);
      } else {
        toast.error(response.message);
        return redirect('/');
      }
      setLoading(false);
    };

    getUser();
  }, [userId, redirect]);

  const checkIfUserIsAFriend = () => {
    // get the friends array of current logged in user (see the docs for structure)
    const friends = auth.user.friends;
    // console.log(auth.user);

    const friendIds = friends?.map((friend) => friend.to_user._id);
    const index = friendIds?.indexOf(userId);
    if (index !== -1) {
      // console.log(index);
      return true;
    }

    return false;
  };

  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);

    // userId comming from the useParams hook
    const response = await removeFriend(userId);

    if (response.success) {
      // get the friend with matching userId (array)
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user._id === userId
      );
      auth.updateUserFriends(false, friendship[0]);
      toast.success('Friend removed Successfully!');
    } else {
      toast.error(response.message);
    }
    setRequestInProgress(false);
  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);

    // userId comming from the useParams hook
    const response = await addFriend(userId);

    if (response.success) {
      console.log(response);
      const { friendship } = response.data;
      auth.updateUserFriends(true, friendship);
      toast.success('Friend added Successfully!');
    } else {
      toast.error(response.message);
    }
    setRequestInProgress(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
            onClick={handleRemoveFriendClick}
            disabled={requestInProgress}
            className={`button ${styles.saveBtn}`}
          >
            {requestInProgress ? 'Removing Friend...' : 'Remove Friend'}
          </button>
        ) : (
          <button
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
            className={`button ${styles.saveBtn}`}
          >
            {requestInProgress ? 'Adding Friend...' : 'Add Friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
