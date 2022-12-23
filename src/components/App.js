import { useEffect } from 'react';
import { getPosts } from '../api';

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
      <h1>Hello World!</h1>
    </div>
  );
}

export default App;
