
import { useState } from 'react';
import api from './api';

type AuthProps = {
  onLogin: (token: string) => void;
};

export default function Auth({ onLogin }: AuthProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const payload = isRegister
        ? { name, email, password }
        : { email, password };

      const response = await api.post(endpoint, payload);
      const token = response.data.token;

      if (!token) {
        setMessage(response.data.message || 'Authentication succeeded, but no token was returned.');
        return;
      }

      onLogin(token);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ||
          'Could not connect to the server. Check that your backend is running.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-brand">S<span>W</span></div>
        <p className="auth-eyebrow">YOUR MONEY, IN CONTROL</p>
        <h1>{isRegister ? 'Create your account' : 'Welcome back'}</h1>
        <p className="auth-subtitle">
          {isRegister
            ? 'Start tracking your spending with SpendWise.'
            : 'Sign in to continue to SpendWise.'}
        </p>

        {isRegister && (
          <label>
            Full name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              autoComplete="name"
              required
            />
          </label>
        )}

        <label>
          Email address
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 6 characters"
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            minLength={6}
            required
          />
        </label>

        {message && <p className="auth-message" role="alert">{message}</p>}

        <button className="auth-submit" type="submit" disabled={loading}>
          {loading
            ? 'Please wait...'
            : isRegister
              ? 'Create account'
              : 'Sign in'}
        </button>

        <p className="auth-switch">
          {isRegister ? 'Already have an account?' : 'New to SpendWise?'}{' '}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setMessage('');
            }}
          >
            {isRegister ? 'Sign in' : 'Create account'}
          </button>
        </p>
      </form>
    </main>
  );
}
