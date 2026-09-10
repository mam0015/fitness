import { plans, planById, REST_SECONDS } from './data.js';

const app = document.getElementById('app');
const storeKey = 'stronger-v5-state';
const initial = {
  route: 'plans',
  planId: 'ali',
  dayIndex: 0,
  exerciseIndex: 0,
  setIndex: 0,
  infoTab: 'muscles',
  restLeft: REST_SECONDS,
  restRunning: false,
  pendingNext: null,
  cardioLeft: null,
  cardioRunning: false,
  cardioStopwatch: 0,
  cardioStopwatchRunning: false,
  workoutStartedAt: null,
  completedSets: 0,
  todayQuote: 'Discipline builds freedom.',
  history: []
};
let state = {...initial};
try { state = {...initial, ...JSON.parse(localStorage.getItem(storeKey) || '{}')}; } catch {}
let interval = null;

const save = () => { try { localStorage.setItem(storeKey, JSON.stringify(state)); } catch {} };
const esc = (s='') => String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const currentPlan = () => planById(state.planId);
const currentDay = () => currentPlan().days[state.dayIndex] || currentPlan().days[0];
const currentExercise = () => currentDay()?.exercises?.[state.exerciseIndex];
const todayIndexAli = () => { const d = new Date().getDay(); return d === 0 ? 6 : d - 1; };
const todayDayAli = () => plans.find(p => p.id === 'ali').days[todayIndexAli()];
const totalSets = (day) => day?.exercises?.reduce((n, ex) => n + ex.sets, 0) || 0;
const sessionMins = () => state.workoutStartedAt ? Math.max(1, Math.round((Date.now() - state.workoutStartedAt) / 60000)) : 0;
const dayProgress = () => { const total = totalSets(currentDay()); return total ? Math.round((state.completedSets / total) * 100) : 0; };
const fmt = (s) => { const n = Math.max(0, s || 0); const m = Math.floor(n / 60); const r = n % 60; return `${String(m).padStart(2,'0')}:${String(r).padStart(2,'0')}`; };
const splitHow = (text='') => text.split(/\.\s+/).map(s => s.trim()).filter(Boolean).map(s => s.endsWith('.') ? s : s + '.').slice(0, 5);
const imgTag = (ex, className='') => `<img class="${className} remote-image" src="${esc(ex.fallback)}" data-remote="${esc(ex.image)}" alt="${esc(ex.name)}"/>`;

function hydrateImages() {
  document.querySelectorAll('img.remote-image[data-remote]').forEach(el => {
    const src = el.dataset.remote;
    if (!src) return;
    const tester = new Image();
    tester.onload = () => { el.src = src; };
    tester.src = src;
  });
}

function startTicker() {
  clearInterval(interval);
  interval = setInterval(() => {
    let changed = false;
    if (state.route === 'rest' && state.restRunning) {
      state.restLeft = Math.max(0, state.restLeft - 1);
      changed = true;
      if (state.restLeft <= 0) advanceAfterRest();
    }
    if (state.route === 'cardio') {
      if (state.cardioRunning && typeof state.cardioLeft === 'number') {
        state.cardioLeft = Math.max(0, state.cardioLeft - 1);
        changed = true;
        if (state.cardioLeft <= 0) finishCardio();
      }
      if (state.cardioStopwatchRunning) {
        state.cardioStopwatch += 1;
        changed = true;
      }
    }
    if (changed) { save(); render(); }
  }, 1000);
}

function setRoute(route) { state.route = route; save(); render(); }
function resetWorkoutState() {
  state.exerciseIndex = 0; state.setIndex = 0; state.completedSets = 0; state.restLeft = REST_SECONDS; state.restRunning = false; state.pendingNext = null; state.workoutStartedAt = null; state.cardioLeft = null; state.cardioRunning = false; state.cardioStopwatch = 0; state.cardioStopwatchRunning = false;
}

function header({back=false, brand=true, menu=true}={}) {
  return `<header class="topbar">${back ? `<button class="icon-btn back" data-action="back">‹</button>` : `<div class="brand-wrap"><div class="brand">STR<span class="accent">O</span>NGER</div><div class="tagline">DISCIPLINE BUILDS FREEDOM</div></div>`}${menu ? `<button class="icon-btn" data-action="menu">•••</button>` : `<div style="width:40px"></div>`}</header>`;
}
function nav(active='plans') {
  return `<nav class="bottom-nav">
    <button class="nav-item ${active==='home'?'active':''}" data-route="home"><i>⌂</i><span>Home</span></button>
    <button class="nav-item ${active==='plans'?'active':''}" data-route="plans"><i>▤</i><span>Plans</span></button>
    <button class="nav-item ${active==='progress'?'active':''}" data-route="progress"><i>▥</i><span>Progress</span></button>
    <button class="nav-item ${active==='more'?'active':''}" data-route="more"><i>•••</i><span>More</span></button>
  </nav>`;
}
function shell(inner, active='plans') { return `<div class="app-shell">${inner}</div>${nav(active)}`; }

