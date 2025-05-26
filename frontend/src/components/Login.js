
import React, { useState } from 'react';
import { login } from '../services/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      if (res.error) setError(res.error);
      else window.location.href = '/dashboard';
    } catch {
      setError('Erreur serveur');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Se connecter</button>
      {error && <p>{error}</p>}
    </form>
  );
}
