/* Tension Lab Live — host side (projector).
   The host browser is the single source of truth: phones send hello/ans/sub/vote,
   the host scores everything and broadcasts the public state ("st") back. */
const LKEY="tensionlab.live1";
let L=(()=>{try{return JSON.parse(localStorage.getItem(LKEY)||"null")}catch(e){return null}})();
let sb=null,ch=null,conn="off",hbT=null,tickT=null,pushT=null,rT=null;
const lsave=()=>{try{localStorage.setItem(LKEY,JSON.stringify(L))}catch(e){}};
const nowMs=()=>Date.now();
const playURL=()=>new URL("play.html?r="+L.code,location.href).href;
const SHAPE=["▲","◆","●","■"];
function liveOn(){return !!(L&&L.code)}

function newRoom(){
  const old=L&&L.opt;
  L={code:String(Math.floor(1000+Math.random()*9000)),phase:"lobby",players:{},ban:[],opt:old||{qn:6,qs:20,cs:180},quiz:null,cr:null,round:0,hist:[]};
  lsave();connect();renderLive();
}
function endRoom(){if(ch){try{sb.removeChannel(ch)}catch(e){}}ch=null;L=null;try{localStorage.removeItem(LKEY)}catch(e){}conn="off";clearInterval(hbT);renderLive();render()}

function connect(){
  if(!window.supabase){conn="error";renderLive();return}
  if(ch){try{sb.removeChannel(ch)}catch(e){}}
  sb=sb||window.supabase.createClient(SB.url,SB.key);
  ch=sb.channel(CHAN(L.code),{config:{broadcast:{self:false}}});
  ch.on("broadcast",{event:"hello"},m=>onHello(m.payload||{}))
    .on("broadcast",{event:"ans"},m=>onAns(m.payload||{}))
    .on("broadcast",{event:"sub"},m=>onSub(m.payload||{}))
    .on("broadcast",{event:"vote"},m=>onVote(m.payload||{}))
    .subscribe(s=>{conn=s==="SUBSCRIBED"?"on":s==="CLOSED"?"off":"error";if(conn==="on")push();paintConn()});
  clearInterval(hbT);hbT=setInterval(()=>push(),3000);
  clearInterval(tickT);tickT=setInterval(tick,250);
}
function paintConn(){const e=document.getElementById("lv-conn");if(e){e.textContent=conn==="on"?"เชื่อมต่อแล้ว":"กำลังเชื่อมต่อ…";e.className="conn "+conn}}

/* ---------- outgoing ---------- */
function push(){clearTimeout(pushT);pushT=setTimeout(()=>{if(ch&&conn==="on")ch.send({type:"broadcast",event:"st",payload:pub()})},80)}
function ranks(){const ids=Object.keys(L.players).sort((a,b)=>L.players[b].s-L.players[a].s);const out={};let r=0,prev=null;ids.forEach((id,i)=>{const s=L.players[id].s;if(s!==prev){r=i+1;prev=s}out[id]=[s,r]});return out}
function voteCounts(){const c={};Object.values(L.cr.votes).forEach(a=>a.forEach(x=>c[x]=(c[x]||0)+1));return c}
function visibleSubs(){return L.cr.order.filter(a=>L.cr.subs[a]&&!L.cr.subs[a].hid)}
function pub(){
  const st={code:L.code,ph:L.phase,sc:ranks(),np:Object.keys(L.players).length};
  if(L.phase==="quiz"||L.phase==="quizReveal"){const q=L.quiz,Q=q.list[q.i];
    st.q={i:q.i,n:q.list.length,p:Q.p,o:Q.o,left:L.phase==="quiz"?Math.max(0,q.startAt+q.dur*1000-nowMs()):0,done:Object.keys(q.ans)};
    if(L.phase==="quizReveal"){st.q.c=Q.c;st.q.gain=q.gain}}
  if(["create","vote","voteReveal"].includes(L.phase)){const c=L.cr;
    st.cr={r:c.round,p:c.p,w:c.w,a:c.a,left:c.closed?0:Math.max(0,c.endsAt-nowMs()),closed:c.closed,done:Object.values(c.subs).filter(s=>!s.hid).map(s=>s.pid)};
    if(L.phase!=="create")st.cr.list=visibleSubs().map(aid=>({aid,t:c.subs[aid].text}));
    if(L.phase==="vote")st.cr.voted=Object.keys(c.votes);
    if(L.phase==="voteReveal"){st.cr.cnt=voteCounts();st.cr.judge=c.judge}}
  if(L.phase==="final")st.fin=awards();
  return st;
}

