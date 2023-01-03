import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks';
import styles from '../styles/login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // till the user enters the details we will disable the Log In button
  const [loggingIn, setLoggingIn] = useState(false);
  const redirect = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      return redirect('/');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    // remove the required attribute from email and password to see the notification work
    if (!email || !password) {
      toast.error('Please enter both email and password');
      setLoggingIn(false);
      return;
    }

    const response = await auth.login(email, password);
    if (response.success) {
      toast.success('Logged In Successfully');
    } else {
      toast.error(response.message);
    }
    setLoggingIn(false);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button type="submit" disabled={loggingIn}>
          {loggingIn ? 'Logging in....' : 'Log In'}
        </button>
      </div>
    </form>
  );
};

export default Login;
