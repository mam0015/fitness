import { plans, planById, REST_SECONDS } from './data.js';

const app = document.getElementById('app');
const A='./assets/';
const state={view:'plans',planId:'ali',dayIndex:0,exerciseIndex:0,setIndex:0,remaining:REST_SECONDS,running:false,paused:false,sheet:false,toast:'',timer:null,cardioSeconds:0,cardioCountdown:false,cardioRunning:false,cardioPaused:false,cardioDone:false,strengthDone:false};
const day1Thumbs={latPulldown:'lat_thumb.png',seatedCableRow:'row_thumb.png',oneArmRow:'onearm_thumb.png',barbellCurl:'curl_thumb.png',hammerCurl:'hammer_thumb.png'};

function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function mmss(s){const m=Math.floor(s/60),ss=s%60;return `${String(m).padStart(2,'0')}:${String(ss).padStart(2,'0')}`}
function plan(){return planById(state.planId)}
function day(){return plan().days[state.dayIndex]}
function exercise(){return day()?.exercises?.[state.exerciseIndex]}
function hs(x,y,w,h,label,action,extra=''){return `<button class="hotspot ${extra}" aria-label="${esc(label)}" data-action="${action}" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%"></button>`}
function canvas(content){return `<div class="app-stage"><main class="phone-canvas">${content}${state.toast?`<div class="toast">${esc(state.toast)}</div>`:''}</main></div>`}
function skin(name){return `<img class="skin" src="${A+name}" alt="" draggable="false">`}

function plansView(){
  return canvas(`${skin('plans_skin.png')}
    <div class="fix-copy ali-card-copy" style="left:45.5%;top:74.0%;width:47%;height:2.9%">4 strength days + cardio + cycling</div>
    ${hs(4,23.4,92,12.7,'Open Arnold plan','plan:arnold')}
    ${hs(4,37.3,92,12.7,'Open Ronnie plan','plan:ronnie')}
    ${hs(4,51.4,92,12.7,'Open Chris plan','plan:chris')}
    ${hs(3,65.1,94,14.6,'Open Ali plan','plan:ali')}
    ${hs(4,81.7,92,7.5,'Start Ali plan','plan:ali')}
    ${hs(0,90.8,25,9.2,'Plans','nav:plans')}
    ${hs(25,90.8,25,9.2,'Workouts','nav:workouts')}
    ${hs(50,90.8,25,9.2,'Progress','nav:progress')}
    ${hs(75,90.8,25,9.2,'Profile','nav:profile')}
  `)
}

function aliView(){
  const p=plan();
  const icons={workout:'🏋️',cardio:'🏃',cycling:'🚴',rest:'🛏️'};
  return canvas(`${skin('ali_skin.png')}
    ${hs(3,5,12,7,'Back','nav:plans')}
    <section class="ali-schedule" aria-label="Ali weekly plan">
      <div class="ali-days">${p.days.map((d,i)=>`<button class="ali-day-card" data-action="day:${i}" aria-label="${esc(d.subtitle)} ${esc(d.name)}">
        <span class="ali-day-icon">${icons[d.type]||icons.workout}</span>
        <span class="ali-day-text"><b>${esc(d.subtitle)}</b><small>${esc(d.name)}${d.cardio&&d.type==='workout'?` + ${d.cardio.minutes} min cardio`:''}</small></span>
        <span class="ali-day-arrow">›</span>
      </button>`).join('')}</div>
      <div class="ali-rest-note"><span class="clock mini-clock"></span><span><b>Rest between all strength sets: 90 sec</b><small>Tuesday: 30 min treadmill • Thursday: 25 min treadmill</small></span></div>
      <button class="primary-live ali-start" data-action="day:0">Start Monday</button>
    </section>
  `)
}

function day1View(){
  return canvas(`${skin('workout_skin.png')}
    ${hs(2,5.5,12,7,'Back','plan:ali')}
    ${hs(3,29.9,94,10.8,'Lat Pulldown details','detail:0')}
    ${hs(3,41.7,94,10.8,'Seated Cable Row details','detail:1')}
    ${hs(3,53.6,94,10.8,'One Arm Dumbbell Row details','detail:2')}
    ${hs(3,65.5,94,10.8,'Barbell Curl details','detail:3')}
    ${hs(3,77.4,94,10.8,'Hammer Curl details','detail:4')}
    ${state.sheet?detailSheet():''}
  `)
}

