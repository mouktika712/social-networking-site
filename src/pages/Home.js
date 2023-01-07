import styles from '../styles/home.module.css';
// import PropTypes from 'prop-types';
import { Comments, CreatePost, FriendList } from '../components';
import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';

//get the props and destructure it right there
const Home = () => {
  const [posts, setPosts] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log(response);

      if (response.success) {
        //see the console.log statement above to see the response object structure
        setPosts(response.data.posts);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.map((post) => (
          <div className={styles.postWrapper} key={`post-${post._id}`}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="user-pic"
                />
                <div>
                  <Link
                    to={`/user/${post.user._id}`}
                    state={{ user: post.user }}
                    className={styles.postAuthor}
                  >
                    {post.user.name}
                  </Link>
                  <span className={styles.postTime}>a minute ago</span>
                </div>
              </div>
              <div className={styles.postContent}>{post.content}</div>

              <div className={styles.postActions}>
                <div className={styles.postLike}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2589/2589175.png"
                    alt="likes-icon"
                  />
                  <span>{post.likes.length}</span>
                </div>

                <div className={styles.postCommentsIcon}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2190/2190552.png"
                    alt="comments-icon"
                  />
                  <span>{post.comments.length}</span>
                </div>
              </div>
              <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment" />
              </div>

              <div className={styles.postCommentsList}>
                <Comments comments={post.comments} />
              </div>
            </div>
          </div>
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
