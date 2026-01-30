// auth.js - client-side helper for Lustra Midnight UI
// Uses same server endpoints: /api/signup, /api/login, /api/me
const AUTH_API_BASE = window.AUTH_API_BASE || (window.location.hostname === 'localhost' ? 'http://localhost:4000' : 'http://localhost:4000');
const TOKEN_KEY = 'lustra_auth_token';

// token helpers
function saveToken(token){ try{ localStorage.setItem(TOKEN_KEY, token); }catch(e){console.warn('token save failed', e);} }
function clearToken(){ try{ localStorage.removeItem(TOKEN_KEY); }catch(e){} }
function getToken(){ try{ return localStorage.getItem(TOKEN_KEY); }catch(e){return null;} }

// UI helpers
function showMessage(elId, text){
  const el = document.getElementById(elId);
  if(el){ el.textContent = text; el.classList.remove('hidden'); }
  else if(window.toast) window.toast(text); else console.warn(text);
}
function clearMessage(elId){ const el = document.getElementById(elId); if(el){ el.textContent=''; el.classList.add('hidden'); } }

// API calls
async function authSignUp(email, password){
  const res = await fetch(`${AUTH_API_BASE}/api/signup`, {
    method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email,password})
  });
  const data = await res.json();
  if(!res.ok) throw new Error(data.error || 'Signup failed');
  saveToken(data.token);
  toggleAuthUI(data.user);
  return data.user;
}

async function authSignIn(email, password){
  const res = await fetch(`${AUTH_API_BASE}/api/login`, {
    method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email,password})
  });
  const data = await res.json();
  if(!res.ok) throw new Error(data.error || 'Login failed');
  saveToken(data.token);
  toggleAuthUI(data.user);
  return data.user;
}

function authSignOut(){
  clearToken();
  toggleAuthUI(null);
}

// get current user or null
async function authGetMe(){
  const token = getToken();
  if(!token) return null;
  try{
    const res = await fetch(`${AUTH_API_BASE}/api/me`, { headers: { Authorization: `Bearer ${token}` } });
    if(!res.ok){ clearToken(); return null; }
    const { user } = await res.json();
    return user;
  }catch(e){ clearToken(); return null; }
}

// observe auth state
function authOnStateChanged(cb){
  authGetMe().then(user => { toggleAuthUI(user); if(typeof cb==='function') cb(user); });
}

// UI toggle (expects #user-area, #auth-links, #user-email)
function toggleAuthUI(user){
  const userArea = document.getElementById('user-area');
  const authLinks = document.getElementById('auth-links');
  const userEmail = document.getElementById('user-email');

  if(user){
    if(userArea) userArea.classList.remove('hidden');
    if(authLinks) authLinks.classList.add('hidden');
    if(userEmail) userEmail.textContent = user.email;
  } else {
    if(userArea) userArea.classList.add('hidden');
    if(authLinks) authLinks.classList.remove('hidden');
    if(userEmail) userEmail.textContent = '';
  }
}

// Small global fallback toast for pages that include it
function toast(msg, ms = 3000){
  const t = document.getElementById('toast');
  if(!t) { console.log('toast:', msg); return; }
  t.querySelector('div').textContent = msg;
  t.classList.add('show');
  t.style.display = 'block';
  setTimeout(()=>{ t.classList.remove('show'); t.style.display = 'none'; }, ms);
}

// initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  authOnStateChanged();
});

// export for pages
window.authSignUp = authSignUp;
window.authSignIn = authSignIn;
window.authSignOut = authSignOut;
window.authOnStateChanged = authOnStateChanged;
window.toast = toast;
window.showMessage = showMessage;
window.clearMessage = clearMessage;
