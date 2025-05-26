
import React, { useState } from 'react';
import { register } from '../services/auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await register(email, password);
      if (res.error) setError(res.error);
      else setSuccess('Inscription réussie, connectez-vous.');
    } catch {
      setError('Erreur serveur');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} required />
      <button type="submit">S’inscrire</button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
}
