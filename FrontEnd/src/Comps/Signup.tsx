import React, { useState } from 'react';
import { register } from '../api';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const res = await register({ username, email, password });
      alert(`User registered: ${res.data.username}`);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Register</button>
    </div>
  );
};

export default Signup;
