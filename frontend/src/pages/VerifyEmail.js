import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './VerifyEmail.scss';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail, resendVerificationEmail } = useAuth();
  const [status, setStatus] = useState('verifying');
  const [error, setError] = useState('');
  const [resendStatus, setResendStatus] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setError('Invalid verification link');
      return;
    }

    const verify = async () => {
      try {
        await verifyEmail(token);
        setStatus('success');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (err) {
        setStatus('error');
        setError(err.message);
      }
    };

    verify();
  }, [searchParams, verifyEmail, navigate]);

  const handleResendVerification = async () => {
    try {
      setResendStatus('sending');
      await resendVerificationEmail();
      setResendStatus('sent');
      setTimeout(() => {
        setResendStatus('');
      }, 3000);
    } catch (err) {
      setResendStatus('error');
      setError(err.message);
    }
  };

  return (
    <div className="verify-email">
      <div className="verify-email-content">
        {status === 'verifying' && (
          <>
            <h1>Verifying your email...</h1>
            <div className="loading-spinner"></div>
          </>
        )}

        {status === 'success' && (
          <>
            <h1>Email Verified!</h1>
            <p>Your email has been successfully verified. You will be redirected to the login page shortly.</p>
          </>
        )}

        {status === 'error' && (
          <>
            <h1>Verification Failed</h1>
            <p className="error">{error}</p>
            <button 
              className="resend-button"
              onClick={handleResendVerification}
              disabled={resendStatus === 'sending'}
            >
              {resendStatus === 'sending' ? 'Sending...' : 'Resend Verification Email'}
            </button>
            {resendStatus === 'sent' && (
              <p className="success">Verification email sent! Please check your inbox.</p>
            )}
            {resendStatus === 'error' && (
              <p className="error">{error}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail; 