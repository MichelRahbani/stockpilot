// ── Bullpen shared helpers ──
// Used by bullpen.html, bullpen-draft.html, and bullpen-league.html.
// This file exists so these three pages don't each carry their own
// slightly-different copy of the same database/analytics plumbing.

const SUPABASE_URL = 'https://xkfxofcmrmpazfjviatq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZnhvZmNtcm1wYXpmanZpYXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNzE5MDcsImV4cCI6MjA5Mzk0NzkwN30.DiO5Xo-gh-t_gq_IuSiqXlwX6_LIw3YvZgugknz1o_Q';

async function sbGet(table, qs){
  const r = await fetch(SUPABASE_URL+'/rest/v1/'+table+'?'+qs, {
    headers:{ apikey: SUPABASE_KEY, Authorization: 'Bearer '+SUPABASE_KEY }
  });
  return r.json();
}

async function sbPost(table, body){
  const r = await fetch(SUPABASE_URL+'/rest/v1/'+table, {
    method:'POST',
    headers:{ apikey: SUPABASE_KEY, Authorization:'Bearer '+SUPABASE_KEY, 'Content-Type':'application/json', Prefer:'return=representation' },
    body: JSON.stringify(body)
  });
  return r.json();
}

async function sbPatch(table, qs, body){
  const r = await fetch(SUPABASE_URL+'/rest/v1/'+table+'?'+qs, {
    method:'PATCH',
    headers:{ apikey: SUPABASE_KEY, Authorization:'Bearer '+SUPABASE_KEY, 'Content-Type':'application/json' },
    body: JSON.stringify(body)
  });
  return r.ok;
}

async function sbDelete(table, qs){
  const r = await fetch(SUPABASE_URL+'/rest/v1/'+table+'?'+qs, {
    method:'DELETE',
    headers:{ apikey: SUPABASE_KEY, Authorization:'Bearer '+SUPABASE_KEY }
  });
  return r.ok;
}

function trackEvent(action, category, label){
  if(typeof gtag !== 'undefined') gtag('event', action, {event_category: category, event_label: label});
}

function isLoggedIn(){
  return !!localStorage.getItem('supabase_token');
}