function genericDayView(){
  const d=day();
  if(d.type==='rest') return restDayView();
  if(d.type==='cardio' || d.type==='cycling') return cardioDayView();
  return canvas(`<section class="generic">
    <div class="generic-head"><button class="generic-back" data-action="plan:ali" aria-label="Back">‹</button><div style="width:40px"></div></div>
    <p class="day-label">${esc(d.subtitle)}</p><h1>${esc(d.name)}</h1>
    <div class="rest-banner"><div class="clock"></div><div><b>Rest: 90 sec between strength sets</b><span>Focus on form and full range of motion.</span></div></div>
    ${d.cardio?cardioAddon(d):''}
    <div class="generic-list">${d.exercises.map((e,i)=>`<button class="generic-ex" data-action="detail:${i}" aria-label="${esc(e.name)} details"><div class="num">${i+1}.</div><img src="${thumbFor(e)}" alt=""><div><b>${esc(e.name)}</b><span>${e.sets} × ${e.reps}</span></div><div class="arr">›</div></button>`).join('')}</div>
    <button class="primary-live generic-start" data-action="live:0">Start Strength Workout</button>
    ${state.sheet?detailSheet():''}
  </section>`)
}

function cardioAddon(d){
  const c=d.cardio;
  return `<div class="cardio-addon"><div class="cardio-addon-icon">🏃</div><div><span class="eyebrow">AFTER WEIGHTS</span><b>${esc(c.mode)}${c.minutes?` • ${c.minutes} min`:''}</b><small>${esc(c.intensity||'Cardio')}</small></div></div>`
}

function cardioDayView(){
  const d=day(), c=d.cardio;
  const icon=d.type==='cycling'?'🚴':'🏃';
  return canvas(`<section class="generic cardio-day-screen">
    <div class="generic-head"><button class="generic-back" data-action="plan:ali" aria-label="Back">‹</button></div>
    <div class="cardio-hero"><div class="cardio-big-icon">${icon}</div><span class="eyebrow">${esc(d.subtitle.toUpperCase())}</span><h1>${esc(d.name)}</h1><p>${esc(c.intensity||'Steady cardio session')}</p></div>
    <div class="cardio-specs">
      <div><span>MODE</span><b>${esc(c.mode)}</b></div>
      <div><span>DURATION</span><b>${c.minutes?`${c.minutes} min`:'Flexible'}</b></div>
      <div><span>INTENSITY</span><b>${esc(c.intensity||'Comfortable')}</b></div>
    </div>
    <div class="info-card"><h3>SESSION NOTES</h3><p>${d.type==='cycling'?'Keep the ride comfortable and sustainable. This is your Sunday cycling session.':'Keep this session light. The goal is extra movement and recovery, not turning Friday into another hard training day.'}</p></div>
    <button class="primary-live" data-action="start-cardio">Start ${d.type==='cycling'?'Cycling':'Cardio'}</button>
  </section>`)
}

function restDayView(){
  return canvas(`<section class="generic"><div class="generic-head"><button class="generic-back" data-action="plan:ali">‹</button></div><div class="rest-day"><div><div class="rest-icon">🛏️</div><h2>Recovery Day</h2><p>Rest, eat well and come back ready for the next training day.</p><button class="primary-live" data-action="plan:ali">Back to Ali Plan</button></div></div></section>`)
}

function detailSheet(){
  const e=exercise(); if(!e) return '';
  return `<div class="sheet-backdrop" data-action="close-sheet"><section class="sheet" role="dialog" aria-label="${esc(e.name)} details" onclick="event.stopPropagation()">
    <div class="sheet-grab"></div><div class="sheet-top"><h2>${esc(e.name)}</h2><button class="close" data-action="close-sheet" aria-label="Close">×</button></div>
    <div class="sheet-art"><img src="${thumbFor(e,true)}" alt="${esc(e.name)} exercise demonstration"><div class="muscle-pill">PRIMARY<b>${esc(e.target)}</b><br><span style="display:block;margin-top:5px">SECONDARY</span><b>${esc(e.secondary)}</b></div></div>
    <div class="stats-row"><div><span>Sets</span><b>${e.sets}</b></div><div><span>Target</span><b>${e.reps} reps</b></div><div><span>Rest</span><b>90 sec</b></div></div>
    <div class="info-card"><h3>HOW TO PERFORM</h3><p>${esc(e.howTo)}</p></div>
    <div class="info-card"><h3>KEY FORM TIPS</h3><ul class="tips">${e.tips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>
    <button class="primary-live" data-action="live:${state.exerciseIndex}">Start This Exercise</button>
  </section></div>`
}

