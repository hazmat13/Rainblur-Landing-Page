// auth.js - client-side helper for communicating with the Express auth server
// Token storage key renamed for Lustra
const AUTH_API_BASE = window.AUTH_API_BASE || (window.location.hostname === 'localhost' ? 'http://localhost:4000' : 'http://localhost:4000');
const TOKEN_KEY = 'lustra_auth_token';

function saveToken(token) { localStorage.setItem(TOKEN_KEY, token); }
function clearToken() { localStorage.removeItem(TOKEN_KEY); }
function getToken() { return localStor// auth.js - client-side helper for communicating with the Express auth server
// Token key for Lustra
const AUTH_API_BASE = window.AUTH_API_BASE || (window.location.hostname === 'localhost' ? 'http://localhost:4000' : 'http://localhost:4000');
const TOKEN_KEY = 'lustra_auth_token';

// Token helpers
function saveToken(token) { try { localStorage.setItem(TOKEN_KEY, token); } catch (e) { console.warn('Failed to save token', e); } }
function clearToken() { try { localStorage.removeItem(TOKEN_KEY); } catch (e) {} }
function getToken() { try { return localStorage.getItem(TOKEN_KEY); } catch (e) { return null; } }

// Show/hide messages -- used by pages
function showMessage(elId, text) {
  const el = document.getElementById(elId);
  if (!el) {
    // fallback toast
    if (window.toast) return toast(text);
    return console.warn('No message element:', elId, text);
  }
  el.textContent = text;
  el.classList.remove('hidden');
}
function clearMessage(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = '';
  el.classList.add('hidden');
}

// API calls
async function authSignUp(email, password) {
  const res = await fetch(`${AUTH_API_BASE}/api/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Signup failed');
  saveToken(data.token);
  toggleAuthUI(data.user);
  window.location.href = 'index.html';
  return data.user;
}

async function authSignIn(email, password) {
  const res = await fetch(`${AUTH_API_BASE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  saveToken(data.token);
  toggleAuthUI(data.user);
  window.location.href = 'index.html';
  return data.user;
}

function authSignOut() {
  clearToken();
  toggleAuthUI(null);
  window.location.href = 'index.html';
}

async function authGetMe() {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await fetch(`${AUTH_API_BASE}/api/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) { clearToken(); return null; }
    const { user } = await res.json();
    return user;
  } catch (err) {
    clearToken();
    return null;
  }
}

// Observe or get auth state
function authOnStateChanged(cb) {
  authGetMe().then(user => {
    toggleAuthUI(user);
    if (typeof cb === 'function') cb(user);
  });
}

// Toggle UI bits (expects #user-area, #auth-links, #user-email)
function toggleAuthUI(user) {
  const userArea = document.getElementById('user-area');
  const authLinks = document.getElementById('auth-links');
  const userEmail = document.getElementById('user-email');

  if (user) {
    if (userArea) userArea.classList.remove('hidden');
    if (authLinks) authLinks.classList.add('hidden');
    if (userEmail) userEmail.textContent = user.email;
  } else {
    if (userArea) userArea.classList.add('hidden');
    if (authLinks) authLinks.classList.remove('hidden');
    if (userEmail) userEmail.textContent = '';
  }
}

// Init: call on DOM ready to set up UI
document.addEventListener('DOMContentLoaded', () => {
  authOnStateChanged();
});age.getItem(TOKEN_KEY); }

async function authSignUp(email, password) {
  const res = await fetch(`${AUTH_API_BASE}/api/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Signup failed');
  saveToken(data.token);
  toggleAuthUI(data.user);
  window.location.href = 'index.html';
  return data.user;
}

async function authSignIn(email, password) {
  const res = await fetch(`${AUTH_API_BASE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  saveToken(data.token);
  toggleAuthUI(data.user);
  window.location.href = 'index.html';
  return data.user;
}

function authSignOut() {
  clearToken();
  toggleAuthUI(null);
  window.location.href = 'index.html';
}

async function authGetMe() {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await fetch(`${AUTH_API_BASE}/api/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      clearToken();
      return null;
    }
    const { user } = await res.json();
    return user;
  } catch (err) {
    clearToken();
    return null;
  }
}

function authOnStateChanged(cb) {
  authGetMe().then(user => {
    toggleAuthUI(user);
    if (typeof cb === 'function') cb(user);
  });
}

function toggleAuthUI(user) {
  const userArea = document.getElementById('user-area');
  const authLinks = document.getElementById('auth-links');
  const userEmail = document.getElementById('user-email');

  if (user) {
    if (userArea) userArea.classList.remove('hidden');
    if (authLinks) authLinks.classList.add('hidden');
    if (userEmail) userEmail.textContent = user.email;
  } else {
    if (userArea) userArea.classList.add('hidden');
    if (authLinks) authLinks.classList.remove('hidden');
    if (userEmail) userEmail.textContent = '';
  }
}

function showMessage(elId, text) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = text;
  el.classList.remove('hidden');
}
function clearMessage(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = '';
  el.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  authOnStateChanged();
});