/* ---------- incoming ---------- */
const clean=(s,n)=>String(s||"").replace(/[\u0000-\u001f]/g," ").trim().slice(0,n);
function onHello(p){
  const pid=clean(p.pid,24);if(!/^[a-z0-9]{6,24}$/.test(pid)||L.ban.includes(pid))return;
  const n=clean(p.n,20)||"ผู้เล่น";
  if(!L.players[pid])L.players[pid]={n,s:0,vg:0,j:0};else L.players[pid].n=n;
  lsave();soonRender();push();
}
function onAns(p){
  if(L.phase!=="quiz"||!L.players[p.pid])return;const q=L.quiz;
  if(p.qi!==q.i||q.ans[p.pid]||!(p.c>=0&&p.c<4))return;
  const t=nowMs()-q.startAt;if(t>q.dur*1000+800)return;
  q.ans[p.pid]={c:p.c|0,t};lsave();
  if(Object.keys(q.ans).length>=Object.keys(L.players).length)revealQuiz();else{soonRender();push()}
}
function onSub(p){
  const c=L.cr;if(L.phase!=="create"||!c||c.closed||p.r!==c.round||!L.players[p.pid])return;
  const aid=clean(p.aid,16),text=clean(p.text,280);if(!/^[a-z0-9]{6,16}$/.test(aid)||!text)return;
  if(c.subs[aid]&&c.subs[aid].pid!==p.pid)return;
  for(const k of Object.keys(c.subs))if(c.subs[k].pid===p.pid&&k!==aid){delete c.subs[k];c.order=c.order.filter(x=>x!==k)}
  if(!c.subs[aid])c.order.splice(Math.floor(Math.random()*(c.order.length+1)),0,aid);
  c.subs[aid]={pid:p.pid,text,show:!!p.show};
  if(!c.paid[p.pid]){c.paid[p.pid]=1;L.players[p.pid].s+=100}
  lsave();soonRender();push();
}
function onVote(p){
  const c=L.cr;if(L.phase!=="vote"||!c||p.r!==c.round||!L.players[p.pid])return;
  const a=[...new Set((Array.isArray(p.aids)?p.aids:[]).map(x=>String(x)))].filter(x=>c.subs[x]&&!c.subs[x].hid&&c.subs[x].pid!==p.pid).slice(0,2);
  c.votes[p.pid]=a;lsave();soonRender();push();
}

