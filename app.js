import { plans, buildPlan, durationOptions, defaultDurations, REST_SECONDS } from './data.js';

const app = document.getElementById('app');
const STORE_KEY = 'stronger-v8-state';
const initial = {
  route: 'home',
  goal: 'bodybuilding',
  planId: 'ali',
  durationByPlan: {...defaultDurations},
  dayIndex: 0,
  exerciseIndex: 0,
  setIndex: 0,
  infoTab: 'muscles',
  restLeft: REST_SECONDS,
  restRunning: false,
  pendingNext: null,
  workoutStartedAt: null,
  completedSets: 0,
  cardioLeft: null,
  cardioRunning: false,
  cardioStopwatch: 0,
  cardioStopwatchRunning: false,
  history: []
};
let state = {...initial};
try {
  const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
  state = {...initial, ...saved, durationByPlan: {...initial.durationByPlan, ...(saved.durationByPlan || {})}};
} catch {}
let ticker = null;

const esc = (s='') => String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch {} };
const selectedDuration = () => Number(state.durationByPlan[state.planId] || defaultDurations[state.planId] || 70);
const currentPlan = () => buildPlan(state.planId, selectedDuration());
const currentDay = () => currentPlan().days[state.dayIndex] || currentPlan().days[0];
const currentExercise = () => currentDay()?.exercises?.[state.exerciseIndex];
const totalSets = d => d?.exercises?.reduce((sum,e)=>sum + Number(e.sets || 0),0) || 0;
const fmt = s => { const n=Math.max(0,Number(s||0)); return `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`; };
const sessionMinutes = () => state.workoutStartedAt ? Math.max(1, Math.round((Date.now() - state.workoutStartedAt)/60000)) : 0;
const todayIndexAli = () => { const d=new Date().getDay(); return d===0?6:d-1; };
const localDateKey = (date=new Date()) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const splitHow = text => String(text||'').split(/\.\s+/).map(s=>s.trim()).filter(Boolean).map(s=>s.endsWith('.')?s:s+'.').slice(0,5);
const imageTag = (ex, cls='') => `<img class="${cls} remote-exercise" src="${esc(ex.fallback)}" data-remote="${esc(ex.image)}" alt="${esc(ex.name)}">`;

function hydrateRemoteImages(){
  document.querySelectorAll('img.remote-exercise[data-remote]').forEach(el=>{
    const url=el.dataset.remote; if(!url) return;
    const probe=new Image(); probe.onload=()=>{el.src=url}; probe.src=url;
  });
}
function fallbackPlanImage(el, id){ el.onerror=null; el.src=`./assets/generated/plan_${id}.jpg`; }
window.fallbackPlanImage=fallbackPlanImage;

function resetSession(){
  state.exerciseIndex=0; state.setIndex=0; state.completedSets=0; state.restLeft=REST_SECONDS; state.restRunning=false; state.pendingNext=null;
  state.workoutStartedAt=null; state.cardioLeft=null; state.cardioRunning=false; state.cardioStopwatch=0; state.cardioStopwatchRunning=false;
}
function setRoute(route){ state.route=route; save(); render(); }
function setDuration(minutes){
  state.durationByPlan[state.planId]=Number(minutes);
  resetSession(); save(); render();
}

function startTicker(){
  clearInterval(ticker);
  ticker=setInterval(()=>{
    let changed=false;
    if(state.route==='rest' && state.restRunning){
      state.restLeft=Math.max(0,state.restLeft-1); changed=true;
      if(state.restLeft<=0){ advanceAfterRest(); return; }
    }
    if(state.route==='cardio'){
      if(state.cardioRunning && typeof state.cardioLeft==='number'){
        state.cardioLeft=Math.max(0,state.cardioLeft-1); changed=true;
        if(state.cardioLeft<=0){ finishSession(); return; }
      }
      if(state.cardioStopwatchRunning){ state.cardioStopwatch+=1; changed=true; }
    }
    if(changed){ save(); render(); }
  },1000);
}

