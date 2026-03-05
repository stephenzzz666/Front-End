// src/components/Login.tsx
import React, { useState, FormEvent } from 'react';
import './Login.css'; // Fixed import

// Define props for Login
interface LoginProps {
  onLogin: () => void; // Called when login succeeds
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in both fields.');
      setSuccess('');
      return;
    }

    // Simulate login
    if (email === 'student@example.com' && password === '123456') {
      setError('');
      setSuccess('Login successful!');
      onLogin(); // Notify App.tsx that login succeeded
    } else {
      setError('Invalid email or password.');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;