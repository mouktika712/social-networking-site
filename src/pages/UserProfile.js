import styles from '../styles/settings.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserProfile } from '../api';
import { toast } from 'react-toastify';
import { Loader } from '../components';
import { useAuth } from '../hooks';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
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
    const friends = auth.user.friendships;
    // console.log(auth.user);

    const friendIds = friends?.map((friend) => friend.to_user._id);
    const index = friendIds?.indexOf(userId);
    if (index !== -1) {
      // console.log(index);
      return true;
    }

    return false;
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
          <button className={`button ${styles.saveBtn}`}>Remove Friend</button>
        ) : (
          <button className={`button ${styles.saveBtn}`}>Add Friend</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
