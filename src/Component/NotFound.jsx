import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh',
      textAlign: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h1 style={{ fontSize: '6rem', margin: '0', color: '#ff385c' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: '#717171', marginBottom: '2rem' }}>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" style={{
        padding: '12px 24px',
        backgroundColor: '#ff385c',
        color: 'white',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: '600',
        transition: 'background-color 0.2s'
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#e31c5f'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#ff385c'}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