function liveView(){
  const e=exercise(); const setLabel=`${state.setIndex+1} of ${e.sets}`;
  return canvas(`${skin('live_skin.png')}
    ${hs(4,5.3,11,6.2,'Back','back-day')}
    <div class="overlay-number set-number">${esc(setLabel)}</div>
    <div class="overlay-number timer-number" data-live-time>${mmss(state.remaining)}</div>
    <div class="pause-copy">${state.paused?'Resume':'Pause'}</div>
    ${hs(8,78.2,31,9.4,'Add 15 seconds','add15')}
    ${hs(40,78.2,30,9.4,state.paused?'Resume timer':'Pause timer','pause')}
    ${hs(72,78.2,27,9.4,'Skip rest','next')}
    ${hs(7,89.0,92,7.6,'Start Next Set','next')}
  `)
}

function cardioView(){
  const d=day(), c=d.cardio, icon=d.type==='cycling'?'🚴':'🏃';
  const time=mmss(state.cardioSeconds);
  return canvas(`<section class="generic cardio-live-screen">
    <div class="generic-head"><button class="generic-back" data-action="back-cardio" aria-label="Back">‹</button><span class="live-pill">IN PROGRESS</span></div>
    <div class="cardio-live-center"><div class="cardio-big-icon active">${icon}</div><span class="eyebrow">${esc(c.mode.toUpperCase())}</span><h2>${state.cardioCountdown?'TIME REMAINING':'ELAPSED TIME'}</h2><div class="cardio-timer" data-cardio-time>${time}</div><p>${esc(c.intensity||'Comfortable pace')}</p></div>
    <div class="cardio-controls"><button data-action="cardio-pause">${state.cardioPaused?'Resume':'Pause'}</button><button data-action="cardio-complete">Complete</button></div>
  </section>`)
}

function completeView(){
  const d=day();
  const needsCardio=d.cardio && !state.cardioDone;
  const title=needsCardio?'Strength Complete':'Day Complete';
  const message=needsCardio?`${d.name} strength work is done. Finish with ${d.cardio.mode}${d.cardio.minutes?` for ${d.cardio.minutes} minutes`:''}.`:`${d.name} finished. Nice work.`;
  return canvas(`<section class="generic"><div class="generic-head"><button class="generic-back" data-action="plan:ali">‹</button></div><div class="complete"><div><div class="complete-mark">✓</div><h2>${title}</h2><p>${esc(message)}</p>${needsCardio?`<button class="primary-live" data-action="start-cardio">Start ${d.cardio.minutes?d.cardio.minutes+' min ':''}Cardio</button>`:`<button class="primary-live" data-action="plan:ali">Back to Ali Plan</button>`}</div></div></section>`)
}

function thumbFor(e,big=false){
  if(state.dayIndex===0 && day1Thumbs[e.id]) return A+day1Thumbs[e.id];
  const map={pulldown:'lat_thumb.png',row:'row_thumb.png',onearmrow:'onearm_thumb.png',curl:'curl_thumb.png',hammercurl:'hammer_thumb.png'};
  return A+(map[e.art]||'generic_exercise.png');
}

function render(){
  clearTimer(false);
  let html='';
  if(state.view==='plans') html=plansView();
  else if(state.view==='plan') html=state.planId==='ali'?aliView():genericPlanView();
  else if(state.view==='day') html=(state.planId==='ali'&&state.dayIndex===0)?day1View():genericDayView();
  else if(state.view==='live') html=liveView();
  else if(state.view==='cardio') html=cardioView();
  else if(state.view==='complete') html=completeView();
  else html=plansView();
  app.innerHTML=html;
  bind();
  if(state.view==='live'&&state.running&&!state.paused) startTimer();
  if(state.view==='cardio'&&state.cardioRunning&&!state.cardioPaused) startCardioTimer();
}

function genericPlanView(){
  const p=plan();
  return canvas(`<section class="generic"><div class="generic-head"><button class="generic-back" data-action="nav:plans">‹</button></div><h1>${esc(p.name)}</h1><p class="sub">${esc(p.tag)}</p><div class="rest-banner"><div class="clock"></div><div><b>Rest between all sets: 90 sec</b><span>${esc(p.description)}</span></div></div><div class="generic-list">${p.days.map((d,i)=>`<button class="generic-ex" data-action="day:${i}"><div class="num">${d.type==='rest'?'Zz':i+1}</div><div style="width:76px;height:72px;border-radius:12px;background:linear-gradient(145deg,#2a2a2a,#111);display:grid;place-items:center;color:#ff7200;font-size:28px;font-weight:900">${d.type==='rest'?'🛏':'🏋️'}</div><div><b>${esc(d.name)}</b><span>${d.type==='rest'?'Recovery':d.exercises.length+' exercises'}</span></div><div class="arr">›</div></button>`).join('')}</div></section>`)
}