function homeView() {
  const p = plans.find(x => x.id === 'ali');
  const d = todayDayAli();
  const dayName = d.subtitle;
  return shell(`
    ${header({back:false})}
    <div class="eyebrow">Today’s focus</div>
    <h1>Train with a real plan.</h1>
    <p class="lead">Every workout already has the structure, exercise photos, tips, and timer built in.</p>
    <section class="hero-card panel" style="margin-top:18px">
      <img src="${esc(p.hero)}" alt="Ali Plan">
      <div class="hero-copy">
        <div class="hero-chip">Today • ${esc(dayName)}</div>
        <h1 style="font-size:34px">${esc(d.name)}</h1>
        <p>${d.type === 'workout' ? `${d.exercises.length} exercises • ${totalSets(d)} total sets • 90 sec rest` : d.type === 'cardio' ? 'Easy recovery cardio session.' : d.type === 'cycling' ? 'Outdoor cycling session.' : 'Recovery and reset.'}</p>
      </div>
    </section>
    <div class="pills"><span class="pill orange">Ali Plan</span><span class="pill">iPhone ready</span><span class="pill">Premium UI</span></div>
    <div class="note"><span>✦</span><span>${esc(state.todayQuote)}</span></div>
    <button class="primary" style="margin-top:18px" data-action="home-start">Open Today’s Workout</button>
  `, 'home');
}

function plansView() {
  return shell(`
    ${header()}
    <div class="eyebrow">Choose your plan</div>
    <h1>Train like the legends.</h1>
    <p class="lead">Premium dark UI, great exercise photos, detailed form tips, and a timer that actually feels good to use.</p>
    <div class="plan-list">
      ${plans.map(p => `
        <button class="plan-card ${p.id==='ali'?'active':''}" data-plan="${esc(p.id)}">
          <div class="thumb"><img src="${esc(p.portrait)}" alt="${esc(p.name)}"></div>
          <div>
            <strong>${esc(p.name)}</strong>
            <small>${esc(p.short)}</small>
            <em>${esc(p.tag)}</em>
          </div>
          <span class="chev">›</span>
        </button>
      `).join('')}
    </div>
  `, 'plans');
}

function planView() {
  const p = currentPlan();
  return shell(`
    ${header({back:true})}
    <section class="hero-card panel">
      <img src="${esc(p.hero)}" alt="${esc(p.name)}">
      <div class="hero-copy">
        <div class="hero-chip">${p.id === 'ali' ? 'Your personal plan' : 'Inspired program'}</div>
        <h1>${esc(p.name)}</h1>
        <p>${esc(p.description)}</p>
      </div>
    </section>
    <div class="pills"><span class="pill">Muscle build</span><span class="pill">Phone only</span><span class="pill orange">90 sec rest</span></div>
    <div class="section-title"><strong>Weekly schedule</strong><span>${p.days.length} days</span></div>
    <div class="schedule">
      ${p.days.map((d, i) => `
        <button class="day-card ${p.id==='ali' && i===todayIndexAli()?'today':''}" data-day="${i}">
          <div class="day-abbr">${esc(d.subtitle).slice(0,3).toUpperCase()}</div>
          <div>
            <strong>${esc(d.name)}</strong>
            <small>${d.cardio ? `<span class="orange">${d.cardio.minutes ? `+ ${d.cardio.minutes} min ${esc(d.cardio.mode)}` : esc(d.cardio.mode)}</span>` : d.type === 'rest' ? 'Rest & recover' : 'Strength session'}</small>
          </div>
          <span class="chev">›</span>
        </button>
      `).join('')}
    </div>
    <div class="note"><span>◷</span><span>Rest between all strength sets: <b>90 seconds</b></span></div>
    <button class="primary" style="margin-top:16px" data-day="0">Start ${esc(p.days[0].subtitle)}</button>
  `, 'plans');
}

