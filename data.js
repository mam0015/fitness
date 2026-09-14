export const REST_SECONDS = 90;

const IMG_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';
const img = (sourceId, frame = 0) => `${IMG_BASE}${sourceId}/${frame}.jpg`;

const fallbackByGroup = {
  back: './assets/generated/back_hero.jpg',
  biceps: './assets/generated/back_card.jpg',
  chest: './assets/generated/plan_arnold.jpg',
  triceps: './assets/generated/plan_chris.jpg',
  shoulders: './assets/generated/plan_chris.jpg',
  abs: './assets/generated/progress.jpg',
  legs: './assets/generated/plan_ronnie.jpg',
  cardio: './assets/generated/cardio.jpg',
  cycling: './assets/generated/cycling.jpg'
};

const ex = ({id,name,sets,reps,target,secondary,tips,howTo,sourceId,group='back',equipment='Gym'}) => ({
  id,name,sets,reps,target,secondary,tips,howTo,sourceId,group,equipment,rest:REST_SECONDS,
  image: img(sourceId,0), image2: img(sourceId,1), fallback: fallbackByGroup[group] || fallbackByGroup.back
});

export const exercises = {
  latPulldown: ex({id:'latPulldown',name:'Lat Pulldown',sets:4,reps:10,target:'Lats',secondary:'Biceps • Rear delts',sourceId:'Wide-Grip_Lat_Pulldown',group:'back',equipment:'Cable machine',tips:['Keep your chest tall and ribs controlled.','Drive your elbows down, not your hands.','Pause near the upper chest and return slowly.'],howTo:'Sit with your thighs secured under the pad. Grip the bar a little wider than shoulder width, lift your chest, then pull the bar toward your upper chest by driving your elbows down. Control the bar back to full arm length without shrugging.'}),
  seatedCableRow: ex({id:'seatedCableRow',name:'Seated Cable Row',sets:4,reps:10,target:'Mid Back & Lats',secondary:'Biceps • Rear delts',sourceId:'Seated_Cable_Rows',group:'back',equipment:'Cable machine',tips:['Keep your spine neutral.','Pull the handle toward the lower ribs.','Squeeze the shoulder blades before returning.'],howTo:'Sit tall with knees slightly bent and arms long. Pull the handle into your lower ribs without rocking your torso. Squeeze your back, then extend the arms slowly until you feel a controlled stretch.'}),
  oneArmRow: ex({id:'oneArmRow',name:'One-Arm Dumbbell Row',sets:3,reps:12,target:'Lats',secondary:'Upper back • Biceps',sourceId:'One-Arm_Dumbbell_Row',group:'back',equipment:'Dumbbell + bench',tips:['Keep hips and shoulders square.','Pull your elbow toward your back pocket.','Do not twist your torso to finish the rep.'],howTo:'Brace one hand and knee on a bench. Let the dumbbell hang directly below your shoulder, then pull your elbow up and back toward your hip. Pause, squeeze your lat, and lower the dumbbell under control.'}),
  barbellCurl: ex({id:'barbellCurl',name:'Barbell Curl',sets:4,reps:10,target:'Biceps',secondary:'Forearms',sourceId:'Barbell_Curl',group:'biceps',equipment:'Barbell',tips:['Keep elbows close to your sides.','No hip swing.','Lower the bar slowly.'],howTo:'Stand tall with palms facing forward. Keep your upper arms still while curling the bar toward your shoulders. Squeeze at the top, then lower until the elbows are nearly straight.'}),
  hammerCurl: ex({id:'hammerCurl',name:'Hammer Curl',sets:3,reps:12,target:'Biceps & Brachialis',secondary:'Forearms',sourceId:'Hammer_Curls',group:'biceps',equipment:'Dumbbells',tips:['Keep a neutral thumb-up grip.','Keep shoulders relaxed.','Do not rush the lowering phase.'],howTo:'Hold dumbbells by your sides with palms facing inward. Curl the dumbbells while keeping the neutral grip and the upper arms still. Squeeze, then lower slowly.'}),

  inclineDbPress: ex({id:'inclineDbPress',name:'Incline Dumbbell Press',sets:4,reps:10,target:'Upper Chest',secondary:'Front delts • Triceps',sourceId:'Incline_Dumbbell_Press',group:'chest',equipment:'Dumbbells + incline bench',tips:['Use a moderate incline.','Keep shoulder blades gently back and down.','Lower to a comfortable depth.'],howTo:'Lie on an incline bench with dumbbells above the upper chest. Lower them beside the chest while keeping forearms close to vertical, then press up and slightly inward with control.'}),
  machineChestPress: ex({id:'machineChestPress',name:'Machine Chest Press',sets:4,reps:10,target:'Chest',secondary:'Triceps • Front delts',sourceId:'Smith_Machine_Bench_Press',group:'chest',equipment:'Chest press machine',tips:['Line handles up around mid-chest.','Keep back and shoulders supported.','Do not slam into elbow lockout.'],howTo:'Set the seat so the handles sit around mid-chest. Press forward while keeping your upper back supported, stop just short of a hard lockout, then return slowly into a comfortable chest stretch.'}),
  cableFly: ex({id:'cableFly',name:'Cable Fly',sets:3,reps:12,target:'Chest',secondary:'Front delts',sourceId:'Cable_Crossover',group:'chest',equipment:'Cable machine',tips:['Keep a soft bend in your elbows.','Think about bringing upper arms together.','Stop before shoulders roll forward.'],howTo:'Stand between the cables with one foot slightly forward. Sweep your arms forward in a wide arc, squeeze the chest, then return under control while keeping the same elbow angle.'}),
  ropePushdown: ex({id:'ropePushdown',name:'Rope Triceps Pushdown',sets:4,reps:12,target:'Triceps',secondary:'Forearms',sourceId:'Triceps_Pushdown_-_Rope_Attachment',group:'triceps',equipment:'Cable + rope',tips:['Pin elbows near your ribs.','Separate the rope at the bottom.','Keep your torso quiet.'],howTo:'Face the cable with elbows bent and upper arms fixed. Push the rope down until the elbows straighten, separate the rope slightly, squeeze the triceps, then return slowly.'}),
  overheadTriceps: ex({id:'overheadTriceps',name:'Overhead Triceps Extension',sets:3,reps:12,target:'Triceps Long Head',secondary:'Shoulders • Core',sourceId:'Cable_Rope_Overhead_Triceps_Extension',group:'triceps',equipment:'Cable + rope',tips:['Keep ribs down.','Keep elbows mostly forward.','Control the stretched position.'],howTo:'Face away from the cable with the rope behind your head. Keep the upper arms stable as you extend the elbows, squeeze the triceps, then bend the elbows slowly to return to the stretch.'}),

  seatedShoulderPress: ex({id:'seatedShoulderPress',name:'Seated Dumbbell Shoulder Press',sets:4,reps:10,target:'Shoulders',secondary:'Triceps • Upper chest',sourceId:'Dumbbell_Shoulder_Press',group:'shoulders',equipment:'Dumbbells + bench',tips:['Brace your ribs and core.','Press slightly inward.','Lower to a pain-free depth.'],howTo:'Sit against an upright bench with dumbbells around shoulder height. Brace your core, press overhead without over-arching, then lower smoothly until the elbows reach a comfortable position.'}),
  lateralRaise: ex({id:'lateralRaise',name:'Dumbbell Lateral Raise',sets:4,reps:12,target:'Side Delts',secondary:'Upper traps',sourceId:'Side_Lateral_Raise',group:'shoulders',equipment:'Dumbbells',tips:['Lead with the elbows.','Use a light enough weight to avoid swinging.','Stop around shoulder height.'],howTo:'Stand tall with dumbbells by your sides. Raise the arms out to the sides with a soft elbow bend until around shoulder height, pause briefly, then lower slowly.'}),
  reversePecDeck: ex({id:'reversePecDeck',name:'Reverse Pec Deck',sets:3,reps:12,target:'Rear Delts',secondary:'Upper back',sourceId:'Reverse_Machine_Flyes',group:'shoulders',equipment:'Reverse fly machine',tips:['Keep chest against the pad.','Move through the shoulders.','Control the return.'],howTo:'Sit facing the pad with your chest supported. Open the arms until they are roughly in line with your torso, squeeze the rear shoulders, then return slowly.'}),
  cableCrunch: ex({id:'cableCrunch',name:'Cable Crunch',sets:4,reps:15,target:'Abs',secondary:'Hip flexors',sourceId:'Cable_Crunch',group:'abs',equipment:'Cable + rope',tips:['Curl ribs toward pelvis.','Do not pull with your arms.','Exhale hard as you crunch.'],howTo:'Kneel facing the cable with the rope beside your temples. Keep the hips fairly still and curl your ribs down toward your pelvis. Pause, squeeze the abs, then return under control.'}),
  hangingKneeRaise: ex({id:'hangingKneeRaise',name:'Hanging Knee Raise',sets:3,reps:12,target:'Lower Abs',secondary:'Hip flexors • Grip',sourceId:'Hanging_Leg_Raise',group:'abs',equipment:'Pull-up bar',tips:['Start from a still hang.','Tuck your pelvis as knees rise.','Avoid swinging.'],howTo:'Hang from the bar with your shoulders active. Bring your knees upward while curling the pelvis toward your ribs, pause, then lower slowly back to a still hang.'}),

  squat: ex({id:'squat',name:'Back Squat',sets:4,reps:8,target:'Quads & Glutes',secondary:'Hamstrings • Core',sourceId:'Barbell_Squat',group:'legs',equipment:'Barbell + rack',tips:['Brace before each rep.','Keep knees tracking with toes.','Use the deepest range you can control.'],howTo:'Set the bar securely across your upper back. Brace, sit down and between the hips while keeping the feet planted, then drive through the floor to stand tall.'}),
  legPress: ex({id:'legPress',name:'Leg Press',sets:4,reps:10,target:'Quads & Glutes',secondary:'Hamstrings',sourceId:'Leg_Press',group:'legs',equipment:'Leg press machine',tips:['Keep lower back supported.','Do not let knees collapse inward.','Avoid hard knee lockout.'],howTo:'Place your feet securely on the platform. Lower the sled until your hips remain supported and your knees reach a comfortable bend, then press through the whole foot to return.'}),
  rdl: ex({id:'rdl',name:'Romanian Deadlift',sets:4,reps:10,target:'Hamstrings & Glutes',secondary:'Back • Grip',sourceId:'Romanian_Deadlift_from_Deficit',group:'legs',equipment:'Barbell or dumbbells',tips:['Push hips backward.','Keep the weight close to your legs.','Stop when you feel a strong hamstring stretch.'],howTo:'Stand with the weight at thigh level. Soften the knees, brace, then push the hips back while keeping the weight close to your legs. Squeeze the glutes to return to standing.'}),
  legExtension: ex({id:'legExtension',name:'Leg Extension',sets:3,reps:12,target:'Quads',secondary:'Hip flexors',sourceId:'Leg_Extensions',group:'legs',equipment:'Leg extension machine',tips:['Align knee with machine pivot.','Lift smoothly.','Pause briefly at the top.'],howTo:'Sit with your back supported and the pad above your ankles. Extend the knees until the legs are nearly straight, squeeze the quads, then lower under control.'}),
  legCurl: ex({id:'legCurl',name:'Leg Curl',sets:3,reps:12,target:'Hamstrings',secondary:'Calves',sourceId:'Lying_Leg_Curls',group:'legs',equipment:'Leg curl machine',tips:['Keep hips pressed into the pad.','Curl smoothly.','Control the return to the stretch.'],howTo:'Set the machine so your knee lines up with the pivot. Curl the pad toward your body, squeeze the hamstrings, then return slowly.'}),
  calfRaise: ex({id:'calfRaise',name:'Standing Calf Raise',sets:4,reps:15,target:'Calves',secondary:'Foot stabilisers',sourceId:'Standing_Calf_Raises',group:'legs',equipment:'Calf raise machine',tips:['Use a full controlled stretch.','Rise as high as comfortable.','Do not bounce.'],howTo:'Stand with the balls of your feet supported and your heels free. Lower under control, press through the forefoot to rise high, pause, then lower slowly.'}),

  benchPress: ex({id:'benchPress',name:'Barbell Bench Press',sets:4,reps:8,target:'Chest',secondary:'Triceps • Front delts',sourceId:'Barbell_Bench_Press_-_Medium_Grip',group:'chest',equipment:'Barbell + bench',tips:['Keep shoulder blades supported.','Touch around lower-to-mid chest.','Keep wrists stacked over forearms.'],howTo:'Lie on the bench with stable feet and upper back. Lower the bar under control toward the chest, then press upward while keeping the shoulders supported.'}),
  pullUp: ex({id:'pullUp',name:'Pull-Up',sets:4,reps:8,target:'Lats',secondary:'Biceps • Upper back',sourceId:'Pullups',group:'back',equipment:'Pull-up bar',tips:['Start from an active shoulder position.','Drive elbows down.','Avoid swinging.'],howTo:'Hang from the bar with a comfortable overhand grip. Brace, pull your chest toward the bar by driving the elbows down, then lower under control.'}),
  deadlift: ex({id:'deadlift',name:'Deadlift',sets:3,reps:6,target:'Posterior Chain',secondary:'Back • Quads • Grip',sourceId:'Barbell_Deadlift',group:'legs',equipment:'Barbell',tips:['Brace before the bar moves.','Keep the bar close.','Stand tall without leaning backward.'],howTo:'Stand with the bar over mid-foot. Hinge down, grip and brace, then push through the floor while extending hips and knees together. Lower under control.'}),
  dbInclineCurl: ex({id:'dbInclineCurl',name:'Incline Dumbbell Curl',sets:3,reps:10,target:'Biceps',secondary:'Forearms',sourceId:'Alternate_Incline_Dumbbell_Curl',group:'biceps',equipment:'Dumbbells + incline bench',tips:['Let arms hang naturally.','Keep shoulders still.','Lower slowly.'],howTo:'Sit back on an incline bench with the arms hanging down. Curl without letting the upper arms drift forward, squeeze the biceps, then lower slowly.'}),
  skullCrusher: ex({id:'skullCrusher',name:'EZ-Bar Skull Crusher',sets:3,reps:10,target:'Triceps',secondary:'Forearms',sourceId:'Lying_Triceps_Press',group:'triceps',equipment:'EZ-bar + bench',tips:['Keep upper arms stable.','Use a comfortable lowering path.','Do not flare elbows excessively.'],howTo:'Lie on a bench holding the EZ-bar above the chest. Bend the elbows to lower toward the forehead or slightly behind the head, then extend the elbows to return.'}),
  walkingLunge: ex({id:'walkingLunge',name:'Walking Lunge',sets:3,reps:12,target:'Quads & Glutes',secondary:'Hamstrings • Core',sourceId:'Walking_Barbell_Lunge',group:'legs',equipment:'Bodyweight or dumbbells',tips:['Take a balanced step.','Track the front knee over the foot.','Drive through the whole front foot.'],howTo:'Step forward and lower until both knees are comfortably bent. Drive through the front foot to stand and continue into the next step.'}),
  facePull: ex({id:'facePull',name:'Cable Face Pull',sets:3,reps:15,target:'Rear Delts & Upper Back',secondary:'External rotators',sourceId:'Face_Pull',group:'shoulders',equipment:'Cable + rope',tips:['Pull toward eye level.','Finish with hands apart.','Keep ribs down.'],howTo:'Set the rope around face height. Pull toward your face while spreading the hands and rotating the shoulders outward, then return slowly.'})
,
  dumbbellBench: ex({id:'dumbbellBench',name:'Flat Dumbbell Press',sets:4,reps:10,target:'Chest',secondary:'Triceps • Front delts',sourceId:'Dumbbell_Bench_Press',group:'chest',equipment:'Dumbbells + bench',tips:['Keep shoulder blades supported.','Lower with control.','Press up without crashing the dumbbells together.'],howTo:'Lie flat with a dumbbell in each hand. Lower the dumbbells beside your chest with the forearms close to vertical, then press back up while keeping your upper back stable.'}),
  pecDeck: ex({id:'pecDeck',name:'Pec Deck Fly',sets:3,reps:12,target:'Chest',secondary:'Front delts',sourceId:'Butterfly',group:'chest',equipment:'Pec deck machine',tips:['Keep your chest against the pad.','Move through a comfortable arc.','Squeeze without rounding your shoulders.'],howTo:'Sit with your back supported and elbows or forearms on the pads. Bring the arms together in front of your chest, squeeze briefly, then return slowly into the stretch.'}),
  chestDip: ex({id:'chestDip',name:'Chest Dip',sets:3,reps:10,target:'Lower Chest',secondary:'Triceps • Front delts',sourceId:'Dips_-_Chest_Version',group:'chest',equipment:'Dip bars',tips:['Lean slightly forward.','Keep shoulders controlled.','Use a depth your shoulders tolerate.'],howTo:'Support yourself on parallel bars and lean slightly forward. Lower under control by bending the elbows, then press back up while keeping tension on the chest.'}),
  barbellRow: ex({id:'barbellRow',name:'Bent-Over Barbell Row',sets:4,reps:8,target:'Mid Back',secondary:'Lats • Biceps • Rear delts',sourceId:'Bent_Over_Barbell_Row',group:'back',equipment:'Barbell',tips:['Brace your torso.','Pull toward the lower ribs.','Do not turn the row into a shrug.'],howTo:'Hinge at the hips with a braced torso and hold the bar below your knees. Row toward your lower ribs, squeeze your back, then lower the bar under control.'}),
  closePulldown: ex({id:'closePulldown',name:'Close-Grip Lat Pulldown',sets:3,reps:12,target:'Lats',secondary:'Biceps • Mid back',sourceId:'Close-Grip_Front_Lat_Pulldown',group:'back',equipment:'Cable machine',tips:['Keep chest tall.','Drive elbows toward your ribs.','Control the full stretch.'],howTo:'Use a close neutral or underhand attachment. Pull toward the upper chest by driving the elbows down and back, then return slowly to full arm length.'}),
  straightArmPulldown: ex({id:'straightArmPulldown',name:'Straight-Arm Pulldown',sets:3,reps:15,target:'Lats',secondary:'Long head triceps • Core',sourceId:'Straight-Arm_Pulldown',group:'back',equipment:'Cable machine',tips:['Keep elbows softly bent.','Keep ribs down.','Finish by driving hands toward your thighs.'],howTo:'Stand facing a high cable with arms long. Keep a small elbow bend and sweep the handle down toward your thighs by using the lats, then return under control.'}),
  arnoldPress: ex({id:'arnoldPress',name:'Arnold Press',sets:4,reps:10,target:'Shoulders',secondary:'Triceps • Upper chest',sourceId:'Arnold_Dumbbell_Press',group:'shoulders',equipment:'Dumbbells',tips:['Rotate smoothly.','Keep ribs controlled.','Do not force the bottom position.'],howTo:'Start seated with dumbbells in front of your shoulders and palms facing you. Rotate and press overhead in one smooth motion, then reverse the path under control.'}),
  cableLateral: ex({id:'cableLateral',name:'Cable Lateral Raise',sets:3,reps:15,target:'Side Delts',secondary:'Upper traps',sourceId:'Cable_Seated_Lateral_Raise',group:'shoulders',equipment:'Cable machine',tips:['Lead with the elbow.','Use a controlled range.','Avoid leaning and swinging.'],howTo:'Stand beside a low cable and hold the handle with the outside hand. Raise the arm out to the side to around shoulder height, then lower slowly.'}),
  preacherCurl: ex({id:'preacherCurl',name:'Preacher Curl',sets:3,reps:10,target:'Biceps',secondary:'Forearms',sourceId:'Preacher_Curl',group:'biceps',equipment:'Preacher bench + EZ-bar',tips:['Keep upper arms on the pad.','Do not bounce out of the bottom.','Squeeze without lifting the shoulders.'],howTo:'Sit at the preacher bench with upper arms supported. Curl the weight toward you, squeeze the biceps, then lower slowly to a controlled stretch.'}),
  cableCurl: ex({id:'cableCurl',name:'Cable Curl',sets:3,reps:12,target:'Biceps',secondary:'Forearms',sourceId:'Standing_Biceps_Cable_Curl',group:'biceps',equipment:'Cable machine',tips:['Keep elbows near your sides.','Stay tall.','Keep tension through the full rep.'],howTo:'Stand facing a low cable with arms extended. Curl the handle while keeping your upper arms still, squeeze at the top, then lower slowly.'}),
  tricepsDip: ex({id:'tricepsDip',name:'Triceps Dip',sets:3,reps:10,target:'Triceps',secondary:'Chest • Front delts',sourceId:'Dips_-_Triceps_Version',group:'triceps',equipment:'Dip bars',tips:['Keep torso more upright.','Keep elbows tracking back.','Use controlled depth.'],howTo:'Support yourself on parallel bars with a mostly upright torso. Lower by bending the elbows, then press back to the top by extending the elbows.'}),
  closeGripBench: ex({id:'closeGripBench',name:'Close-Grip Bench Press',sets:4,reps:8,target:'Triceps',secondary:'Chest • Front delts',sourceId:'Close-Grip_Barbell_Bench_Press',group:'triceps',equipment:'Barbell + bench',tips:['Use a comfortable close grip.','Keep wrists stacked.','Control the bar to the lower chest.'],howTo:'Lie on a flat bench and grip the bar slightly narrower than normal. Lower with elbows controlled, then press up while emphasizing elbow extension.'}),
  hackSquat: ex({id:'hackSquat',name:'Hack Squat',sets:4,reps:10,target:'Quads & Glutes',secondary:'Hamstrings',sourceId:'Hack_Squat',group:'legs',equipment:'Hack squat machine',tips:['Keep your back supported.','Track knees with toes.','Drive through the whole foot.'],howTo:'Stand on the platform with your back supported. Lower under control until you reach a comfortable depth, then drive the platform away to stand back up.'}),
  bulgarianSplit: ex({id:'bulgarianSplit',name:'Bulgarian Split Squat',sets:3,reps:10,target:'Quads & Glutes',secondary:'Hamstrings • Core',sourceId:'Bulgarian_Split_Squat',group:'legs',equipment:'Bench + dumbbells',tips:['Use a stable stance.','Keep front foot planted.','Control the descent.'],howTo:'Place the rear foot on a bench and the front foot far enough forward for balance. Lower the rear knee toward the floor, then drive through the front foot to stand.'}),
  seatedLegCurl: ex({id:'seatedLegCurl',name:'Seated Leg Curl',sets:3,reps:12,target:'Hamstrings',secondary:'Calves',sourceId:'Seated_Leg_Curl',group:'legs',equipment:'Seated leg curl machine',tips:['Keep hips pinned down.','Curl smoothly.','Control the stretch.'],howTo:'Sit with your thighs secured and the lower pad above your heels. Curl the pad down and back, squeeze the hamstrings, then return slowly.'}),
  seatedCalf: ex({id:'seatedCalf',name:'Seated Calf Raise',sets:4,reps:15,target:'Calves',secondary:'Foot stabilisers',sourceId:'Seated_Calf_Raise',group:'legs',equipment:'Seated calf machine',tips:['Pause in the stretch.','Rise as high as comfortable.','Do not bounce.'],howTo:'Sit with the pads over your thighs and balls of the feet supported. Lower the heels, then press through the forefoot to raise the heels high before lowering slowly.'}),
  abWheel: ex({id:'abWheel',name:'Ab Wheel Rollout',sets:3,reps:10,target:'Abs',secondary:'Lats • Shoulders',sourceId:'Ab_Roller',group:'abs',equipment:'Ab wheel',tips:['Keep ribs tucked.','Do not let the lower back sag.','Use only the range you can control.'],howTo:'Kneel with the wheel under your shoulders. Roll forward while keeping the trunk braced, then use the abs to pull yourself back to the start.'}),
  plank: ex({id:'plank',name:'Plank',sets:3,reps:'45 sec',target:'Core',secondary:'Glutes • Shoulders',sourceId:'Plank',group:'abs',equipment:'Bodyweight',tips:['Keep ribs and pelvis stacked.','Squeeze glutes.','Breathe while bracing.'],howTo:'Set up on your forearms and toes with a straight line from head to heels. Brace your abs and glutes and hold without letting the hips sag or rise.'})

};

