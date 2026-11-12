const $ = s => document.querySelector(s);
const esc = s => String(s === 0 ? '0' : (s || '')).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const today = () => new Date().toLocaleDateString('en-CA'),
    fmt = d => d ? new Date(d + 'T00:00').toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
    inr = n => '₹' + Number(n || 0).toLocaleString('en-IN'),
    pad = n => String(n).padStart(2, '0');
const IC = { home: 'M3 11l9-8 9 8M5 10v10h14V10', check: 'M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11', wallet: 'M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7V5a2 2 0 0 1 2-2h12M16 14h2', key: 'M21 2l-9.6 9.6M15.5 7.5l3 3L22 7l-3-3M7.5 10.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z', cal: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', cart: 'M6 6h15l-2 9H8zM6 6L5 3H2M9 20h.01M18 20h.01', target: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', zap: 'M13 2L3 14h9l-1 8 10-12h-9z', film: 'M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM7 3v18M17 3v18M3 12h18', sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4', moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z', plus: 'M5 12h14M12 5v14', x: 'M18 6 6 18M6 6l12 12', trash: 'M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V3h6v3', pen: 'M17 3l4 4L7 21H3v-4z', menu: 'M4 6h16M4 12h16M4 18h16', pin: 'M12 17v5M9 3h6l-1 7 3 3v2H7v-2l3-3z', left: 'M15 18l-6-6 6-6', right: 'M9 18l6-6-6-6', gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12a7 7 0 0 0-.1-1.3l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2.2-1.3L14 3h-4l-.4 2.5a7 7 0 0 0-2.2 1.3l-2.3-1-2 3.4 2 1.5a7 7 0 0 0 0 2.6l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2.2 1.3L10 21h4l.4-2.5a7 7 0 0 0 2.2-1.3l2.3 1 2-3.4-2-1.5c.1-.4.1-.9.1-1.3z', bag: 'M6 2l-3 4v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0' };
const ic = (n, s) => `<svg viewBox="0 0 24 24"${s?` style="width:${s}px;height:${s}px"`:''} aria-hidden="true"><path d="${IC[n]}"/></svg>`;
const NAV = [['dash', 'Dashboard', 'home'], ['tasks', 'To-Do List', 'check'], ['tx', 'Monthly Expenses', 'wallet'], ['points', 'Important Points', 'key'], ['dates', 'Important Dates', 'cal'], ['shop', 'Shopping List', 'cart'], ['goals', 'Goal Vault', 'target'], ['dumps', 'Brain Dump', 'zap'], ['watch', 'Watchlist', 'film']];
const COLS=['tasks','tx','personal','points','dates','goals','shop','dumps','watch','commits'];
const QUOTES=['Small steps every day add up to big change.','Done is better than perfect.','Focus on progress, not perfection.','Discipline is choosing what you want most over what you want now.','Well begun is half done.','Make today count.'];
let THM=null,db,dl,P,R='dash',EV='tx',ready=false,loaded=new Set(),S={},ST={},TAB={},q='',MON=today().slice(0,7),CAT='',CALV=false,CALM=today().slice(0,7),C={t:'',b:''},FH=null;
const cats=()=>ST.cats||DEF;
const TV={light:{'--bg':'#FFFBF5','--cd':'#ffffff','--tx':'#2b2724','--mu':'#7d7268','--ac':'#E65100','--a2':'#FFB74D','--so':'#FFE0B2','--bd':'#f1e5d8','--on':'#ffffff','--ok':'#2e7d32','--bad':'#c62828','--sh':'0 1px 3px rgba(60,30,0,.08)'},dark:{'--bg':'#121212','--cd':'#1e1e1e','--tx':'#f0ece8','--mu':'#a39a92','--ac':'#FFB74D','--a2':'#E65100','--so':'rgba(255,183,77,.14)','--bd':'#2e2e2e','--on':'#1a1a1a','--ok':'#81c784','--bad':'#ef9a9a','--sh':'none'}};
const AT=f=>[['All',()=>1],['Active',f],['Completed',r=>!f(r)]],chip=(t,c)=>t?`<span class="chip ${c||''}">${esc(t)}</span>`:'';
const paid=r=>(r.pays||[]).reduce((s,p)=>s+p.a,0),dsc=r=>r.desc?`<p>${esc(r.desc)}</p>`:'';
const PRI = ['Low', 'Medium', 'High'];
const M={
tasks:{n:'To-Do List',a:'Add Task',s:'Task',tog:1,tabs:AT(r=>!r.done),def:{done:false},sort:(a,b)=>(a.due||'~').localeCompare(b.due||'~')||(b.created||'').localeCompare(a.created||''),
f:[{k:'title',l:'Title',req:1},{k:'desc',l:'Description (optional)',t:'ta'},{k:'due',l:'Due date (optional)',t:'date'},{k:'pri',l:'Priority',t:'sel',o:PRI,d:'Medium'}],
row:r=>`<div class="t">${esc(r.title)}</div>${dsc(r)}<div class="meta">${chip(r.pri,'p'+r.pri)}${r.due?chip('Due '+fmt(r.due),!r.done&&r.due<today()?'bad':''):''}</div>`},
tx:{n:'Transaction',a:'Add Transaction',s:'Transaction',sort:(a,b)=>b.date.localeCompare(a.date),
f:[{k:'type',l:'Type',t:'sel',o:['Expense','Income']},{k:'title',l:'Title',req:1},{k:'amount',l:'Amount (₹)',t:'num',req:1},{k:'date',l:'Date',t:'date',req:1,d:today()},{k:'method',l:'Payment method',t:'sel',o:['UPI','Cash','Card','Bank transfer','Other']},{k:'desc',l:'Description (optional)',t:'ta',r:2}],
row:r=>`<div class="t">${esc(r.title)}</div>${dsc(r)}<div class="meta">${chip(r.type,r.type=='Income'?'ok':'bad')}${chip(r.method)}${chip(fmt(r.date))}</div>`,
side:r=>`<div class="amt ${r.type=='Income'?'':'bad'}" style="color:var(--${r.type=='Income'?'ok':'bad'})">${r.type=='Income'?'+':'−'}${inr(r.amount)}</div>`},
commits:{n:'Commitment',a:'Add',s:'Commitment',def:{pays:[]},tabs:AT(r=>paid(r)<r.total),sort:(a,b)=>(a.due||'~').localeCompare(b.due||'~'),
f:[{k:'kind',l:'Type (e.g. Loan, College Fees)'},{k:'name',l:'Name',req:1},{k:'total',l:'Total amount (₹)',t:'num',req:1},{k:'inst',l:'Installment amount (₹)',t:'num'},{k:'due',l:'Next payment due date',t:'date'},{k:'desc',l:'Notes (optional)',t:'ta',r:2}],
row:r=>{const p=paid(r),rem=Math.max(0,r.total-p),pc=Math.min(100,p/r.total*100),n=r.inst?Math.ceil(r.total/r.inst):0,dn=r.inst?Math.min(n,Math.floor(p/r.inst)):0;
return`<div class="t">${esc(r.name)} ${chip(r.kind)}</div>${dsc(r)}<div class="bar"><i style="width:${pc}%"></i></div><div class="mu">Paid ${inr(p)} of ${inr(r.total)} · Remaining <b>${inr(rem)}</b></div><div class="meta">${r.inst?chip('Installment '+inr(r.inst)+' ('+dn+'/'+n+' paid)'):''}${rem>0&&r.due?chip('Due '+fmt(r.due),r.due<today()?'bad':''):''}${rem<=0?chip('Fully paid','ok'):''}</div>${(r.pays||[]).length?`<details><summary class="mu">Payment history (${r.pays.length})</summary>${r.pays.map((x,i)=>`<div class="meta">${chip(fmt(x.d))}<b>${inr(x.a)}</b>${esc(x.n||'')}<button class="ic" style="width:24px;height:24px" data-a="delpay" data-id="${r.id}" data-i="${i}" aria-label="Delete payment">${ic('x',14)}</button></div>`).join('')}</details>`:''}`},
x:r=>paid(r)<r.total?`<button class="btn g" data-a="pay" data-id="${r.id}">Pay</button>`:''},
personal:{n:'Personal Payments',a:'Add',s:'Payment',tog:1,def:{done:false},tabs:[['All',()=>1],['Pending',r=>!r.done],['Paid',r=>r.done]],sort:(a,b)=>b.date.localeCompare(a.date),
f:[{k:'title',l:'Title (who / what for)',req:1},{k:'amount',l:'Amount (₹)',t:'num',req:1},{k:'date',l:'Date',t:'date',req:1,d:today()},{k:'desc',l:'Note (optional)',t:'ta',r:2}],
row:r=>`<div class="t">${esc(r.title)}</div>${dsc(r)}<div class="meta">${chip(r.done?'Paid':'Pending',r.done?'ok':'bad')}${chip(fmt(r.date))}</div>`,
side:r=>`<div class="amt">${inr(r.amount)}</div>`},
points:{n:'Important Points',a:'Add Important Point',s:'Point',def:{pinned:false},sort:(a,b)=>(b.pinned?1:0)-(a.pinned?1:0)||(b.created||'').localeCompare(a.created||''),uq:'title',
f:[
{k:'title',l:'Title',req:1},
{k:'desc',l:'Details',t:'ta',r:5}
],
row:r=>`<div class="t">${r.pinned?ic('pin',14)+' ':''}${esc(r.title)}</div>${dsc(r)}<div class="meta">${chip('Added '+fmt((r.created||'').slice(0,10)))}</div>`,
x:r=>`<button class="ic" data-a="pin" data-id="${r.id}" aria-label="${r.pinned?'Unpin':'Pin'}" ${r.pinned?'style="color:var(--ac)"':''}>${ic('pin')}</button>`
},

dates:{n:'Important Dates',a:'Add Important Date',s:'Event',tabs:AT(r=>r.date>=today()),sort:(a,b)=>(a.date+(a.time||'')).localeCompare(b.date+(b.time||'')),
f:[
{k:'title',l:'Event title',req:1},
{k:'date',l:'Date',t:'date',req:1},
{k:'time',l:'Time (optional)',t:'time'},
{k:'desc',l:'Description (optional)',t:'ta',r:2}
],
row:r=>{const d=Math.round((new Date(r.date+'T00:00')-new Date(today()+'T00:00'))/864e5);return`<div class="t">${esc(r.title)}</div>${dsc(r)}<div class="meta">${chip(new Date(r.date+'T00:00:00').toLocaleDateString('en-IN',{weekday:'long',day:'2-digit',month:'short',year:'numeric'})+(r.time?' · '+r.time:''))}${chip(d<0?'Completed':d==0?'Today':d==1?'Tomorrow':'In '+d+' days',d<0?'':'ok')}</div>`}
},

goals:{n:'Goal Vault',a:'Add Goal',s:'Goal',tog:1,def:{done:false},tabs:[['All Goals',()=>1],['Active Goals',r=>!r.done],['Completed Goals',r=>r.done]],sort:(a,b)=>(b.created||'').localeCompare(a.created||''),
f:[
{k:'title',l:'Goal',req:1},
{k:'desc',l:'Description',t:'ta',r:2}
],
row:r=>`<div class="t ${r.done?'dn':''}">${esc(r.title)}</div>${dsc(r)}`
},

shop:{n:'Shopping List',a:'Add Item',s:'Item',tog:1,def:{done:false},tabs:[['Pending',r=>!r.done],['Purchased',r=>r.done]],sort:(a,b)=>(b.created||'').localeCompare(a.created||''),uq:'name',
f:[
{k:'name',l:'Item name',req:1},
{k:'price',l:'Estimated price (₹, optional)',t:'num'},
{k:'link',l:'Product link (optional)',t:'url'}
],
row:r=>`<div class="t ${r.done?'dn':''}">${esc(r.name)}</div><div class="meta">${r.price?chip('≈ '+inr(r.price)):''}${chip('Added '+fmt((r.created||'').slice(0,10)))}${/^https?:\/\//i.test(r.link||'')?`<a href="${esc(r.link)}" target="_blank" rel="noopener">Open link ↗</a>`:''}</div>`},
dumps:{n:'Brain Dump',a:'Add Brain Dump',s:'Entry',sort:(a,b)=>(b.created||'').localeCompare(a.created||''),
f:[{k:'title',l:'Title',req:1},{k:'body',l:'Thoughts',t:'ta',r:8}],
row:r=>`<div class="t">${esc(r.title)}</div><p style="max-height:9em;overflow:auto">${esc(r.body)}</p><div class="meta">${chip(new Date(r.created).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'}))}</div>`},
watch:{n:'Watchlist – Movies & Series',a:'Add Movie / Series',s:'Title',tog:1,def:{done:false},tabs:[['To Watch',r=>!r.done],['Watched',r=>r.done]],sort:(a,b)=>(b.created||'').localeCompare(a.created||''),uq:'title',uq2:'type',
f:[{k:'title',l:'Title',req:1},{k:'type',l:'Type',t:'sel',o:['Movie','Series']},{k:'ott',l:'OTT platform',req:1}],
row:r=>`<div class="t ${r.done?'dn':''}">${esc(r.title)}</div><div class="meta">${chip(r.type)}<span class="chip" style="background:var(--ac);color:var(--on)">${esc(r.ott)}</span></div>`}};
function toast(m,e){const d=document.createElement('div');d.textContent=m;if(e)d.className='e';$('#toast').append(d);setTimeout(()=>d.remove(),3200)}
function fld(f,v){const id='f_'+f.k,x=v??f.d??'',l=`<label for="${id}">${f.l}${f.req?' *':''}</label>`;
if(f.t=='ta')return`<div class="fl">${l}<textarea id="${id}" name="${f.k}" rows="${f.r||3}">${esc(x)}</textarea></div>`;
if(f.t=='sel')return`<div class="fl">${l}<select id="${id}" name="${f.k}">${(typeof f.o=='function'?f.o():f.o).map(o=>`<option ${o==x?'selected':''}>${esc(o)}</option>`).join('')}</select></div>`;
return`<div class="fl">${l}<input id="${id}" name="${f.k}" type="${f.t=='num'?'number':f.t||'text'}" ${f.t=='num'?`step="any" min="0"`:''} value="${esc(x)}"></div>`}
function dlg(title,body,ok,okc){$('#dlg').innerHTML=`<form id="frm" novalidate><h2 style="margin-top:0">${title}</h2>${body}<p class="err" id="err" role="alert"></p><div class="fa"><button type="button" class="btn g" data-a="close">Cancel</button><button class="btn ${okc||''}" id="ok">${ok}</button></div></form>`;$('#dlg').showModal();const i=$('#dlg input,#dlg textarea');if(i)i.focus()}
function validate(fs,v){for(const f of fs){const x=v[f.k];if(f.req&&(x===''||x==null))return f.l.replace(/ \(.*/,'')+' is required';
if(f.t=='num'&&x!==''&&(isNaN(x)||x<(f.z?0:0.01)||x>(f.max||1e12)))return f.l.replace(/ \(.*/,'')+' is invalid';
if(f.t=='url'&&x&&!/^https?:\/\//i.test(x))return'Link must start with http:// or https://'}return''}
function vals(fs,fd){const v={};fs.forEach(f=>{let x=String(fd.get(f.k)??'').trim();if(f.t=='num')x=x===''?'':Number(x);v[f.k]=x});return v}
function openForm(key,rec,pre){const m=M[key],v=rec?(m.fill?m.fill(rec):rec):pre||{};
dlg((rec?'Edit ':'Add ')+m.s,m.f.map(f=>fld(f,v[f.k])).join(''),rec?'Save changes':'Save');
FH=async fd=>{let d=vals(m.f,fd),e=validate(m.f,d);
if(!e&&m.uq&&(S[key]||[]).some(r=>r.id!=rec?.id&&String(r[m.uq]).toLowerCase()==String(d[m.uq]).toLowerCase()&&(!m.uq2||r[m.uq2]==d[m.uq2])))e='This already exists';
if(e)return e;if(m.pre)d=m.pre(d,rec);d.updated=new Date().toISOString();
if(rec)await col(key).doc(rec.id).update(d);else await col(key).add({...m.def,created:d.updated,...d});toast(m.s+(rec?' updated':' added'))}}
function confirmDel(msg,fn){dlg('Delete?',`<p>${msg} This cannot be undone.</p>`,'Delete','d');FH=async()=>{await fn();toast('Deleted')}}
const patch=(key,id,p)=>col(key).doc(id).update(p).catch(e=>toast('Could not save changes',1));
const find=(k,id)=>(S[k]||[]).find(r=>r.id==id);
function saveST(p){if(p.theme)THM=p.theme;ST={...ST,...(THM?{theme:THM}:{}),...p};applyTheme();render();try{sdoc().set(ST).catch(()=>toast('Could not save settings',1))}catch(e){toast('Could not save settings',1)}}
function theme(){return THM||ST.theme||(()=>{try{return localStorage.getItem('mona-theme')}catch(e){}})()||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}
function applyTheme(){const t=theme();document.documentElement.dataset.mona=t;const rs=document.documentElement.style;for(const k in TV[t])rs.setProperty(k,TV[t][k]);rs.colorScheme=t;try{localStorage.setItem('mona-theme',t)}catch(e){}$('#thm').innerHTML=ic(t=='dark'?'sun':'moon')}
const hit=r=>!q||Object.values(r).join(' ').toLowerCase().includes(q);
function listHTML(key){const m=M[key],tb=m.tabs,t=TAB[key]||0;let all=(S[key]||[]).filter(hit);
if(key=='tx')all=all.filter(r=>r.date.startsWith(MON)&&(!CAT||r.category==CAT));
const it=(tb?all.filter(r=>tb[t][1](r)):all).sort(m.sort);
const tabs=tb?`<div class="tabs" role="tablist">${tb.map((x,i)=>`<button role="tab" aria-selected="${i==t}" data-a="tab" data-m="${key}" data-i="${i}">${x[0]} (${all.filter(x[1]).length})</button>`).join('')}</div>`:'';
let body;if(key=='dates'&&CALV)body=calHTML(it);else body=it.length?it.map(r=>`<article class="row">${m.tog?`<button class="ic ck ${r.done?'on':''}" data-a="tog" data-m="${key}" data-id="${r.id}" role="checkbox" aria-checked="${!!r.done}" aria-label="Mark ${r.done?'not done':'done'}">${ic('check')}</button>`:''}<div class="main">${m.row(r)}</div>${m.side?m.side(r):''}<div class="acts">${m.x?m.x(r):''}<button class="ic" data-a="edit" data-m="${key}" data-id="${r.id}" aria-label="Edit">${ic('pen')}</button><button class="ic" data-a="del" data-m="${key}" data-id="${r.id}" aria-label="Delete">${ic('trash')}</button></div></article>`).join(''):`<div class="empty">${ic(NAV.find(n=>n[0]==(key=='commits'||key=='personal'?'tx':key))[2],40)}<p>${q?'No matches found.':'Nothing here yet.'}</p></div>`;
return tabs+body}
function calHTML(it){const[y,mo]=CALM.split('-').map(Number),f=new Date(y,mo-1,1).getDay(),n=new Date(y,mo,0).getDate();
let c=['S','M','T','W','T','F','S'].map(d=>`<div class="h">${d}</div>`).join('')+'<div style="border:0;background:none"></div>'.repeat(f);
for(let d=1;d<=n;d++){const ds=`${CALM}-${pad(d)}`;c+=`<div ${ds==today()?'style="border-color:var(--ac)"':''}>${d}${it.filter(r=>r.date==ds).map(r=>`<button data-a="edit" data-m="dates" data-id="${r.id}">${esc(r.title)}</button>`).join('')}</div>`}
return`<div class="hd"><button class="ib" data-a="calnav" data-i="-1" aria-label="Previous month">${ic('left')}</button><b>${new Date(y,mo-1,1).toLocaleString('en',{month:'long',year:'numeric'})}</b><button class="ib" data-a="calnav" data-i="1" aria-label="Next month">${ic('right')}</button></div><div class="cal">${c}</div>`}
function txHTML(){const mt=(S.tx||[]).filter(r=>r.date.startsWith(MON)),sm=(a,t)=>a.filter(r=>r.type==t).reduce((s,r)=>s+r.amount,0),inc=sm(mt,'Income'),ex=sm(mt,'Expense');
const ms=[...Array(6)].map((_,i)=>{const d=new Date(MON+'-01T00:00');d.setMonth(d.getMonth()-5+i);return d.toLocaleDateString('en-CA').slice(0,7)}),dt=ms.map(m=>{const a=(S.tx||[]).filter(r=>r.date.startsWith(m));return[m,sm(a,'Income'),sm(a,'Expense')]}),mx=Math.max(1,...dt.flatMap(x=>[x[1],x[2]]));
return`<div class="tabs"><button role="tab" aria-selected="${EV=='tx'}" data-a="ev" data-m="tx">Transactions</button><button role="tab" aria-selected="${EV=='commits'}" data-a="ev" data-m="commits">Other</button></div>`+(EV=='commits'?listHTML('personal'):`<div class="hd"><label>Month <input type="month" value="${MON}" data-ch="mon" style="padding:7px;border:1px solid var(--bd);border-radius:10px;background:var(--cd)"></label></div>
<div class="sum"><div class="card"><span class="mu">Income</span><b style="color:var(--ok)">${inr(inc)}</b></div><div class="card"><span class="mu">Expenses</span><b style="color:var(--bad)">${inr(ex)}</b></div><div class="card"><span class="mu">Balance</span><b>${inr(inc-ex)}</b></div></div>
<div class="card" style="margin-bottom:12px"><span class="mu">Income vs expense, last 6 months</span><div class="ch">${dt.map(x=>`<div><span><i title="Income ${inr(x[1])}" style="height:${x[1]/mx*100}%;background:var(--ok)"></i><i title="Expense ${inr(x[2])}" style="height:${x[2]/mx*100}%;background:var(--bad)"></i></span>${new Date(x[0]+'-01T00:00').toLocaleString('en',{month:'short'})}</div>`).join('')}</div></div>
`+listHTML('tx'))}
function page(){const key=R=='tx'&&EV=='commits'?'personal':R,m=M[key];
return`<div class="hd"><h1>${M[R].n=='Transaction'?'Monthly Expenses':M[R].n}</h1><span style="display:flex;gap:8px">${R=='dates'?`<button class="btn g" data-a="calv">${CALV?'List view':'Calendar view'}</button>`:''}<button class="btn" data-a="add" data-m="${key}">${ic('plus')} ${m.a}</button></span></div>`+
(R=='tx'?txHTML():listHTML(R))}
function dash(){const a=k=>S[k]||[],mt=a('tx').filter(r=>r.date.startsWith(today().slice(0,7))),bal=mt.reduce((s,r)=>s+(r.type=='Income'?r.amount:-r.amount),0),nx=a('dates').filter(r=>r.date>=today()).sort(M.dates.sort)[0],ag=a('goals').filter(r=>!r.done),pend=a('commits').reduce((s,r)=>s+Math.max(0,r.total-paid(r)),0);
const cards=[['tasks','To-Do List',a('tasks').filter(r=>!r.done).length,'active tasks'],['tx','Monthly Expenses',inr(bal),'balance this month'],['points','Important Points',a('points').length,'saved notes'],['dates','Important Dates',nx?fmt(nx.date):'—',nx?nx.title:'no upcoming events'],['shop','Shopping List',a('shop').filter(r=>!r.done).length,'items to buy'],['goals','Goal Vault',ag.length,'active goals'],['dumps','Brain Dump',a('dumps').length,'entries'],['watch','Watchlist',a('watch').filter(r=>!r.done).length,'to watch']];
if(q)return`<h1>Search results</h1>`+COLS.map(k=>{const r=a(k).filter(hit);return r.length?`<h2>${M[k].n=='Transaction'?'Expenses':M[k].n}</h2>`+r.map(x=>`<button class="card dc" style="margin-bottom:6px" data-a="go" data-m="${k=='personal'||k=='commits'?'tx':k}">${esc(x.title||x.name)}</button>`).join(''):''}).join('')||'<div class="empty"><p>No matches found.</p></div>';
return`<div class="hero"><h1>Welcome back, Deevesh!</h1><div class="mu">${new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div><p>Small steps. Clear thoughts. Bigger possibilities.</p></div><div class="grid">${cards.map(c=>`<button class="card dc" data-a="go" data-m="${c[0]}"><small>${c[1]}</small><div class="n">${esc(c[2])}</div><small>${esc(c[3])}</small></button>`).join('')}</div>`}
function render(){$('#side').innerHTML=`<div class="logo">MONA</div><div class="tag">Deevesh’s Personal E-Diary</div>`+NAV.map(n=>`<button class="nv ${R==n[0]?'on':''}" data-a="go" data-m="${n[0]}" ${R==n[0]?'aria-current="page"':''}>${ic(n[2])}<span class="lb">${n[1]}</span></button>`).join('')+`<div class="sp"></div><button class="nv" data-a="col">${ic('left')}<span class="lb">Collapse</span></button><button class="nv" data-a="set">${ic('gear')}<span class="lb">Settings</span></button>`;
if(!db){$('#view').innerHTML='<div class="empty"><h2>Loading…</h2></div>';return}
$('#view').innerHTML=!ready?'<div class="empty"><p>Loading your diary…</p></div>':R=='dash'||(q&&R=='dash')?dash():page()}
function settings(){const t=theme();dlg('Settings',`<h2>Theme</h2><div class="tabs"><button type="button" role="tab" aria-selected="${t=='light'}" data-a="th" data-id="light">Light</button><button type="button" role="tab" aria-selected="${t=='dark'}" data-a="th" data-id="dark">Dark</button></div><h2>Data management</h2><div class="tabs"><button type="button" class="btn g" data-a="exp">Export backup (JSON)</button><button type="button" class="btn d" data-a="erase">Erase all data</button><button type="button" class="btn g" data-a="out">Sign out</button></div><h2>About</h2><p class="mu">MONA – Deevesh’s Personal E-Diary is a personal life-management and productivity platform designed to bring all important aspects of everyday life into one organized digital space.</p><p class="mu">From managing daily tasks and tracking monthly income and expenses to saving important notes, remembering upcoming dates, maintaining shopping lists, capturing random thoughts, tracking learning goals, and organizing movies and series to watch — MONA makes everything easily accessible in one place.</p>`,'Done');FH=async()=>{}}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a]');if(!b)return;const{a,m,id,i}=b.dataset,rec=m&&id?find(m,id):null;
if(a=='go'){R=m;q='';$('#q').value='';document.body.classList.remove('open');scrollTo(0,0);render()}
else if(a=='menu')document.body.classList.toggle('open');else if(a=='col'){document.body.classList.toggle('col');try{localStorage.setItem('mona-col',document.body.classList.contains('col')?1:'')}catch(x){}}
else if(a=='theme')saveST({theme:theme()=='dark'?'light':'dark'});else if(a=='th'){saveST({theme:id});settings()}
else if(a=='set')settings();else if(a=='close'){$('#dlg').close();render()}
else if(a=='add')openForm(m);else if(a=='edit')openForm(m,rec);
else if(a=='del')confirmDel(`Delete “${esc(rec.title||rec.name)}”?`,()=>col(m).doc(id).delete());
else if(a=='tog'){patch(m,id,{done:!rec.done})}
else if(a=='tab'){TAB[m]=+i;render()}else if(a=='ev'){EV=m;render()}else if(a=='evadd'){EV='commits';render();openForm('commits')}
else if(a=='pin')patch('points',id,{pinned:!rec.pinned});
else if(a=='ms'){const ms=rec.ms.map((x,k)=>k==i?{...x,d:!x.d}:x);patch('goals',id,{ms,progress:ms.length?Math.round(ms.filter(x=>x.d).length/ms.length*100):rec.progress,done:ms.length>0&&ms.every(x=>x.d)})}
else if(a=='cat'){CAT=id;render()}
else if(a=='addcat'){dlg('Add Category',fld({k:'name',l:'Category name',req:1}),'Add');FH=async fd=>{const n=String(fd.get('name')).trim();if(!n)return'Name is required';if(cats().some(c=>c.toLowerCase()==n.toLowerCase()))return'This category already exists';saveST({cats:[...cats(),n]});toast('Category added')}}
else if(a=='delcat')confirmDel(`Remove category “${esc(CAT)}”? Existing transactions keep their label.`,async()=>{saveST({cats:cats().filter(c=>c!=CAT)});CAT=''});
else if(a=='pay'){const rem=rec.total-paid(rec),fs=[{k:'a',l:'Amount (₹)',t:'num',req:1,d:Math.min(rec.inst||rem,rem)},{k:'d',l:'Date',t:'date',req:1,d:today()},{k:'n',l:'Note (optional)'}];dlg('Record payment – '+esc(rec.name),fs.map(f=>fld(f)).join(''),'Save payment');FH=async fd=>{const v=vals(fs,fd),er=validate(fs,v)||(v.a>rem?'Amount exceeds remaining '+inr(rem):'');if(er)return er;await col('commits').doc(id).update({pays:[...(rec.pays||[]),v]});toast('Payment recorded')}}
else if(a=='delpay')confirmDel('Delete this payment?',()=>col('commits').doc(id).update({pays:rec.pays.filter((_,k)=>k!=i)}));
else if(a=='calv'){CALV=!CALV;render()}else if(a=='calnav'){const d=new Date(CALM+'-01T00:00');d.setMonth(d.getMonth()+ +i);CALM=d.toLocaleDateString('en-CA').slice(0,7);render()}
else if(a=='dsave')saveDump();
else if(a=='conv'){const pre={title:rec.title,desc:rec.body};openForm(m,null,pre)}
else if(a=='exp'){const u=URL.createObjectURL(new Blob([JSON.stringify({settings:ST,...S},null,2)],{type:'application/json'})),l=document.createElement('a');l.href=u;l.download='mona-backup.json';l.click();URL.revokeObjectURL(u)}else if(a=='out'){await sb.auth.signOut();location.reload()}
else if(a=='erase')confirmDel('Erase ALL MONA records?',async()=>{await Promise.all(COLS.flatMap(c=>(S[c]||[]).map(r=>col(c).doc(r.id).delete())))})});
document.addEventListener('submit',async e=>{if(e.target.id!='frm')return;e.preventDefault();const ok=$('#ok');ok.disabled=true;try{const er=await FH(new FormData(e.target));if(er){$('#err').textContent=er;ok.disabled=false}else{$('#dlg').close();render()}}catch(x){$('#err').textContent='Something went wrong. Please try again.';ok.disabled=false}});
document.addEventListener('change',e=>{const c=e.target.dataset.ch;if(c=='mon'&&e.target.value){MON=e.target.value;render()}else if(c=='prog'){const p=+e.target.value;patch('goals',e.target.dataset.id,{progress:p,done:p>=100})}});
document.addEventListener('input',e=>{if(e.target.dataset.c)C[e.target.dataset.c]=e.target.value});
document.addEventListener('keydown',e=>{if(e.key=='Enter'&&(e.ctrlKey||e.metaKey)&&e.target.id=='cb')saveDump()});
$('#q').addEventListener('input',e=>{q=e.target.value.trim().toLowerCase();render()});
async function saveDump(){if(!C.t.trim()&&!C.b.trim())return toast('Write something first',1);const now=new Date().toISOString();try{await col('dumps').add({title:C.t.trim()||C.b.trim().slice(0,40),body:C.b.trim(),created:now,updated:now});C={t:'',b:''};render();toast('Entry saved')}catch(x){toast('Could not save entry',1)}}
$('#menu').innerHTML=ic('menu');$('#stb').innerHTML=ic('gear');try{if(localStorage.getItem('mona-col'))document.body.classList.add('col')}catch(e){}applyTheme();render();

/* ---------- Supabase data layer ---------- */
let sb,uid;
const TBL={tasks:'tasks',tx:'transactions',points:'important_points',dates:'important_dates',goals:'goals',shop:'shopping_items',dumps:'brain_dumps',watch:'watchlist_items',personal:'personal_payments',commits:'commits'};
const KM={desc:'description',created:'created_at',updated:'updated_at'},RK=Object.fromEntries(Object.entries(KM).map(([a,b])=>[b,a]));
const toRow=o=>{const r={};for(const k in o){if(k=='id')continue;r[KM[k]||k]=o[k]===''?null:o[k]}r.user_id=uid;return r};
const fromRow=r=>{const o={};for(const k in r){if(k=='user_id')continue;o[RK[k]||k]=r[k]===null?'':r[k]}return o};
const L={};
async function pull(c){const{data,error}=await sb.from(TBL[c]).select('*').eq('user_id',uid);if(error)throw error;const docs=data.map(r=>({id:r.id,data:()=>fromRow(r)}));(L[c]||[]).forEach(f=>f({docs}))}
const chk=async p=>{const{error}=await p;if(error)throw error};
const col=c=>({onSnapshot(n,e){(L[c]=L[c]||[]).push(n);pull(c).catch(e||(()=>{}))},
async add(d){await chk(sb.from(TBL[c]).insert(toRow(d)));await pull(c)},
doc:id=>({async update(d){await chk(sb.from(TBL[c]).update(toRow(d)).eq('id',id));await pull(c)},async delete(){await chk(sb.from(TBL[c]).delete().eq('id',id));await pull(c)}})});
const sdoc=()=>({onSnapshot(n){sb.from('user_settings').select('*').maybeSingle().then(({data})=>n({exists:!!data,data:()=>({theme:data?.theme||null})}))},
async set(d){await chk(sb.from('user_settings').upsert({user_id:uid,theme:d.theme||null,updated_at:new Date().toISOString()}))}});
/* ---------- Auth ---------- */
function showAuth(note){let a=$('#auth');if(!a){a=document.createElement('div');a.id='auth';document.body.append(a)}
a.innerHTML=`<form class="card" id="af"><div class="logo" style="padding:0 0 4px">MONA</div><div class="tag" style="padding:0 0 14px">Deevesh’s Personal E-Diary</div><div class="fl"><label for="em">Email</label><input id="em" type="email" autocomplete="email"></div><div class="fl"><label for="pw">Password</label><input id="pw" type="password" autocomplete="current-password"></div><p class="err" id="ae" role="alert">${esc(note||'')}</p><div class="fa"><button class="btn">Sign in</button></div></form>`;
const go=async up=>{const email=$('#em').value.trim(),password=$('#pw').value;if(!email||password.length<6){$('#ae').textContent='Enter an email and a password of at least 6 characters.';return}
const{data,error}=await(up?sb.auth.signUp({email,password}):sb.auth.signInWithPassword({email,password}));
if(error)$('#ae').textContent=error.message;else if(data.session)start(data.session);else $('#ae').textContent='Check your email to confirm your account, then sign in.'};
$('#af').onsubmit=e=>{e.preventDefault();go(false)}}
function start(s){uid=s.user.id;db=true;const a=$('#auth');if(a)a.remove();loaded=new Set();ready=false;
COLS.forEach(c=>col(c).onSnapshot(sn=>{S[c]=sn.docs.map(d=>({id:d.id,...d.data()}));loaded.add(c);if(loaded.size>=COLS.length)ready=true;if(!$('#dlg').open||!ready)render()},()=>toast('Could not load '+c,1)));
sdoc().onSnapshot(sn=>{if(sn.exists)ST=sn.data();applyTheme();if(!$('#dlg').open)render()});
setTimeout(()=>{if(!ready){ready=true;toast('Still connecting to your data…',1);render()}},10000);
setInterval(()=>{if(ready&&!$('#dlg').open)render()},3e5);render()}
(async()=>{const c=window.MONA_CONFIG||{};if(!c.url||!c.anonKey||/YOUR_/.test(c.url+c.anonKey)){$('#view').innerHTML='<div class="empty"><h2>Add your Supabase keys</h2><p>Edit config.js (see README.md).</p></div>';return}
sb=window.supabase.createClient(c.url,c.anonKey);const{data:{session}}=await sb.auth.getSession();session?start(session):showAuth()})();