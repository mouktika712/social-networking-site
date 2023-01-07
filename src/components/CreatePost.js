import { useState } from 'react';
import { toast } from 'react-toastify';
import { addPost } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const posts = usePosts();

  const handleAddPostClick = async () => {
    setAddingPost(true);

    if (!post) {
      toast.error('Blank Post Cannot be Created!');
      setAddingPost(false);
      return;
    }
    const response = await addPost(post);

    if (response.success) {
      setPost('');
      posts.addPostToState(response.data.post);
      toast.success('Post Created Succesfully!');
    } else {
      toast.error(response.message);
    }

    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        placeholder="Start typing here..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>

      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? 'Adding Post...' : 'Add Post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