function topbar({back=false,title='STRONGER'}={}){
  return `<header class="topbar">
    ${back?'<button class="round-btn" data-action="back" aria-label="Back">‹</button>':'<div class="wordmark">STRONGER</div>'}
    ${back?`<div class="top-title">${esc(title)}</div>`:'<div class="top-spacer"></div>'}
    <button class="round-btn" data-action="profile" aria-label="Profile">●</button>
  </header>`;
}
function bottomNav(active='home'){
  return `<nav class="bottom-nav">
    <button class="nav-btn ${active==='home'?'active':''}" data-route="home"><i>⌂</i><span>Home</span></button>
    <button class="nav-btn ${active==='plans'?'active':''}" data-route="plans"><i>▦</i><span>Plans</span></button>
    <button class="nav-btn ${active==='progress'?'active':''}" data-route="progress"><i>↗</i><span>Progress</span></button>
    <button class="nav-btn ${active==='more'?'active':''}" data-route="more"><i>•••</i><span>More</span></button>
  </nav>`;
}
function shell(content,active='home'){ return `<main class="phone-shell">${content}</main>${bottomNav(active)}`; }

function goalCard(key,title,subtitle,img,tag){
  return `<button class="goal-card ${state.goal===key?'selected':''}" data-goal="${key}">
    <img src="${img}" alt="${esc(title)}">
    <div class="goal-shade"></div>
    <div class="goal-copy"><span class="mini-tag">${esc(tag)}</span><strong>${esc(title)}</strong><small>${esc(subtitle)}</small></div>
    <span class="floating-arrow">↗</span>
  </button>`;
}
function planTile(p){
  const fallback=`./assets/generated/plan_${p.id}.jpg`;
  const duration=Number(state.durationByPlan[p.id]||defaultDurations[p.id]||70);
  return `<button class="split-card" data-plan="${p.id}">
    <div class="split-photo"><img src="${esc(p.portrait)}" alt="${esc(p.name)}" onerror="this.onerror=null;this.src='${fallback}'"><span class="duration-badge">${duration} min</span></div>
    <div class="split-body"><div><strong>${esc(p.name)}</strong><small>${esc(p.short)}</small></div><span class="lime-arrow">↗</span></div>
  </button>`;
}

function homeView(){
  const recommended = state.goal==='strength' ? ['ronnie','ali','arnold','chris'] : ['arnold','chris','ali','ronnie'];
  const ordered=recommended.map(id=>plans.find(p=>p.id===id));
  return shell(`
    ${topbar()}
    <section class="home-head"><div><span class="kicker">Welcome to stronger</span><h1>Choose your goal</h1></div><span class="week-pill">WEEK 1</span></section>
    <div class="goal-grid">
      ${goalCard('strength','Strength training','Power, compounds, progression','./assets/generated/plan_ronnie.jpg','POWER')}
      ${goalCard('bodybuilding','Bodybuilding','Hypertrophy, volume, physique','./assets/generated/hero_ali.jpg','MUSCLE')}
    </div>
    <div class="section-head"><div><span class="kicker">Recommended</span><h2>Choose workout split</h2></div><button class="text-btn" data-route="plans">See all</button></div>
    <div class="split-grid">${ordered.map(planTile).join('')}</div>
  `,'home');
}

function plansView(){
  return shell(`
    ${topbar()}
    <section class="page-intro"><span class="kicker">Workout programs</span><h1>Pick your split</h1><p>Choose a plan, then choose how long you want each session to be. The workout volume changes with your time.</p></section>
    <div class="split-grid full">${plans.map(planTile).join('')}</div>
  `,'plans');
}

function durationSelector(){
  const active=selectedDuration();
  return `<section class="duration-panel">
    <div class="duration-copy"><span class="kicker">Workout length</span><strong>${active} min</strong><small>Exercises and sets adapt automatically</small></div>
    <div class="duration-options">${durationOptions.map(v=>`<button class="duration-chip ${active===v?'active':''}" data-duration="${v}">${v}<span>min</span></button>`).join('')}</div>
  </section>`;
}

