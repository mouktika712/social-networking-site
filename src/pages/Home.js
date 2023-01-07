import styles from '../styles/home.module.css';
// import PropTypes from 'prop-types';
import { Post, CreatePost, FriendList, Loader } from '../components';
import { useAuth, usePosts } from '../hooks';

//get the props and destructure it right there
const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }
  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        {auth.user ? <CreatePost /> : null}
        {posts.data.map((post) => (
          <Post post={post} key={`post-${post._id}`} />
        ))}
      </div>

      {auth.user && <FriendList />}
    </div>
  );
};

// Props validation (it make sure the post is of type (typeChecking) array and it is present in the props --> Warning)
// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default Home;
