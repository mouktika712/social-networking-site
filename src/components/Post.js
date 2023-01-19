import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createComment, toggleLike } from '../api';
import { useAuth, usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import { Comments } from './';

const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
  const auth = useAuth();

  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingComment(true);

      // making api call
      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment('');
        // after succ. api call, add the comment to the state of the post(post context api)
        posts.addComment(response.data.comment, post._id);
        toast.success('Comment created successfully!');
      } else {
        toast.error(response.message);
      }

      setCreatingComment(false);
    }
  };

  // there is a limitation for this functionality(MPro. Search&Chat: Liking Post)
  /*We are just getting "deleted:true/false" is response...to inc/dec the like count we need to update the post context state
  like array...like array contains the user who has liked the post..
  so to update it we need the user...but we are not getting it in the response..
  so its a limitation of the api*/
  const handlePostLikeClick = async () => {
    // user needs to be logged in to add a like
    if (!auth.user) {
      toast.error('Please log in to perform the action');
      return;
    }
    const response = await toggleLike(post._id, 'Post');

    // if deleted = true : like is removed
    if (response.success) {
      if (response.data.deleted) {
        toast.success('Like removed successfully!');
      } else {
        toast.success('Like added successfully!');
      }
      posts.toggleALike(post._id, response.data.deleted, auth.user._id);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className={styles.postWrapper} key={post._id}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="user-pic"
          />
          <div>
            <Link
              to={{
                pathname: `/user/${post.user._id}`,
                state: {
                  user: post.user,
                },
              }}
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
            <button onClick={handlePostLikeClick}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/210/210545.png"
                alt="likes-icon"
              />
            </button>
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/134/134920.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
            disabled={creatingComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comments comment={comment} key={`post-comment-${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