function bind(){
  app.querySelectorAll('[data-action]').forEach(el=>el.addEventListener('click',ev=>{ev.preventDefault();ev.stopPropagation();handle(el.dataset.action)}));
}
function handle(action){
  if(!action)return;
  if(action.startsWith('plan:')){state.planId=action.split(':')[1];state.view='plan';state.dayIndex=0;state.sheet=false;render();return}
  if(action==='nav:plans'){state.view='plans';state.sheet=false;render();return}
  if(action==='nav:workouts'){state.planId='ali';state.view='plan';render();return}
  if(action==='nav:progress'){flash('Progress tracking will be added to this exact visual skin.');return}
  if(action==='nav:profile'){flash('Profile will use the same orange + black visual system.');return}
  if(action.startsWith('day:')){state.dayIndex=+action.split(':')[1];state.exerciseIndex=0;state.setIndex=0;state.strengthDone=false;state.cardioDone=false;state.cardioRunning=false;state.view='day';state.sheet=false;render();return}
  if(action.startsWith('detail:')){state.exerciseIndex=+action.split(':')[1];state.sheet=true;render();return}
  if(action==='close-sheet'){state.sheet=false;render();return}
  if(action.startsWith('live:')){state.exerciseIndex=+action.split(':')[1];state.setIndex=0;state.remaining=REST_SECONDS;state.running=false;state.paused=false;state.sheet=false;state.view='live';render();return}
  if(action==='back-day'){state.view='day';state.running=false;render();return}
  if(action==='add15'){state.remaining+=15;updateLiveText();return}
  if(action==='pause'){state.paused=!state.paused;state.running=true;render();return}
  if(action==='start-cardio'){const c=day().cardio;state.cardioCountdown=Boolean(c?.minutes);state.cardioSeconds=c?.minutes?c.minutes*60:0;state.cardioRunning=true;state.cardioPaused=false;state.view='cardio';render();return}
  if(action==='cardio-pause'){state.cardioPaused=!state.cardioPaused;render();return}
  if(action==='cardio-complete'){state.cardioDone=true;state.cardioRunning=false;state.view='complete';render();return}
  if(action==='back-cardio'){state.cardioRunning=false;state.view=state.strengthDone?'complete':'day';render();return}
  if(action==='next'){advanceSet();return}
}
function advanceSet(){
  const e=exercise();
  if(state.setIndex+1<e.sets){state.setIndex++;state.remaining=REST_SECONDS;state.running=true;state.paused=false;render();return}
  if(state.exerciseIndex+1<day().exercises.length){state.exerciseIndex++;state.setIndex=0;state.remaining=REST_SECONDS;state.running=true;state.paused=false;render();return}
  state.running=false;state.strengthDone=true;state.view='complete';render();
}
function startTimer(){
  clearTimer(false);
  state.timer=setInterval(()=>{
    if(!state.running||state.paused)return;
    state.remaining=Math.max(0,state.remaining-1);updateLiveText();
    if(state.remaining<=0){clearTimer();flash('Rest complete. Start the next set.');}
  },1000)
}
function startCardioTimer(){
  clearTimer(false);
  state.timer=setInterval(()=>{
    if(!state.cardioRunning||state.cardioPaused)return;
    if(state.cardioCountdown){
      state.cardioSeconds=Math.max(0,state.cardioSeconds-1);
      updateCardioText();
      if(state.cardioSeconds<=0){clearTimer(false);state.cardioRunning=false;flash('Cardio time complete.');}
    }else{
      state.cardioSeconds+=1;
      updateCardioText();
    }
  },1000)
}
function clearTimer(reset=true){if(state.timer){clearInterval(state.timer);state.timer=null}if(reset)state.running=false}

function updateLiveText(){const t=app.querySelector('[data-live-time]');if(t)t.textContent=mmss(state.remaining)}
function updateCardioText(){const t=app.querySelector('[data-cardio-time]');if(t)t.textContent=mmss(state.cardioSeconds)}
function flash(msg){state.toast=msg;render();setTimeout(()=>{state.toast='';render()},1300)}

render();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