function dayView() {
  const d = currentDay();
  if (d.type === 'rest') return restDayView();
  if (d.type === 'cardio' || d.type === 'cycling') return cardioView();
  const est = Math.round(totalSets(d) * 1.8 + 12 + (d.cardio?.minutes || 0));
  return shell(`
    ${header({back:true})}
    <div class="eyebrow">${esc(d.subtitle)}</div>
    <h1>${esc(d.name)}</h1>
    <p class="lead">Every exercise has its own visual, proper guidance, and a clean 90-second rest timer.</p>
    <div class="stats-row">
      <div class="stat-card"><b>${d.exercises.length}</b><span>Exercises</span></div>
      <div class="stat-card"><b>${totalSets(d)}</b><span>Total Sets</span></div>
      <div class="stat-card"><b>~${est} min</b><span>Duration</span></div>
    </div>
    ${d.cardio ? `<div class="note"><span>🏃</span><span>After weights: <b>${d.cardio.minutes} min ${esc(d.cardio.mode)}</b></span></div>`:''}
    <div class="exercise-list" style="margin-top:12px">
      ${d.exercises.map((e, i) => `
        <button class="exercise-card" data-exercise="${i}">
          <div class="thumb">${imgTag(e)}</div>
          <div><h3>${esc(e.name)}</h3><small>${e.sets} sets × ${e.reps} reps • ${esc(e.target)}</small></div>
          <div class="index-badge">${i+1}</div>
        </button>
      `).join('')}
    </div>
    <button class="primary" style="margin-top:16px" data-action="start-workout">Start Workout</button>
  `, 'plans');
}

function exerciseView() {
  const e = currentExercise();
  const d = currentDay();
  let panel = '';
  if (state.infoTab === 'muscles') {
    panel = `<div class="grid-2">
      <div class="mini-panel"><span>Primary muscle</span><b>${esc(e.target)}</b></div>
      <div class="mini-panel"><span>Secondary</span><b>${esc(e.secondary)}</b></div>
      <div class="mini-panel"><span>Equipment</span><b>${esc(e.equipment)}</b></div>
      <div class="mini-panel"><span>Rest</span><b>90 sec</b></div>
    </div>`;
  } else if (state.infoTab === 'how') {
    panel = `<div class="steps">${splitHow(e.howTo).map((s, i) => `<div class="step"><i>${i+1}</i><p>${esc(s)}</p></div>`).join('')}</div>`;
  } else {
    panel = `<div class="tip-list">${e.tips.map(t => `<p class="tip-item">${esc(t)}</p>`).join('')}</div>`;
  }
  return shell(`
    ${header({back:true})}
    <div class="eyebrow">${esc(d.subtitle)} • Exercise ${state.exerciseIndex + 1} of ${d.exercises.length}</div>
    <section class="photo-card" style="margin-top:10px">${imgTag(e)}
      <div class="photo-overlay">
        <h1 style="font-size:34px;margin:0 0 8px">${esc(e.name)}</h1>
        <div class="meta-row"><span class="pill orange">${e.sets} sets × ${e.reps} reps</span><span class="pill">${esc(e.target)}</span><span class="pill">Rest 90 sec</span></div>
      </div>
    </section>
    <div class="tabs">
      <button class="tab ${state.infoTab === 'muscles' ? 'active' : ''}" data-tab="muscles">Muscles</button>
      <button class="tab ${state.infoTab === 'how' ? 'active' : ''}" data-tab="how">How to Perform</button>
      <button class="tab ${state.infoTab === 'tips' ? 'active' : ''}" data-tab="tips">Tips</button>
    </div>
    <section class="info-panel">${panel}</section>
    <button class="primary" style="margin-top:16px" data-action="start-workout">Start Set 1</button>
  `, 'plans');
}

function activeView() {
  const e = currentExercise();
  const d = currentDay();
  const percent = dayProgress();
  return shell(`
    ${header({back:true})}
    <div class="live-header"><div><small>Exercise ${state.exerciseIndex + 1} of ${d.exercises.length}</small><h2>${esc(e.name)}</h2></div><div style="font-size:26px;font-weight:1000;color:var(--orange)">${percent}%</div></div>
    <div class="progress-track"><i style="width:${percent}%"></i></div>
    <section class="live-hero" style="margin-top:12px">${imgTag(e)}</section>
    <section class="overlay-stats">
      <div class="overlay-grid">
        <div><span>Exercise</span><b>${state.exerciseIndex + 1}/${d.exercises.length}</b></div>
        <div><span>Set</span><b>${state.setIndex + 1}/${e.sets}</b></div>
        <div><span>Target</span><b>${e.reps}</b></div>
      </div>
    </section>
    <div class="motivator"><div style="font-size:26px">💪</div><div><b>Target:</b><p>${e.tips[0] || 'Good form, keep going.'}</p></div></div>
    <button class="big-action" data-action="complete-set">Complete Set</button>
    <button class="secondary" style="margin-top:10px" data-action="exercise-info">View Form & Tips</button>
  `, 'plans');
}

