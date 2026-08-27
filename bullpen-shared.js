// ── Bullpen shared helpers ──
// Used by bullpen.html, bullpen-draft.html, and bullpen-league.html.
// This file exists so these three pages don't each carry their own
// slightly-different copy of the same database/analytics plumbing.

const SUPABASE_URL = 'https://xkfxofcmrmpazfjviatq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZnhvZmNtcm1wYXpmanZpYXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNzE5MDcsImV4cCI6MjA5Mzk0NzkwN30.DiO5Xo-gh-t_gq_IuSiqXlwX6_LIw3YvZgugknz1o_Q';

// Writes should identify WHO is making the request whenever we know —
// that's what lets database rules eventually tell "this person editing
// their own row" apart from "this person editing someone else's row".
// Reads stay on the anon key since leaderboards etc. are meant to be
// publicly viewable regardless of login state.
//
// Session tokens expire (typically after an hour). A stale one sitting
// in localStorage from an old session would otherwise get sent on every
// write, get silently rejected by the server, and look identical to a
// successful save — nothing in the UI would ever show the failure.
function isTokenExpired(token){
  try{
    const payload = JSON.parse(atob(token.split('.')[1]));
    return !payload.exp || payload.exp * 1000 < Date.now();
  }catch(e){
    return true; // unreadable token — treat as expired, don't trust it
  }
}
function writeAuthToken(){
  const stored = localStorage.getItem('supabase_token');
  if(stored && !isTokenExpired(stored)) return stored;
  return SUPABASE_KEY;
}

async function sbGet(table, qs){
  const r = await fetch(SUPABASE_URL+'/rest/v1/'+table+'?'+qs, {
    headers:{ apikey: SUPABASE_KEY, Authorization: 'Bearer '+SUPABASE_KEY }
  });
  return r.json();
}

async function sbPost(table, body){
  let r = await fetch(SUPABASE_URL+'/rest/v1/'+table, {
    method:'POST',
    headers:{ apikey: SUPABASE_KEY, Authorization:'Bearer '+writeAuthToken(), 'Content-Type':'application/json', Prefer:'return=representation' },
    body: JSON.stringify(body)
  });
  if((r.status === 401 || r.status === 403) && writeAuthToken() !== SUPABASE_KEY){
    // The session token was rejected for a reason isTokenExpired() didn't
    // catch — retry once with the anon key rather than fail silently.
    r = await fetch(SUPABASE_URL+'/rest/v1/'+table, {
      method:'POST',
      headers:{ apikey: SUPABASE_KEY, Authorization:'Bearer '+SUPABASE_KEY, 'Content-Type':'application/json', Prefer:'return=representation' },
      body: JSON.stringify(body)
    });
  }
  return r.json();
}

async function sbPatch(table, qs, body){
  let r = await fetch(SUPABASE_URL+'/rest/v1/'+table+'?'+qs, {
    method:'PATCH',
    headers:{ apikey: SUPABASE_KEY, Authorization:'Bearer '+writeAuthToken(), 'Content-Type':'application/json' },
    body: JSON.stringify(body)
  });
  if((r.status === 401 || r.status === 403) && writeAuthToken() !== SUPABASE_KEY){
    r = await fetch(SUPABASE_URL+'/rest/v1/'+table+'?'+qs, {
      method:'PATCH',
      headers:{ apikey: SUPABASE_KEY, Authorization:'Bearer '+SUPABASE_KEY, 'Content-Type':'application/json' },
      body: JSON.stringify(body)
    });
  }
  return r.ok;
}

async function sbDelete(table, qs){
  let r = await fetch(SUPABASE_URL+'/rest/v1/'+table+'?'+qs, {
    method:'DELETE',
    headers:{ apikey: SUPABASE_KEY, Authorization:'Bearer '+writeAuthToken() }
  });
  if((r.status === 401 || r.status === 403) && writeAuthToken() !== SUPABASE_KEY){
    r = await fetch(SUPABASE_URL+'/rest/v1/'+table+'?'+qs, {
      method:'DELETE',
      headers:{ apikey: SUPABASE_KEY, Authorization:'Bearer '+SUPABASE_KEY }
    });
  }
  return r.ok;
}

function trackEvent(action, category, label){
  if(typeof gtag !== 'undefined') gtag('event', action, {event_category: category, event_label: label});
}

function isLoggedIn(){
  return !!localStorage.getItem('supabase_token');
}

// Escapes user-supplied text (nicknames, names, anything a person typed)
// before it gets inserted into innerHTML via template strings. Without
// this, someone could set their display name to a script/HTML payload
// that runs in every other viewer's browser — a stored XSS attack that
// can steal login tokens straight out of localStorage.
function escapeHtml(str){
  if(str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
