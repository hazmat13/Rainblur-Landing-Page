// auth.js - improved UI helpers + auth API wrapper (Lustra)
// Keep AUTH_API_BASE pointed at your auth server (default http://localhost:4000)
const AUTH_API_BASE = window.AUTH_API_BASE || (window.location.hostname === 'localhost' ? 'http://localhost:4000' : 'http://localhost:4000');
const TOKEN_KEY = 'lustra_auth_token';

// token helpers
function saveToken(token){ try{ localStorage.setItem(TOKEN_KEY, token); }catch(e){ console.warn('save token failed', e); } }
function clearToken(){ try{ localStorage.removeItem(TOKEN_KEY); }catch(e){} }
function getToken(){ try{ return localStorage.getItem(TOKEN_KEY); }catch(e){return null;} }

// UI helpers
function showMessage(elId, text){
  const el = document.getElementById(elId);
  if (el) { el.textContent = text; el.classList.remove('hidden'); return; }
  if (window.toast) return toast(text);
  console.warn(text);
}
function clearMessage(elId){
  const el = document.getElementById(elId);
  if (el) { el.textContent = ''; el.classList.add('hidden'); }
}

// toast
function toast(msg, ms = 3000){
  const t = document.getElementById('toast');
  if (!t) return console.log('toast:', msg);
  t.querySelector('div').textContent = msg;
  t.classList.remove('hidden');
  setTimeout(()=> t.classList.add('hidden'), ms);
}

// API calls
async function authSignUp(email, password){
  const res = await fetch(`${AUTH_API_BASE}/api/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Signup failed');
  saveToken(data.token);
  toggleAuthUI(data.user);
  return data.user;
}

async function authSignIn(email, password){
  const res = await fetch(`${AUTH_API_BASE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  saveToken(data.token);
  toggleAuthUI(data.user);
  return data.user;
}

function authSignOut(){
  clearToken();
  toggleAuthUI(null);
}

// get user
async function authGetMe(){
  const token = getToken();
  if (!token) return null;
  try {
    const res = await fetch(`${AUTH_API_BASE}/api/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) { clearToken(); return null; }
    const { user } = await res.json();
    return user;
  } catch (e) {
    clearToken();
    return null;
  }
}

// auth state observer
function authOnStateChanged(cb){
  authGetMe().then(user => {
    toggleAuthUI(user);
    if (typeof cb === 'function') cb(user);
  });
}

// toggle UI bits in header
function toggleAuthUI(user){
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

// small keyboard-friendly quick view: delegate events for product controls
document.addEventListener('click', (e) => {
  // if clicking outside modal close it (handled in page JS)
}, true);

// initialize
document.addEventListener('DOMContentLoaded', () => {
  authOnStateChanged();
});

// export functions for pages
window.authSignUp = authSignUp;
window.authSignIn = authSignIn;
window.authSignOut = authSignOut;
window.authOnStateChanged = authOnStateChanged;
window.toast = toast;
window.showMessage = showMessage;
window.clearMessage = clearMessage;