/* ---------- flow ---------- */
function startQuiz(){
  L.quiz={list:buildQuiz(L.opt.qn),i:-1,dur:L.opt.qs};nextQ();
}
function nextQ(){const q=L.quiz;q.i++;q.ans={};q.gain={};q.startAt=nowMs();L.phase="quiz";lsave();renderLive();push()}
function revealQuiz(){
  if(L.phase!=="quiz")return;const q=L.quiz,Q=q.list[q.i],D=q.dur*1000;
  for(const [pid,a] of Object.entries(q.ans)){const pts=a.c===Q.c?Math.round(500+500*Math.max(0,1-a.t/D)):0;q.gain[pid]=pts;if(L.players[pid])L.players[pid].s+=pts}
  L.phase="quizReveal";lsave();renderLive();push();
}
/* called from the wheel panel (index.html) once a pair has landed */
function sendCreate(d){
  if(!liveOn())return;
  L.round++;L.cr={round:L.round,p:d.p,w:d.w,a:d.a,dur:L.opt.cs,endsAt:nowMs()+L.opt.cs*1000,closed:false,subs:{},order:[],paid:{},votes:{},judge:null};
  L.phase="create";lsave();showTab("live");renderLive();push();
}
function addTime(s){const c=L.cr;c.endsAt=Math.max(nowMs(),c.closed?nowMs():c.endsAt)+s*1000;c.closed=false;lsave();renderLive();push()}
function closeSubs(){L.cr.closed=true;lsave();renderLive();push()}
function startVote(){L.cr.closed=true;L.phase="vote";lsave();renderLive();push()}
function closeVote(){
  const cnt=voteCounts();
  for(const [aid,n] of Object.entries(cnt)){const s=L.cr.subs[aid];if(s&&L.players[s.pid]){L.players[s.pid].s+=100*n;L.players[s.pid].vg+=n}}
  L.phase="voteReveal";saveHist();lsave();renderLive();push();
}
function setJudge(aid){
  const c=L.cr;if(L.phase!=="voteReveal"||!c.subs[aid])return;
  if(c.judge&&c.subs[c.judge]&&L.players[c.subs[c.judge].pid]){const p=L.players[c.subs[c.judge].pid];p.s-=300;p.j--}
  if(c.judge===aid){c.judge=null}else{c.judge=aid;const p=L.players[c.subs[aid].pid];if(p){p.s+=300;p.j++}}
  saveHist();lsave();renderLive();push();
}
function hideSub(aid){const s=L.cr.subs[aid];if(!s)return;s.hid=!s.hid;for(const k in L.cr.votes)L.cr.votes[k]=L.cr.votes[k].filter(x=>x!==aid);lsave();renderLive();push()}
function saveHist(){const c=L.cr;const j=c.judge?c.subs[c.judge]:null;
  const h={round:c.round,p:c.p,w:c.w,judge:j?{pid:j.pid,text:j.text,show:j.show}:null};
  const i=L.hist.findIndex(x=>x.round===c.round);if(i>=0)L.hist[i]=h;else L.hist.push(h)}
function awards(){
  const r=ranks(),ids=Object.keys(r).sort((a,b)=>r[a][1]-r[b][1]);
  const mv=Math.max(0,...ids.map(id=>L.players[id].vg));
  return{top:ids.filter(id=>r[id][1]<=3),fav:mv>0?ids.filter(id=>L.players[id].vg===mv):[],judge:L.hist.filter(h=>h.judge).map(h=>h.judge.pid)};
}
function toFinal(){L.phase="final";lsave();renderLive();push()}
function kick(pid){if(!confirmKick(pid))return;delete L.players[pid];L.ban.push(pid);lsave();renderLive();push()}
let kickArm=null;function confirmKick(pid){if(kickArm===pid){kickArm=null;return true}kickArm=pid;renderLive();setTimeout(()=>{if(kickArm===pid){kickArm=null;renderLive()}},3000);return false}

function tick(){
  if(!L)return;
  if(L.phase==="quiz"){const left=L.quiz.startAt+L.quiz.dur*1000-nowMs();if(left<=0){revealQuiz();return}paintCount(left)}
  if(L.phase==="create"&&!L.cr.closed){const left=L.cr.endsAt-nowMs();if(left<=0){closeSubs();beep();return}paintCount(left)}
}
function paintCount(ms){const e=document.getElementById("lv-count");if(!e)return;const s=Math.ceil(ms/1000);e.textContent=s>=60?fmt(s):s;e.classList.toggle("low",s<=5)}
function soonRender(){clearTimeout(rT);rT=setTimeout(renderLive,120)}

/* ---------- rendering ---------- */
function qrSvg(text){try{const q=qrcode(0,"M");q.addData(text);q.make();return q.createSvgTag({cellSize:8,margin:2,scalable:true})}catch(e){return""}}
const nm=pid=>L.players[pid]?esc(L.players[pid].n):"ผู้เล่น";
function board(n){const r=ranks();const ids=Object.keys(r).sort((a,b)=>r[a][1]-r[b][1]).slice(0,n);
  if(!ids.length)return"";return`<ol class="lb">${ids.map(id=>`<li><span class="rk">${r[id][1]}</span><span class="pn">${nm(id)}</span><b>${r[id][0]}</b></li>`).join("")}</ol>`}