export const durationOptions = [45, 60, 70, 90, 120];
export const defaultDurations = { ali: 70, arnold: 90, ronnie: 90, chris: 70 };

const workoutDay = (name, subtitle, pool, counts, cardio=null) => ({name, subtitle, type:'workout', pool, counts, cardio});
const restDay = (name='Rest Day',subtitle='Rest') => ({name,subtitle,type:'rest',exercises:[]});
const cardioDay = (name,subtitle,cardio) => ({name,subtitle,type:'cardio',cardio,exercises:[]});
const cyclingDay = (name,subtitle) => ({name,subtitle,type:'cycling',cardio:{mode:'Cycling',minutes:null,intensity:'Steady / comfortable pace'},exercises:[]});

const DUAL = {45:4,60:6,70:7,90:8,120:10};
const TRIPLE = {45:5,60:6,70:7,90:9,120:11};
const SINGLE = {45:4,60:5,70:6,90:7,120:8};
const ALI = {45:4,60:5,70:6,90:7,120:8};

export const plans=[
 {id:'ali',name:'Ali Plan',short:'Strength • Cardio • Cycling',description:'Four focused strength days with planned treadmill work, light cardio, recovery, and Sunday cycling.',tag:'Balanced & Effective',portrait:'./assets/generated/plan_ali.jpg',hero:'./assets/generated/hero_ali.jpg',days:[
  workoutDay('Back + Biceps','Monday',['latPulldown','barbellRow','seatedCableRow','barbellCurl','oneArmRow','hammerCurl','closePulldown','preacherCurl'],ALI),
  workoutDay('Chest + Triceps','Tuesday',['inclineDbPress','benchPress','machineChestPress','ropePushdown','cableFly','overheadTriceps','dumbbellBench','tricepsDip'],ALI,{mode:'Treadmill',minutes:30,intensity:'Moderate cardio after weights'}),
  workoutDay('Shoulders + Abs','Wednesday',['seatedShoulderPress','lateralRaise','reversePecDeck','cableCrunch','arnoldPress','hangingKneeRaise','cableLateral','abWheel'],ALI),
  workoutDay('Legs','Thursday',['squat','rdl','legPress','legCurl','hackSquat','legExtension','bulgarianSplit','calfRaise'],ALI,{mode:'Treadmill',minutes:25,intensity:'Moderate cardio after weights'}),
  cardioDay('Light Cardio','Friday',{mode:'Light Cardio',minutes:null,intensity:'Easy recovery pace'}),
  restDay('Rest Day','Saturday'),
  cyclingDay('Cycling','Sunday')
 ]},
 {id:'arnold',name:'Arnold Inspired',short:'Classic High-Volume Split',description:'Classic chest/back, shoulders/arms, and legs/abs rotation repeated twice per week. Longer workout lengths unlock substantially more volume.',tag:'High Volume • 2× Weekly',portrait:'https://commons.wikimedia.org/wiki/Special:FilePath/Arnold%20Schwarzenegger%20portrait.jpg',hero:'./assets/generated/plan_arnold.jpg',days:[
  workoutDay('Chest + Back A','Monday',['benchPress','pullUp','inclineDbPress','barbellRow','cableFly','latPulldown','dumbbellBench','seatedCableRow','pecDeck','straightArmPulldown'],DUAL),
  workoutDay('Shoulders + Arms A','Tuesday',['seatedShoulderPress','barbellCurl','closeGripBench','lateralRaise','dbInclineCurl','ropePushdown','arnoldPress','preacherCurl','overheadTriceps','reversePecDeck','cableCurl'],TRIPLE),
  workoutDay('Legs + Abs A','Wednesday',['squat','rdl','calfRaise','cableCrunch','legPress','legCurl','hangingKneeRaise','hackSquat','seatedCalf','abWheel'],DUAL),
  workoutDay('Chest + Back B','Thursday',['inclineDbPress','closePulldown','dumbbellBench','oneArmRow','chestDip','seatedCableRow','machineChestPress','straightArmPulldown','pecDeck','barbellRow'],DUAL),
  workoutDay('Shoulders + Arms B','Friday',['arnoldPress','hammerCurl','tricepsDip','cableLateral','preacherCurl','skullCrusher','reversePecDeck','cableCurl','overheadTriceps','lateralRaise','barbellCurl'],TRIPLE),
  workoutDay('Legs + Abs B','Saturday',['hackSquat','rdl','seatedCalf','abWheel','bulgarianSplit','seatedLegCurl','plank','legExtension','calfRaise','cableCrunch'],DUAL),
  restDay('Rest Day','Sunday')
 ]},
 {id:'ronnie',name:'Ronnie Inspired',short:'Mass • Heavy Compounds',description:'Heavy compound-first sessions with progressively more bodybuilding volume as workout length increases.',tag:'Mass Monster',portrait:'https://commons.wikimedia.org/wiki/Special:FilePath/Ronnie%20Coleman%20and%20Wife%20in%202009.jpg',hero:'./assets/generated/plan_ronnie.jpg',days:[
  workoutDay('Back + Biceps','Monday',['deadlift','barbellRow','latPulldown','barbellCurl','seatedCableRow','hammerCurl','oneArmRow','preacherCurl','closePulldown','cableCurl'],DUAL),
  workoutDay('Quads + Calves','Tuesday',['squat','legPress','hackSquat','calfRaise','walkingLunge','legExtension','seatedCalf','bulgarianSplit'],SINGLE),
  workoutDay('Chest + Triceps','Wednesday',['benchPress','inclineDbPress','machineChestPress','closeGripBench','dumbbellBench','ropePushdown','cableFly','skullCrusher','pecDeck','tricepsDip'],DUAL),
  workoutDay('Shoulders + Abs','Thursday',['seatedShoulderPress','lateralRaise','reversePecDeck','cableCrunch','arnoldPress','hangingKneeRaise','facePull','abWheel'],ALI),
  workoutDay('Hamstrings + Back','Friday',['rdl','deadlift','legCurl','latPulldown','seatedLegCurl','barbellRow','straightArmPulldown','oneArmRow'],SINGLE),
  restDay('Rest Day','Saturday'),
  restDay('Rest Day','Sunday')
 ]},
 {id:'chris',name:'Chris Inspired',short:'Modern PPL • Physique',description:'A six-day push/pull/legs rotation with balanced modern hypertrophy volume that scales with session length.',tag:'Aesthetic & Modern',portrait:'https://commons.wikimedia.org/wiki/Special:FilePath/Chris%20Bumstead%20on%20Gymshark.jpg',hero:'./assets/generated/plan_chris.jpg',days:[
  workoutDay('Push A','Monday',['inclineDbPress','machineChestPress','seatedShoulderPress','ropePushdown','cableFly','lateralRaise','overheadTriceps','pecDeck'],ALI),
  workoutDay('Pull A','Tuesday',['latPulldown','barbellRow','seatedCableRow','barbellCurl','facePull','hammerCurl','oneArmRow','preacherCurl'],ALI),
  workoutDay('Legs A','Wednesday',['squat','rdl','legPress','legCurl','calfRaise','bulgarianSplit','legExtension','abWheel'],ALI),
  workoutDay('Push B','Thursday',['dumbbellBench','arnoldPress','cableFly','closeGripBench','lateralRaise','tricepsDip','pecDeck','overheadTriceps'],ALI),
  workoutDay('Pull B','Friday',['closePulldown','oneArmRow','straightArmPulldown','dbInclineCurl','reversePecDeck','cableCurl','seatedCableRow','hammerCurl'],ALI),
  workoutDay('Legs B','Saturday',['hackSquat','rdl','seatedLegCurl','walkingLunge','seatedCalf','legExtension','cableCrunch','plank'],ALI),
  restDay('Rest Day','Sunday')
 ]}
];