function planView(){
  const p=currentPlan();
  return shell(`
    ${topbar({back:true,title:p.name})}
    <section class="plan-hero">
      <img src="${esc(p.hero)}" alt="${esc(p.name)}" onerror="this.onerror=null;this.src='./assets/generated/plan_${p.id}.jpg'">
      <div class="hero-gradient"></div>
      <div class="hero-text"><span class="mini-tag">${p.id==='ali'?'PERSONAL':'INSPIRED'}</span><h1>${esc(p.name)}</h1><p>${esc(p.description)}</p></div>
    </section>
    ${durationSelector()}
    <div class="section-head compact"><div><span class="kicker">Weekly schedule</span><h2>${p.days.length} day structure</h2></div></div>
    <div class="day-list">${p.days.map((d,i)=>{
      const isWorkout=d.type==='workout';
      const detail=isWorkout?`${d.exercises.length} exercises • ${totalSets(d)} sets${d.cardio?` • +${d.cardio.minutes}m cardio`:''}`:d.type==='rest'?'Recovery day':d.type==='cycling'?'Cycling session':'Cardio session';
      return `<button class="day-row" data-day="${i}"><div class="day-index">${String(i+1).padStart(2,'0')}</div><div class="day-main"><span>${esc(d.subtitle)}</span><strong>${esc(d.name)}</strong><small>${esc(detail)}</small></div><span class="row-arrow">›</span></button>`;
    }).join('')}</div>
    <button class="cta-lime" data-day="0">Start first session <span>↗</span></button>
  `,'plans');
}

function dayView(){
  const d=currentDay();
  if(d.type==='rest') return restDayView();
  if(d.type==='cardio'||d.type==='cycling') return cardioView();
  return shell(`
    ${topbar({back:true,title:d.name})}
    <section class="workout-summary">
      <div><span class="kicker">${esc(d.subtitle)}</span><h1>${esc(d.name)}</h1><p>Built for your selected ${selectedDuration()} minute session.</p></div>
      <div class="summary-badge"><b>${selectedDuration()}</b><span>MIN</span></div>
    </section>
    ${durationSelector()}
    <div class="workout-stats"><div><b>${d.exercises.length}</b><span>Exercises</span></div><div><b>${totalSets(d)}</b><span>Sets</span></div><div><b>90s</b><span>Rest</span></div></div>
    ${d.cardio?`<div class="cardio-note"><span>RUN</span><div><strong>${d.cardio.minutes} min ${esc(d.cardio.mode)}</strong><small>Included inside the ${selectedDuration()} minute target</small></div></div>`:''}
    <div class="exercise-stack">${d.exercises.map((e,i)=>`<button class="exercise-row" data-exercise="${i}"><div class="ex-photo">${imageTag(e)}</div><div class="ex-copy"><span class="mini-tag">${esc(e.target)}</span><strong>${esc(e.name)}</strong><small>${e.sets} sets × ${esc(e.reps)} reps</small></div><span class="row-arrow">›</span></button>`).join('')}</div>
    <button class="cta-lime" data-action="start-workout">Start workout <span>↗</span></button>
  `,'plans');
}

function exerciseView(){
  const e=currentExercise(); const d=currentDay();
  let content='';
  if(state.infoTab==='muscles') content=`<div class="info-grid"><div><span>Primary</span><b>${esc(e.target)}</b></div><div><span>Secondary</span><b>${esc(e.secondary)}</b></div><div><span>Equipment</span><b>${esc(e.equipment)}</b></div><div><span>Rest</span><b>90 sec</b></div></div>`;
  if(state.infoTab==='how') content=`<div class="steps">${splitHow(e.howTo).map((s,i)=>`<div class="step"><i>${i+1}</i><p>${esc(s)}</p></div>`).join('')}</div>`;
  if(state.infoTab==='tips') content=`<div class="tips">${e.tips.map(t=>`<p><span>✓</span>${esc(t)}</p>`).join('')}</div>`;
  return shell(`
    ${topbar({back:true,title:'Exercise'})}
    <section class="exercise-hero">${imageTag(e)}<div class="hero-gradient"></div><div class="exercise-title"><span class="mini-tag">${esc(e.target)}</span><h1>${esc(e.name)}</h1><p>${e.sets} sets × ${esc(e.reps)} reps • 90 sec rest</p></div></section>
    <div class="info-tabs"><button class="${state.infoTab==='muscles'?'active':''}" data-tab="muscles">Muscles</button><button class="${state.infoTab==='how'?'active':''}" data-tab="how">How to</button><button class="${state.infoTab==='tips'?'active':''}" data-tab="tips">Tips</button></div>
    <section class="info-card">${content}</section>
    <button class="cta-lime" data-action="start-workout">Start set 1 <span>↗</span></button>
  `,'plans');
}