function head(right){return`<div class="lv-top"><div class="lv-join"><div class="qr-s">${qrSvg(playURL())}</div><div><div class="k">เข้าร่วมที่</div><div class="lv-url">${esc(playURL().replace(/^https?:\/\//,""))}</div><div class="k">รหัสห้อง <b class="code">${L.code}</b> · ผู้เล่น ${Object.keys(L.players).length} คน · <span id="lv-conn" class="conn ${conn}">${conn==="on"?"เชื่อมต่อแล้ว":"กำลังเชื่อมต่อ…"}</span></div></div></div>${right||""}</div>`}

function renderLive(){
  const el=document.getElementById("live");if(!el)return;
  if(!L){el.innerHTML=`<div class="lv-start"><h2 class="lv-h">เล่นพร้อมกันผ่านมือถือ</h2>
    <p class="lv-sub">ผู้เล่นสแกน QR แล้วตั้งชื่อเล่น ไม่ต้องสมัครหรือติดตั้งอะไร ตอบทุกอย่างในมือถือ ไม่ต้องพูดหน้าห้อง</p>
    <ol class="steps"><li><b>อุ่นเครื่อง</b> ควิซสั้น ๆ ตอบถูกและเร็วได้คะแนน</li><li><b>คิดงาน</b> หมุนวงล้อแล้วทุกคนพิมพ์ตอบ ส่งคำตอบได้ +100</li><li><b>โหวต</b> คำตอบขึ้นจอแบบไม่มีชื่อ ได้โหวตละ +100 · ผู้สอนเลือก Judge’s pick +300</li></ol>
    <div class="actions"><button class="cta" id="lv-new">เปิดห้องใหม่</button></div></div>`;
    document.getElementById("lv-new").onclick=newRoom;return}
  let h="";const P=L.phase;
  if(P==="lobby"){
    const ids=Object.keys(L.players);
    h=`<div class="lobby"><div class="qr-b">${qrSvg(playURL())}</div><div class="lobby-r">
      <div class="k">สแกน QR หรือเปิด</div><div class="lv-url big">${esc(playURL().replace(/^https?:\/\//,""))}</div>
      <div class="k">รหัสห้อง</div><div class="code-b">${L.code}</div>
      <div class="k">ผู้เล่น ${ids.length} คน · <span id="lv-conn" class="conn ${conn}">${conn==="on"?"เชื่อมต่อแล้ว":"กำลังเชื่อมต่อ…"}</span>${ids.length?" · แตะชื่อ 2 ครั้งเพื่อนำออก":""}</div>
      <div class="names">${ids.map(id=>`<button class="nchip${kickArm===id?" arm":""}" data-k="${id}">${nm(id)}${kickArm===id?" ✕":""}</button>`).join("")}</div>
      <div class="opts"><label>ควิซ <input type="number" id="o-qn" min="2" max="15" value="${L.opt.qn}"> ข้อ</label><label>ข้อละ <input type="number" id="o-qs" min="10" max="60" value="${L.opt.qs}"> วินาที</label><label>เวลาคิดงาน <input type="number" id="o-cs" min="1" max="10" value="${Math.round(L.opt.cs/60)}"> นาที</label></div>
      <div class="actions"><button class="cta" id="lv-quiz">เริ่มรอบอุ่นเครื่อง</button><button class="ghost" id="lv-wheel">ข้ามไปรอบคิดงาน</button><button class="link" id="lv-end">ปิดห้อง</button></div>
    </div></div>`;
  }else if(P==="quiz"||P==="quizReveal"){
    const q=L.quiz,Q=q.list[q.i],rev=P==="quizReveal";const cnt=[0,0,0,0];Object.values(q.ans).forEach(a=>cnt[a.c]++);const mx=Math.max(1,...cnt);
    h=head(`<div class="lv-meta"><span class="k">อุ่นเครื่อง ข้อ ${q.i+1}/${q.list.length}</span>${rev?"":`<div class="count" id="lv-count">${q.dur}</div>`}</div>`)+
    `<h2 class="qp">${esc(Q.p)}</h2><div class="opts4">${Q.o.map((o,i)=>`<div class="o4 c${i}${rev?(i===Q.c?" right":" dim"):""}"><span class="sh">${SHAPE[i]}</span><span class="ot">${esc(o)}</span>${rev?`<span class="bar"><i style="width:${cnt[i]/mx*100}%"></i></span><b class="oc">${cnt[i]}</b>`:""}</div>`).join("")}</div>`+
    (rev?`<div class="rev-row">${board(5)}<div class="actions">${q.i+1<q.list.length?`<button class="cta" id="lv-next">ข้อต่อไป</button>`:`<button class="cta" id="lv-wheel">ไปรอบคิดงาน</button>`}${q.i+1<q.list.length?`<button class="ghost" id="lv-wheel">ข้ามไปรอบคิดงาน</button>`:""}</div></div>`
         :`<div class="actions"><span class="k">ตอบแล้ว ${Object.keys(q.ans).length}/${Object.keys(L.players).length}</span><button class="ghost" id="lv-reveal">เฉลยเลย</button></div>`);
  }else if(P==="create"){
    const c=L.cr,A=V[c.a],B=V[opp(c.a)],n=Object.values(c.subs).length;
    h=head(`<div class="lv-meta"><span class="k">รอบคิดงาน ${c.round}</span><div class="count${c.closed?" low":""}" id="lv-count">${c.closed?"หมดเวลา":fmt(Math.ceil((c.endsAt-nowMs())/1000))}</div></div>`)+
    `<div class="cr-brief"><div class="prod">${esc(c.p)}</div><div class="who">สำหรับ <b>${esc(c.w)}</b></div>
      <p class="cr-pair"><span class="dot a"></span> ให้คุณค่ากับ <b>${A.vn}</b> &nbsp; <span class="dot b"></span> แต่ก็ติดที่ <b>${B.pull}</b></p>
      <p class="q"><em>${esc(c.p)}</em> ควรสื่อสารในแง่ไหน เพื่อช่วย<em>${esc(c.w)}</em>ที่ลังเลนี้?</p></div>
    <div class="big-n"><b>${n}</b><span>/${Object.keys(L.players).length} ส่งคำตอบแล้ว</span></div>
    <div class="actions"><button class="cta" id="lv-vote">ไปโหวต</button><button class="ghost" id="lv-add">+1 นาที</button>${c.closed?"":`<button class="ghost" id="lv-close">ปิดรับคำตอบ</button>`}</div>`;
  }else if(P==="vote"||P==="voteReveal"){
    const c=L.cr,rev=P==="voteReveal",cnt=voteCounts();let list=c.order.filter(a=>c.subs[a]);
    if(rev)list=list.filter(a=>!c.subs[a].hid).sort((x,y)=>(cnt[y]||0)-(cnt[x]||0));
    const top=new Set(list.slice(0,3).filter(a=>cnt[a]));
    h=head(`<div class="lv-meta"><span class="k">${rev?"ผลโหวต":"โหวต · เลือกได้คนละ 2 คำตอบในมือถือ"}</span>${rev?"":`<span class="k">โหวตแล้ว ${Object.keys(c.votes).length}/${Object.keys(L.players).length}</span>`}</div>`)+
    `<p class="q small"><em>${esc(c.p)}</em> สำหรับ <em>${esc(c.w)}</em> · ให้คุณค่ากับ${V[c.a].vn} แต่ก็ติดที่${V[opp(c.a)].pull}</p>`+
    (list.length?`<div class="cards${list.length>8?" dense":""}">${list.map((aid,i)=>{const s=c.subs[aid];const showName=rev&&s.show&&(top.has(aid)||c.judge===aid);
      return`<div class="card${s.hid?" hid":""}${rev&&c.judge===aid?" judge":""}">${rev?"":`<span class="cn">${i+1}</span>`}<p>${esc(s.text)}</p>
        <div class="cf">${rev?`<b class="vc">${cnt[aid]||0} โหวต</b>${showName?`<span class="by">— ${nm(s.pid)}</span>`:""}<button class="jb" data-j="${aid}" aria-pressed="${c.judge===aid}">${c.judge===aid?"★ Judge’s pick":"เลือกเป็น Judge’s pick"}</button>`:`<button class="link hb" data-h="${aid}">${s.hid?"แสดง":"ซ่อน"}</button>`}</div></div>`}).join("")}</div>`:`<p class="empty">ยังไม่มีคำตอบ</p>`)+
    `<div class="actions">${rev?`<button class="cta" id="lv-wheel">รอบคิดงานถัดไป</button><button class="ghost" id="lv-final">สรุปผลและรางวัล</button>`:`<button class="cta" id="lv-cvote">ปิดโหวตและดูผล</button>`}</div>`;
  }else if(P==="final"){
    const a=awards(),r=ranks();
    h=head()+`<h2 class="lv-h">สรุปผล</h2><div class="podium">${[1,0,2].map(i=>a.top[i]?`<div class="pd p${i+1}"><div class="pn">${nm(a.top[i])}</div><div class="ps">${r[a.top[i]][0]}</div><div class="pb">${r[a.top[i]][1]}</div></div>`:"").join("")}</div>
    <div class="awards">${a.fav.length?`<div class="aw"><span class="k">ขวัญใจเพื่อน · ได้โหวตมากที่สุด</span><b>${a.fav.map(nm).join(", ")}</b><span class="k">${L.players[a.fav[0]].vg} โหวต</span></div>`:""}
    ${L.hist.filter(x=>x.judge).map(x=>`<div class="aw"><span class="k">Judge’s pick · รอบ ${x.round} ${esc(x.p)}</span><b>${x.judge.show?nm(x.judge.pid):"ไม่ประสงค์ออกนาม"}</b><p>“${esc(x.judge.text)}”</p></div>`).join("")}</div>
    <div class="actions"><button class="ghost" id="lv-back">กลับไปเล่นต่อ</button><button class="link" id="lv-end">ปิดห้อง</button></div>`;
  }
  el.innerHTML=h;
  const on=(id,f)=>{const e=document.getElementById(id);if(e)e.onclick=f};
  on("lv-quiz",()=>{readOpts();startQuiz()});on("lv-next",nextQ);on("lv-reveal",revealQuiz);
  on("lv-wheel",()=>{if(P==="lobby")readOpts();showTab("play")});on("lv-end",endRoom);
  on("lv-vote",startVote);on("lv-add",()=>addTime(60));on("lv-close",closeSubs);on("lv-cvote",closeVote);on("lv-final",toFinal);
  on("lv-back",()=>{L.phase="lobby";lsave();renderLive();push()});
  el.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>kick(b.dataset.k));
  el.querySelectorAll("[data-j]").forEach(b=>b.onclick=()=>setJudge(b.dataset.j));
  el.querySelectorAll("[data-h]").forEach(b=>b.onclick=()=>hideSub(b.dataset.h));
  if(P==="lobby")["o-qn","o-qs","o-cs"].forEach(id=>document.getElementById(id).onchange=readOpts);
  const lt=document.getElementById("tab-live");if(lt)lt.classList.toggle("live-dot",true);
}
function readOpts(){const g=(id,lo,hi,d)=>Math.max(lo,Math.min(hi,parseInt(document.getElementById(id).value)||d));
  L.opt={qn:g("o-qn",2,15,6),qs:g("o-qs",10,60,20),cs:g("o-cs",1,10,3)*60};lsave()}

if(L&&L.code)connect();
