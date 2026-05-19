import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh',
      textAlign: 'center',
      fontFamily: 'Inter, sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '4rem', margin: '0', color: '#ff385c' }}>Oops!</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Something went wrong.</h2>
      <p style={{ color: '#717171', marginBottom: '2rem', maxWidth: '500px' }}>
        {error?.statusText || error?.message || "An unexpected error occurred."}
      </p>
      <div style={{ display: 'flex', gap: '15px' }}>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '12px 24px',
            backgroundColor: '#f7f7f7',
            color: '#222',
            border: '1px solid #222',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Try Again
        </button>
        <Link to="/" style={{
          padding: '12px 24px',
          backgroundColor: '#ff385c',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600'
        }}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorBoundary;