function restView() {
  const e = currentExercise();
  const nextLabel = state.pendingNext === 'same'
    ? `Next set: ${Math.min(state.setIndex + 2, e.sets)} of ${e.sets}`
    : state.pendingNext === 'exercise' ? 'Next exercise' : 'Finish workout';
  const pct = Math.round((state.restLeft / REST_SECONDS) * 100);
  return shell(`
    ${header({back:true})}
    <div class="timer-wrap">
      <div class="timer-caption">Set ${state.setIndex + 1} completed</div>
      <div class="timer-sub">${esc(nextLabel)}</div>
      <div class="ring" style="--pct:${pct}%">
        <div class="ring-content"><div><strong>${fmt(state.restLeft)}</strong><span>REST</span></div></div>
      </div>
      <div class="control-row">
        <button class="control" data-action="plus15"><b>＋</b><span>+15 sec</span></button>
        <button class="control" data-action="toggle-rest"><b>${state.restRunning ? 'Ⅱ' : '▶'}</b><span>${state.restRunning ? 'Pause' : 'Resume'}</span></button>
        <button class="control" data-action="skip-rest"><b>≫</b><span>Skip</span></button>
      </div>
      <button class="primary" style="margin-top:16px" data-action="skip-rest">Next Set</button>
    </div>
  `, 'plans');
}

function cardioView() {
  const d = currentDay();
  const mode = d.cardio?.mode || 'Cardio';
  const img = d.type === 'cycling' ? './assets/generated/cycling.jpg' : './assets/generated/cardio.jpg';
  const isCountDown = typeof state.cardioLeft === 'number';
  const timeLabel = isCountDown ? fmt(state.cardioLeft) : fmt(state.cardioStopwatch);
  const running = isCountDown ? state.cardioRunning : state.cardioStopwatchRunning;
  return shell(`
    ${header({back:true})}
    <section class="cardio-photo">
      <img src="${img}" alt="${esc(mode)}">
      <div class="cardio-copy">
        <div class="eyebrow">${esc(d.subtitle)}</div>
        <h1 style="margin:4px 0 8px">${esc(mode)}</h1>
        <p>${esc(d.cardio?.intensity || 'Keep moving at a steady pace.')}</p>
      </div>
    </section>
    <div class="detail-grid">
      <div class="detail-box"><span>${isCountDown ? 'Duration' : 'Elapsed'}</span><b>${timeLabel}</b></div>
      <div class="detail-box"><span>Mode</span><b>${esc(mode)}</b></div>
      <div class="detail-box"><span>Intensity</span><b>${esc(d.cardio?.minutes ? 'Moderate' : 'Easy')}</b></div>
      <div class="detail-box"><span>Location</span><b>${d.type === 'cycling' ? 'Outdoor' : 'Treadmill'}</b></div>
    </div>
    <div class="control-row" style="margin-top:12px">
      <button class="control" data-action="start-cardio"><b>${running ? '❚❚' : '▶'}</b><span>${running ? 'Pause' : 'Start'}</span></button>
      <button class="control" data-action="reset-cardio"><b>↺</b><span>Reset</span></button>
      <button class="control" data-action="finish-cardio"><b>✓</b><span>Finish</span></button>
    </div>
    <button class="primary" style="margin-top:16px" data-action="start-cardio">${running ? 'Pause Session' : isCountDown ? `Start ${d.cardio?.minutes} Min Cardio` : `Start ${esc(mode)}`}</button>
  `, 'plans');
}

function completionView() {
  const d = currentDay();
  const total = totalSets(d);
  return shell(`
    ${header({back:true})}
    <section class="complete-hero">
      <div class="complete-burst">✓</div>
      <div class="eyebrow">Workout complete</div>
      <h1 style="margin-top:8px">Great work.</h1>
      <p>${esc(d.name)} is done. Keep stacking good sessions.</p>
    </section>
    <div class="complete-grid">
      <div class="detail-box"><span>Exercises</span><b>${d.exercises?.length || 0}</b></div>
      <div class="detail-box"><span>Sets</span><b>${total}/${total}</b></div>
      <div class="detail-box"><span>Time</span><b>${sessionMins()} min</b></div>
      <div class="detail-box"><span>Rest</span><b>90 sec</b></div>
    </div>
    <button class="primary" style="margin-top:18px" data-action="back-plan">Back to Plan</button>
    <button class="secondary" style="margin-top:10px" data-action="next-day">Next Day</button>
  `, 'plans');
}

