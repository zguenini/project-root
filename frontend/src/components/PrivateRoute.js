
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../services/auth';

export default function PrivateRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" />;
}