function activeView(){
  const d=currentDay(), e=currentExercise(); const total=totalSets(d); const pct=total?Math.round(state.completedSets/total*100):0;
  return shell(`
    ${topbar({back:true,title:'Workout'})}
    <div class="live-progress"><span>Exercise ${state.exerciseIndex+1}/${d.exercises.length}</span><b>${pct}%</b></div><div class="progress-line"><i style="width:${pct}%"></i></div>
    <section class="live-photo">${imageTag(e)}<div class="hero-gradient"></div><div class="live-copy"><span class="mini-tag">SET ${state.setIndex+1} OF ${e.sets}</span><h1>${esc(e.name)}</h1><p>${esc(e.target)} • ${esc(e.reps)} reps</p></div></section>
    <div class="live-stats"><div><span>SET</span><b>${state.setIndex+1}/${e.sets}</b></div><div><span>REPS</span><b>${esc(e.reps)}</b></div><div><span>REST</span><b>90s</b></div></div>
    <div class="form-cue"><span>FORM</span><p>${esc(e.tips[0]||'Control every rep.')}</p></div>
    <button class="cta-lime big" data-action="complete-set">Complete set <span>✓</span></button>
    <button class="ghost-btn" data-action="exercise-info">View form & tips</button>
  `,'plans');
}

function restView(){
  const e=currentExercise(); const d=currentDay(); const pct=Math.max(0,Math.min(100,Math.round(state.restLeft/REST_SECONDS*100)));
  let next='Next set'; if(state.pendingNext==='exercise'&&d.exercises[state.exerciseIndex+1]) next=`Next: ${d.exercises[state.exerciseIndex+1].name}`; if(state.pendingNext==='cardio') next=`Next: ${d.cardio.minutes} min ${d.cardio.mode}`; if(state.pendingNext==='complete') next='Finish workout';
  return shell(`
    ${topbar({back:true,title:'Rest'})}
    <section class="rest-screen"><span class="kicker">Set complete</span><h1>Recover. Then go again.</h1><p>${esc(next)}</p>
      <div class="rest-ring" style="--pct:${pct}%"><div><strong>${fmt(state.restLeft)}</strong><span>REST</span></div></div>
      <div class="timer-actions"><button data-action="plus15"><b>+15</b><span>seconds</span></button><button data-action="toggle-rest"><b>${state.restRunning?'Ⅱ':'▶'}</b><span>${state.restRunning?'Pause':'Resume'}</span></button><button data-action="skip-rest"><b>≫</b><span>Skip</span></button></div>
      <button class="cta-lime" data-action="skip-rest">Continue <span>↗</span></button>
    </section>
  `,'plans');
}

function cardioView(){
  const d=currentDay(); const mode=d.cardio?.mode||'Cardio'; const standalone=d.type==='cardio'||d.type==='cycling'; const image=d.type==='cycling'?'./assets/generated/cycling.jpg':'./assets/generated/cardio.jpg';
  if(standalone && state.cardioLeft===null && state.cardioStopwatch===0){ state.cardioLeft=typeof d.cardio?.minutes==='number'?d.cardio.minutes*60:null; }
  const countdown=typeof state.cardioLeft==='number'; const time=countdown?state.cardioLeft:state.cardioStopwatch; const running=countdown?state.cardioRunning:state.cardioStopwatchRunning;
  return shell(`
    ${topbar({back:true,title:mode})}
    <section class="cardio-hero"><img src="${image}" alt="${esc(mode)}"><div class="hero-gradient"></div><div class="cardio-copy"><span class="mini-tag">${esc(d.subtitle)}</span><h1>${esc(mode)}</h1><p>${esc(d.cardio?.intensity||'Keep a comfortable steady pace.')}</p></div></section>
    <div class="cardio-time"><span>${countdown?'TIME LEFT':'ELAPSED'}</span><b>${fmt(time)}</b></div>
    <div class="timer-actions"><button data-action="toggle-cardio"><b>${running?'Ⅱ':'▶'}</b><span>${running?'Pause':'Start'}</span></button><button data-action="reset-cardio"><b>↺</b><span>Reset</span></button><button data-action="finish-cardio"><b>✓</b><span>Finish</span></button></div>
    <button class="cta-lime" data-action="toggle-cardio">${running?'Pause session':'Start session'} <span>↗</span></button>
  `,'plans');
}