function progressView() {
  const workouts = state.history.length;
  const totalSetsDone = state.history.reduce((n, x) => n + (x.sets || 0), 0);
  const activeDays = new Set(state.history.map(x => x.date)).size;
  const calories = workouts * 520 + 1800;
  const heights = [42, 76, 58, 84, 52, 26, 64];
  return shell(`
    ${header({back:false})}
    <section class="progress-header">
      <div class="eyebrow">Your progress</div>
      <h1 style="margin-bottom:6px">Keep going.</h1>
      <p class="lead">Small consistent sessions turn into real results.</p>
    </section>
    <div class="progress-cards">
      <div class="metric"><span>Workouts</span><b>${workouts}</b><small>+20%</small></div>
      <div class="metric"><span>Total Sets</span><b>${totalSetsDone}</b><small>+18%</small></div>
      <div class="metric"><span>Calories (est.)</span><b>${calories.toLocaleString()}</b><small>+12%</small></div>
      <div class="metric"><span>Active Days</span><b>${activeDays}</b><small>+9%</small></div>
    </div>
    <section class="chart">
      <strong>Weekly activity</strong>
      <div class="bars">
        ${heights.map((h, i) => `<div class="bar-wrap"><div class="bar" style="height:${h}px"></div><span>${['M','T','W','T','F','S','S'][i]}</span></div>`).join('')}
      </div>
    </section>
  `, 'progress');
}

function restDayView() {
  const d = currentDay();
  return shell(`
    ${header({back:true})}
    <section class="hero-card panel">
      <img src="./assets/generated/completion.jpg" alt="Rest day">
      <div class="hero-copy">
        <div class="hero-chip">${esc(d.subtitle)}</div>
        <h1>${esc(d.name)}</h1>
        <p>Recovery matters. Walk, hydrate, eat well, and come back fresh.</p>
      </div>
    </section>
    <div class="note"><span>✓</span><span>Today is for recovery. Your body grows when you recover, not only when you train.</span></div>
    <button class="primary" style="margin-top:18px" data-action="back-plan">Back to Plan</button>
  `, 'plans');
}

function moreView() {
  return shell(`
    ${header({back:false})}
    <div class="eyebrow">More</div>
    <h1>More coming soon.</h1>
    <div class="empty-card">
      <div class="emoji">⚙️</div>
      <p>Nutrition, settings, and more extras can go here later. For now, the main workout experience is ready.</p>
    </div>
  `, 'more');
}

function render() {
  let html = '';
  switch (state.route) {
    case 'home': html = homeView(); break;
    case 'plans': html = plansView(); break;
    case 'plan': html = planView(); break;
    case 'day': html = dayView(); break;
    case 'exercise': html = exerciseView(); break;
    case 'active': html = activeView(); break;
    case 'rest': html = restView(); break;
    case 'cardio': html = cardioView(); break;
    case 'complete': html = completionView(); break;
    case 'progress': html = progressView(); break;
    case 'more': html = moreView(); break;
    default: html = plansView();
  }
  app.innerHTML = html;
  hydrateImages();
}

function startWorkout() {
  const d = currentDay();
  if (d.type === 'rest') return setRoute('day');
  if (d.type === 'cardio' || d.type === 'cycling') {
    if (typeof d.cardio?.minutes === 'number') state.cardioLeft = d.cardio.minutes * 60;
    else state.cardioLeft = null;
    state.cardioStopwatch = 0;
    state.cardioStopwatchRunning = false;
    state.cardioRunning = false;
    return setRoute('cardio');
  }
  state.workoutStartedAt = Date.now();
  if (!currentExercise()) state.exerciseIndex = 0;
  setRoute('active');
}

function completeSet() {
  const d = currentDay();
  const e = currentExercise();
  state.completedSets += 1;
  if (state.setIndex + 1 < e.sets) state.pendingNext = 'same';
  else if (state.exerciseIndex + 1 < d.exercises.length) state.pendingNext = 'exercise';
  else if (d.cardio) state.pendingNext = 'cardio';
  else state.pendingNext = 'complete';
  state.restLeft = REST_SECONDS;
  state.restRunning = true;
  setRoute('rest');
}

