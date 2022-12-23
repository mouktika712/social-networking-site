import { useEffect } from 'react';
import { getPosts } from '../api';
import { Home } from '../pages/index';

function App() {
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log(response);
    };

    fetchPosts();
  }, []);
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