function completeView(){
  const d=currentDay();
  return shell(`
    ${topbar({back:true,title:'Complete'})}
    <section class="complete-screen"><div class="complete-icon">✓</div><span class="kicker">Session complete</span><h1>That’s one more win.</h1><p>Your actual training data has been saved to Progress.</p></section>
    <div class="complete-grid"><div><span>Session</span><b>${esc(d.name)}</b></div><div><span>Time</span><b>${sessionMinutes()} min</b></div><div><span>Sets</span><b>${totalSets(d)}</b></div><div><span>Target</span><b>${selectedDuration()} min</b></div></div>
    <button class="cta-lime" data-action="back-plan">Back to plan <span>↗</span></button>
  `,'plans');
}

function progressView(){
  const history=state.history||[]; const totalMinutes=history.reduce((s,x)=>s+(x.duration||0),0); const totalSetsDone=history.reduce((s,x)=>s+(x.sets||0),0); const activeDays=new Set(history.map(x=>x.date)).size;
  const keys=[]; for(let i=6;i>=0;i--){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-i);keys.push(localDateKey(d));}
  const minutes=keys.map(k=>history.filter(x=>x.date===k).reduce((s,x)=>s+(x.duration||0),0)); const max=Math.max(1,...minutes);
  return shell(`
    ${topbar()}
    <section class="page-intro"><span class="kicker">Your real data</span><h1>Progress</h1><p>No fake percentages. Everything here comes from sessions you actually finish in the app.</p></section>
    <div class="metric-grid"><div><span>Sessions</span><b>${history.length}</b></div><div><span>Minutes</span><b>${totalMinutes}</b></div><div><span>Sets</span><b>${totalSetsDone}</b></div><div><span>Active days</span><b>${activeDays}</b></div></div>
    <section class="chart-card"><div class="section-head compact"><div><span class="kicker">Last 7 days</span><h2>Training minutes</h2></div></div><div class="bars">${minutes.map((m,i)=>`<div class="bar-col"><div class="bar" style="height:${Math.max(4,Math.round(m/max*120))}px"></div><span>${['M','T','W','T','F','S','S'][i]}</span><small>${m}</small></div>`).join('')}</div></section>
    <div class="section-head compact"><div><span class="kicker">History</span><h2>Recent activity</h2></div></div>
    <div class="history-list">${history.length?history.slice(0,8).map(x=>`<div class="history-row"><div><strong>${esc(x.day)}</strong><small>${esc(x.plan)} • ${esc(x.date)}</small></div><div><b>${x.duration}m</b><small>${x.sets||0} sets</small></div></div>`).join(''):`<div class="empty-state">Finish your first session and it’ll show up here.</div>`}</div>
  `,'progress');
}

function restDayView(){
  const d=currentDay();
  return shell(`${topbar({back:true,title:'Recovery'})}<section class="recovery-card"><img src="./assets/generated/completion.jpg" alt="Recovery"><div class="hero-gradient"></div><div class="recovery-copy"><span class="mini-tag">${esc(d.subtitle)}</span><h1>${esc(d.name)}</h1><p>Walk, hydrate, sleep well, and let the work sink in.</p></div></section><button class="cta-lime" data-action="back-plan">Back to plan <span>↗</span></button>`,'plans');
}
function moreView(){ return shell(`${topbar()}<section class="page-intro"><span class="kicker">More</span><h1>Settings & extras</h1><p>Nutrition and account features can live here later.</p></section><div class="empty-state">Main workout experience is ready.</div>`,'more'); }

function render(){
  let html='';
  if(state.route==='home') html=homeView();
  else if(state.route==='plans') html=plansView();
  else if(state.route==='plan') html=planView();
  else if(state.route==='day') html=dayView();
  else if(state.route==='exercise') html=exerciseView();
  else if(state.route==='active') html=activeView();
  else if(state.route==='rest') html=restView();
  else if(state.route==='cardio') html=cardioView();
  else if(state.route==='complete') html=completeView();
  else if(state.route==='progress') html=progressView();
  else html=moreView();
  app.innerHTML=html; hydrateRemoteImages();
}

