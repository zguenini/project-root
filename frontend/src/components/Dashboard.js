
import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api';
import { logout } from '../services/auth';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfile()
      .then(data => setProfile(data))
      .catch(() => {
        setError('Session expirée, veuillez vous reconnecter.');
        logout();
        window.location.href = '/login';
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Bienvenue, {profile.email}</h1>
      <p>Votre ID utilisateur : {profile.id}</p>
      <button onClick={() => {
        logout();
        window.location.href = '/login';
      }}>Se déconnecter</button>
    </div>
  );
}
