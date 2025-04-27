import React from 'react'
import { Outlet,Link, Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

export default function Protected() {
  const auth = useAuth();
  
    return auth.isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login"/>
    )
}
