const E=require('./acct-engine.js');
let fails=0;const ok=(c,m)=>{if(!c){fails++;console.log('FAIL',m)}};
const s=E.create({periods:6});
const A=(p,t,x)=>{const r=E.addEntry(s,p,t,x);ok(r.ok,t+' '+(r.error||''));};
A(1,'invest',{amount:10000});A(1,'borrow',{amount:5000});A(1,'buyEquipment',{amount:4000,paid:'cash'});
A(1,'buyInventory',{amount:3000,paid:'credit'});A(2,'sale',{amount:2000,cost:900,paid:'credit'});
A(2,'sale',{amount:1500,cost:600,paid:'cash'});A(3,'collect',{amount:1200});A(3,'expense',{category:'wages',amount:800,paid:'accrue'});
A(3,'depreciation',{amount:100});A(3,'badDebt',{amount:50});A(4,'writeOff',{amount:30});A(4,'payAP',{amount:1000});
A(4,'deposit',{amount:500});A(5,'earnDeposit',{amount:300});A(5,'interest',{amount:60,paid:'cash'});A(5,'tax',{amount:100,paid:'accrue'});
A(5,'payAccrued',{amount:400});A(5,'dividend',{amount:200});A(6,'repay',{amount:1000});
A(6,'sellEquipment',{proceeds:3000,cost:4000,accDep:100});A(6,'buyEquipment',{amount:2000,paid:'loan'});
for(let p=1;p<=6;p++)for(const cum of [false,true]){const st=E.statements(s,p,cum);
 ok(st.checks.balances,'balance p'+p+cum);ok(st.checks.cashTies,'cash p'+p+cum);ok(st.checks.operatingTies,'op p'+p+cum);}
// every entry impact consistent
s.entries.forEach(e=>{const i=E.impact(s,e.id);ok(i,'impact '+e.type);});
ok(!E.addEntry(s,1,'invest',{amount:0}).ok,'zero rejected');
console.log(fails?'FAILED '+fails:'ALL PASS');
// presets
const P=require('./acct-presets.js');
P.forEach(pr=>{try{const st=E.load(pr);for(let p=1;p<=st.periods;p++){const x=E.statements(st,p,true);
 if(!x.checks.balances||!x.checks.cashTies||!x.checks.operatingTies||x.balance.cash<0||x.balance.inventory<0)console.log('PRESET BAD',pr.id,p,x.checks,x.balance.cash,x.balance.inventory);}}catch(e){console.log('PRESET ERR',e.message)}});
console.log('presets checked');
// supply events on every preset, in every month
const SUP=require('./acct-supply.js');
let evBad=0;
P.forEach(pr=>{SUP.forEach(ev=>{for(let per=1;per<=pr.periods;per+=3){const st=E.load(pr);
  const pending=ev.pay?[{type:'payAP',params:{amount:Math.min(1000,Math.max(0,E.statements(st,per,true).balance.ap/100))}}]:ev.entries;
  pending.forEach(e=>{if(e.params.amount===0)return;const r=E.addEntry(st,per,e.type,e.params);if(!r.ok){evBad++;console.log('EV FAIL',pr.id,ev.id,r.error)}});
  for(let q=1;q<=st.periods;q++){const x=E.statements(st,q,true);if(!x.checks.balances||!x.checks.cashTies||!x.checks.operatingTies){evBad++;console.log('EV CHECK',pr.id,ev.id,q)}}}});});
const w=E.create({periods:2});E.addEntry(w,1,'invest',{amount:1000});E.addEntry(w,1,'buyInventory',{amount:400,paid:'cash'});E.addEntry(w,1,'writeDown',{amount:150});
const ws=E.statementsD(w,1,true);if(ws.balance.inventory!==250||ws.income.netIncome!==-150||ws.cashFlow.operating.total!==-400||!ws.checks.balances||!ws.checks.operatingTies){evBad++;console.log('WRITEDOWN BAD',JSON.stringify(ws.checks),ws.balance.inventory,ws.income.netIncome,ws.cashFlow.operating.total)}
console.log(evBad?'EVENTS FAILED':'events ok');