const cloneExerciseForDuration = (exercise, index, duration, planId) => {
  const e = {...exercise};
  if (duration <= 45 && index >= 2) e.sets = Math.max(2, e.sets - 1);
  if (duration >= 120) {
    const boostLimit = planId === 'arnold' ? 6 : 4;
    if (index < boostLimit) e.sets = Math.min(5, e.sets + 1);
  }
  return e;
};

export function buildPlan(id, duration=70){
  const base = plans.find(p=>p.id===id) || plans[0];
  const bucketFor = (minutes) => minutes <= 45 ? 45 : minutes <= 60 ? 60 : minutes <= 70 ? 70 : minutes <= 90 ? 90 : 120;
  return {
    ...base,
    selectedDuration: duration,
    days: base.days.map(day => {
      if(day.type !== 'workout') return {...day, targetDuration: duration};
      const strengthMinutes = Math.max(30, duration - (day.cardio?.minutes || 0));
      const bucket = bucketFor(strengthMinutes);
      const count = Math.min(day.pool.length, day.counts?.[bucket] ?? day.pool.length);
      return {
        ...day,
        targetDuration: duration,
        strengthMinutes,
        exercises: day.pool.slice(0,count).map((exerciseId,index)=>cloneExerciseForDuration(exercises[exerciseId],index,bucket,base.id))
      };
    })
  };
}

export const planById=id=>plans.find(p=>p.id===id)||plans[0];