function startWorkout(){
  const d=currentDay();
  if(d.type==='rest') return setRoute('day');
  if(d.type==='cardio'||d.type==='cycling'){
    state.workoutStartedAt=Date.now(); state.cardioLeft=typeof d.cardio?.minutes==='number'?d.cardio.minutes*60:null; state.cardioStopwatch=0; state.cardioRunning=false; state.cardioStopwatchRunning=false; return setRoute('cardio');
  }
  state.workoutStartedAt=Date.now(); state.completedSets=0; state.exerciseIndex=Math.min(state.exerciseIndex,d.exercises.length-1); state.setIndex=0; save(); setRoute('active');
}
function completeSet(){
  const d=currentDay(), e=currentExercise(); state.completedSets+=1;
  if(state.setIndex+1<e.sets) state.pendingNext='same';
  else if(state.exerciseIndex+1<d.exercises.length) state.pendingNext='exercise';
  else if(d.cardio) state.pendingNext='cardio';
  else state.pendingNext='complete';
  state.restLeft=REST_SECONDS; state.restRunning=true; save(); setRoute('rest'); startTicker();
}
function advanceAfterRest(){
  if(state.pendingNext==='same'){state.setIndex+=1;state.restRunning=false;setRoute('active');}
  else if(state.pendingNext==='exercise'){state.exerciseIndex+=1;state.setIndex=0;state.restRunning=false;setRoute('active');}
  else if(state.pendingNext==='cardio'){const d=currentDay();state.restRunning=false;state.cardioLeft=d.cardio.minutes*60;state.cardioRunning=false;setRoute('cardio');}
  else finishSession();
}
function recordSession(){
  const d=currentDay(); const duration=sessionMinutes(); const sets=totalSets(d);
  state.history=[{date:localDateKey(),plan:currentPlan().name,day:d.name,duration,sets,target:selectedDuration()},...(state.history||[])].slice(0,100);
}
function finishSession(){
  if(!state.workoutStartedAt) state.workoutStartedAt=Date.now()-60000;
  recordSession(); state.restRunning=false; state.cardioRunning=false; state.cardioStopwatchRunning=false; save(); setRoute('complete');
}

app.addEventListener('click',e=>{
  const btn=e.target.closest('button'); if(!btn) return;
  if(btn.dataset.route){setRoute(btn.dataset.route);return;}
  if(btn.dataset.goal){state.goal=btn.dataset.goal;save();render();return;}
  if(btn.dataset.plan){state.planId=btn.dataset.plan;resetSession();setRoute('plan');return;}
  if(btn.dataset.duration){setDuration(btn.dataset.duration);return;}
  if(btn.dataset.day!=null){state.dayIndex=Number(btn.dataset.day);resetSession();setRoute('day');return;}
  if(btn.dataset.exercise!=null){state.exerciseIndex=Number(btn.dataset.exercise);state.infoTab='muscles';setRoute('exercise');return;}
  if(btn.dataset.tab){state.infoTab=btn.dataset.tab;save();render();return;}
  const a=btn.dataset.action;
  if(a==='back'){
    if(state.route==='plan') setRoute('plans');
    else if(state.route==='day') setRoute('plan');
    else if(state.route==='exercise') setRoute('day');
    else if(state.route==='active') setRoute('exercise');
    else if(state.route==='rest') setRoute('active');
    else if(state.route==='cardio') setRoute('day');
    else if(state.route==='complete') setRoute('plan');
    else setRoute('home');
  } else if(a==='start-workout') startWorkout();
  else if(a==='exercise-info') setRoute('exercise');
  else if(a==='complete-set') completeSet();
  else if(a==='plus15'){state.restLeft+=15;save();render();}
  else if(a==='toggle-rest'){state.restRunning=!state.restRunning;save();render();startTicker();}
  else if(a==='skip-rest') advanceAfterRest();
  else if(a==='toggle-cardio'){
    if(!state.workoutStartedAt) state.workoutStartedAt=Date.now();
    if(typeof state.cardioLeft==='number') state.cardioRunning=!state.cardioRunning; else state.cardioStopwatchRunning=!state.cardioStopwatchRunning;
    save();render();startTicker();
  } else if(a==='reset-cardio'){
    const d=currentDay(); if(typeof d.cardio?.minutes==='number') state.cardioLeft=d.cardio.minutes*60; else state.cardioStopwatch=0; state.cardioRunning=false;state.cardioStopwatchRunning=false;save();render();
  } else if(a==='finish-cardio') finishSession();
  else if(a==='back-plan'){resetSession();setRoute('plan');}
});

if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
startTicker(); render();