function advanceAfterRest() {
  clearInterval(interval);
  if (state.pendingNext === 'same') {
    state.setIndex += 1;
    state.restRunning = false;
    save();
    setRoute('active');
  } else if (state.pendingNext === 'exercise') {
    state.exerciseIndex += 1;
    state.setIndex = 0;
    state.restRunning = false;
    save();
    setRoute('active');
  } else if (state.pendingNext === 'cardio') {
    const d = currentDay();
    state.restRunning = false;
    state.cardioLeft = (d.cardio?.minutes || 0) * 60;
    state.cardioRunning = false;
    save();
    setRoute('cardio');
  } else {
    finishStrengthWorkout();
  }
  startTicker();
}

function finishStrengthWorkout() {
  const d = currentDay();
  const sets = totalSets(d);
  state.history = [{date:new Date().toISOString().slice(0,10), plan:currentPlan().name, day:d.name, sets, duration:sessionMins()}, ...state.history].slice(0,30);
  state.restRunning = false;
  save();
  setRoute('complete');
}

function finishCardio() {
  const d = currentDay();
  state.history = [{date:new Date().toISOString().slice(0,10), plan:currentPlan().name, day:d.name, sets:0, duration:typeof state.cardioLeft === 'number' ? Math.round((d.cardio?.minutes||0)) : Math.max(1, Math.round(state.cardioStopwatch/60))}, ...state.history].slice(0,30);
  state.cardioRunning = false;
  state.cardioStopwatchRunning = false;
  save();
  setRoute('complete');
}

app.addEventListener('click', (e) => {
  const button = e.target.closest('button');
  if (!button) return;
  const route = button.dataset.route;
  const planId = button.dataset.plan;
  const day = button.dataset.day;
  const exercise = button.dataset.exercise;
  const tab = button.dataset.tab;
  const action = button.dataset.action;

  if (route) { setRoute(route); return; }
  if (planId) { state.planId = planId; resetWorkoutState(); setRoute('plan'); return; }
  if (day != null) { state.dayIndex = Number(day); state.exerciseIndex = 0; state.setIndex = 0; state.completedSets = 0; setRoute('day'); return; }
  if (exercise != null) { state.exerciseIndex = Number(exercise); state.infoTab = 'muscles'; setRoute('exercise'); return; }
  if (tab) { state.infoTab = tab; save(); render(); return; }

  switch (action) {
    case 'back':
      if (['plan','home','plans','progress','more'].includes(state.route)) setRoute('plans');
      else if (state.route === 'day') setRoute('plan');
      else if (state.route === 'exercise') setRoute('day');
      else if (state.route === 'active') setRoute('exercise');
      else if (state.route === 'rest') setRoute('active');
      else if (state.route === 'cardio') setRoute('day');
      else if (state.route === 'complete') setRoute('plan');
      return;
    case 'home-start':
      state.planId = 'ali'; state.dayIndex = todayIndexAli(); state.exerciseIndex = 0; state.setIndex = 0; state.completedSets = 0; setRoute('day'); return;
    case 'start-workout': startWorkout(); return;
    case 'exercise-info': setRoute('exercise'); return;
    case 'complete-set': completeSet(); startTicker(); return;
    case 'plus15': state.restLeft += 15; save(); render(); return;
    case 'toggle-rest': state.restRunning = !state.restRunning; save(); render(); return;
    case 'skip-rest': advanceAfterRest(); return;
    case 'start-cardio':
      if (typeof state.cardioLeft === 'number') state.cardioRunning = !state.cardioRunning;
      else state.cardioStopwatchRunning = !state.cardioStopwatchRunning;
      save(); render(); startTicker(); return;
    case 'reset-cardio':
      if (typeof state.cardioLeft === 'number') state.cardioLeft = (currentDay().cardio?.minutes || 0) * 60;
      else state.cardioStopwatch = 0;
      state.cardioRunning = false; state.cardioStopwatchRunning = false; save(); render(); return;
    case 'finish-cardio': finishCardio(); return;
    case 'back-plan': resetWorkoutState(); setRoute('plan'); return;
    case 'next-day':
      state.dayIndex = Math.min(state.dayIndex + 1, currentPlan().days.length - 1); resetWorkoutState(); setRoute('day'); return;
    default: return;
  }
});

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
startTicker();
render();
