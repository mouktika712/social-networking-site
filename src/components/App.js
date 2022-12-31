import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Home, Login } from '../pages/index';
import { Loader, Navbar } from './';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { options } from '../utils';
import { useAuth } from '../hooks';

const About = () => {
  return <div>About</div>;
};

const UserInfo = () => {
  return <div>User</div>;
};

function App() {
  const [posts, setPosts] = useState([]);

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

  const auth = useAuth();

  // as soon as the user gets authenticated user is stored inside localstorage and loading is set to false
  if (auth.loading) {
    return <Loader />;
  }

  // at that time the Home component will get rendered
  return (
    <div className="App">
      <Router>
        {/* Link works only inside BrowserRouter and we have added some links inside Navbar (we cant use <a> if we have just 1 html) */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<UserInfo />} />
        </Routes>
      </Router>
      <ToastContainer {...options} />
    </div>
  );
}

export default App;
