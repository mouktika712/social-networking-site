import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Home } from '../pages/index';
import { Loader } from './';

function App() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log(response);

      if (response.success) {
        //see the console.log statement above to see the response object structure
        setPosts(response.data.posts);
      }

      //after getting the posts, set the loading to false
      setLoading(false);
    };

    fetchPosts();
  }, []);

  //after posts get loaded setLoading will be set to false so the page will get loaded again(just like setState) OR due to useEffect hook??
  if (loading) {
    return <Loader />;
  }

  // at that time the Home component will get rendered
  return (
    <div className="App">
      <Home posts={posts} />
    </div>
  );
}

export default App;
