const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const OLD = `<style>
.investing-subnav { margin-bottom: 1rem; }
.investing-tab.active .duo-subject-icon { outline: 2px solid #087e8b; }
</style>`;

const NEW = `<style>
.investing-subnav{display:flex!important;gap:.4rem!important;overflow-x:auto!important;scrollbar-width:none!important;width:100%!important;padding:.5rem!important;background:#e8f8f8!important;border-radius:2rem!important;border:2px solid rgba(15,127,135,.15)!important;margin-bottom:1rem!important}
.investing-subnav::-webkit-scrollbar{display:none}
.investing-tab{flex:0 0 auto!important;border:none!important;border-radius:1.5rem!important;background:transparent!important;color:#087e8b!important;font-size:.85rem!important;font-weight:700!important;padding:.5rem 1.2rem!important;transition:all .2s!important;white-space:nowrap!important;cursor:pointer!important;min-height:2.5rem!important}
.investing-tab:hover{background:rgba(15,127,135,.12)!important;transform:translateY(-1px)!important}
.investing-tab.active{background:#087e8b!important;color:#fff!important;box-shadow:0 4px 12px rgba(8,126,139,.3)!important;transform:translateY(-1px)!important}
</style>`;

if (!html.includes(OLD)) { console.error('ERROR: old text not found'); process.exit(1); }
fs.writeFileSync('index.html', html.replace(OLD, NEW));
console.log('Done');
