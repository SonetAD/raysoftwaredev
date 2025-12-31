'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: number;
}

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/messages');
      if (response.ok) {
        setIsLoggedIn(true);
        const data = await response.json();
        setMessages(data.messages);
      }
    } catch {
      // Not logged in
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        setPassword('');
        fetchMessages();
      } else {
        const data = await response.json();
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', { method: 'DELETE' });
      setIsLoggedIn(false);
      setMessages([]);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchMessages();
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
      fetchMessages();
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (checkingAuth) {
    return (
      <div className="admin-container">
        <div className="admin-loading">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="admin-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <h1 className="admin-login-title">Admin Panel</h1>
            <p className="admin-login-subtitle">Enter password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            {error && <div className="admin-error">{error}</div>}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="admin-input"
              required
            />
            <button type="submit" className="admin-btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <Link href="/" className="admin-back-link">← Back to site</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-panel">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Messages</h1>
            <p className="admin-subtitle">{messages.length} total messages</p>
          </div>
          <button onClick={handleLogout} className="admin-btn-logout">
            Logout
          </button>
        </div>

        <div className="admin-messages">
          {messages.length === 0 ? (
            <div className="admin-empty">
              <p>No messages yet</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`admin-message-card ${msg.read ? 'read' : 'unread'}`}
              >
                <div className="admin-message-header">
                  <div className="admin-message-info">
                    <span className="admin-message-name">{msg.name}</span>
                    <span className="admin-message-email">{msg.email}</span>
                  </div>
                  <div className="admin-message-meta">
                    <span className="admin-message-date">{formatDate(msg.created_at)}</span>
                    {!msg.read && <span className="admin-badge-new">New</span>}
                  </div>
                </div>
                <p className="admin-message-text">{msg.message}</p>
                <div className="admin-message-actions">
                  {!msg.read && (
                    <button
                      onClick={() => handleMarkAsRead(msg.id)}
                      className="admin-btn-action"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="admin-btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <Link href="/" className="admin-back-link">← Back to site</Link>
      </div>
    </div>
  );
}

