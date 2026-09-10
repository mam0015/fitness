export const REST_SECONDS = 90;

const ex = (id, name, sets, reps, target, secondary, tips, howTo, art) => ({
  id, name, sets, reps, target, secondary, tips, howTo, art, rest: REST_SECONDS
});

export const exercises = {
  latPulldown: ex('latPulldown','Lat Pulldown',4,10,'Lats','Biceps, rear delts',[
    'Keep your chest tall and ribs controlled.',
    'Pull your elbows down toward your sides instead of yanking with your hands.',
    'Pause briefly near your upper chest, then return under control.'
  ],'Grip the bar slightly wider than shoulder width. Sit tall with thighs locked under the pad. Lean back only a little, drive your elbows down, bring the bar toward the upper chest, then slowly let the arms straighten without shrugging.','pulldown'),
  seatedCableRow: ex('seatedCableRow','Seated Cable Row',4,10,'Mid back & lats','Biceps, rear delts',[
    'Keep your spine neutral instead of rocking back and forth.',
    'Drive the elbows behind you and squeeze your shoulder blades together.',
    'Let the shoulders reach forward slightly at the start without rounding hard.'
  ],'Sit with knees softly bent and torso upright. Start with arms long. Pull the handle toward the lower ribs while keeping the chest lifted. Squeeze the back, then extend the arms slowly until you feel a stretch.','row'),
  oneArmRow: ex('oneArmRow','One-Arm Dumbbell Row',3,12,'Lats','Upper back, biceps',[
    'Keep hips and shoulders mostly square to the floor.',
    'Pull the elbow toward your back pocket.',
    'Avoid twisting your torso to finish the rep.'
  ],'Brace one hand on a bench, keep your back flat, and let the dumbbell hang below the shoulder. Pull the elbow up and slightly back toward the hip, pause, then lower the dumbbell under control.','onearmrow'),
  barbellCurl: ex('barbellCurl','Barbell Curl',4,10,'Biceps','Forearms',[
    'Keep elbows close to your sides.',
    'Do not swing your hips to start the rep.',
    'Lower the bar slowly instead of dropping it.'
  ],'Stand tall with the bar around hip height and palms facing forward. Keep the upper arms still, curl the bar toward the shoulders, squeeze the biceps, then lower until the elbows are almost straight.','curl'),
  hammerCurl: ex('hammerCurl','Hammer Curl',3,12,'Biceps & brachialis','Forearms',[
    'Keep a neutral thumb-up grip throughout.',
    'Keep shoulders relaxed and elbows pinned near the torso.',
    'Use a controlled range rather than rushing.'
  ],'Hold dumbbells by your sides with palms facing inward. Curl one or both dumbbells upward while keeping the neutral grip, squeeze at the top, and lower slowly.','hammercurl'),

  inclineDbPress: ex('inclineDbPress','Incline Dumbbell Press',4,10,'Upper chest','Front delts, triceps',[
    'Use a moderate bench incline instead of setting it too steep.',
    'Keep shoulder blades gently pulled back and down.',
    'Lower the dumbbells with control to a comfortable depth.'
  ],'Lie on an incline bench with dumbbells above the upper chest. Lower them beside the chest while keeping forearms close to vertical. Press up and slightly inward without smashing the dumbbells together.','press'),
  machineChestPress: ex('machineChestPress','Machine Chest Press',4,10,'Chest','Triceps, front delts',[
    'Set the seat so the handles line up around mid-chest.',
    'Keep your back and shoulders supported.',
    'Do not lock the elbows aggressively at the top.'
  ],'Sit with your upper back against the pad and grip the handles. Press forward until the arms are nearly straight, keep the chest engaged, then return slowly until you feel a comfortable stretch.','machinepress'),
  cableFly: ex('cableFly','Cable Fly',3,12,'Chest','Front delts',[
    'Keep a soft bend in your elbows.',
    'Think about bringing your upper arms together rather than your hands.',
    'Stop before the shoulders roll forward.'
  ],'Stand between the cables with one foot slightly forward. Start with arms open and elbows softly bent. Sweep the arms forward in a wide arc, squeeze the chest, then return under control.','fly'),
  ropePushdown: ex('ropePushdown','Rope Triceps Pushdown',4,12,'Triceps','Forearms',[
    'Pin your elbows near your ribs.',
    'Separate the rope slightly at the bottom.',
    'Do not turn it into a full-body movement.'
  ],'Stand tall facing the cable. Start with elbows bent and upper arms still. Push the rope down until the elbows straighten, spread the rope slightly, squeeze the triceps, then return slowly.','pushdown'),
  overheadTriceps: ex('overheadTriceps','Overhead Triceps Extension',3,12,'Triceps long head','Shoulders, core',[
    'Keep ribs down so your lower back does not over-arch.',
    'Point elbows mostly forward.',
    'Use a weight you can control through the stretch.'
  ],'Hold a rope or dumbbell overhead. Bend the elbows to lower the resistance behind your head while keeping the upper arms stable. Extend the elbows to return to the top and squeeze the triceps.','overheadtriceps'),

  seatedShoulderPress: ex('seatedShoulderPress','Seated Dumbbell Shoulder Press',4,10,'Shoulders','Triceps, upper chest',[
    'Keep your back supported and ribs stacked.',
    'Press slightly inward as the dumbbells rise.',
    'Lower until your elbows are around shoulder level or a pain-free depth.'
  ],'Sit against an upright bench with dumbbells around shoulder height. Brace your core, press the dumbbells overhead, then lower smoothly back to the starting position.','shoulderpress'),
  lateralRaise: ex('lateralRaise','Dumbbell Lateral Raise',4,12,'Side delts','Upper traps',[
    'Lead with the elbows instead of flicking the wrists.',
    'Use light enough weight to avoid swinging.',
    'Raise to about shoulder height.'
  ],'Stand tall with dumbbells by your sides. With elbows softly bent, raise the arms out to the sides until around shoulder height, pause briefly, then lower slowly.','lateralraise'),
  reversePecDeck: ex('reversePecDeck','Reverse Pec Deck',3,12,'Rear delts','Upper back',[
    'Keep your chest against the pad.',
    'Move through the shoulders instead of jerking the torso.',
    'Control the return phase.'
  ],'Sit facing the machine pad and grip the handles. With a small elbow bend, open the arms until they are roughly in line with the torso. Squeeze the rear shoulders, then return slowly.','reversefly'),
  cableCrunch: ex('cableCrunch','Cable Crunch',4,15,'Abs','Hip flexors',[
    'Curl your ribs toward your pelvis rather than just bending at the hips.',
    'Keep the rope beside your head, not pulling with your arms.',
    'Exhale as you crunch.'
  ],'Kneel facing the cable with the rope beside your temples. Keep your hips fairly still, curl your upper body down by contracting the abs, pause, then return under control.','crunch'),
  hangingKneeRaise: ex('hangingKneeRaise','Hanging Knee Raise',3,12,'Lower abs','Hip flexors, grip',[
    'Start each rep from a controlled hang.',
    'Tuck your pelvis as the knees rise.',
    'Avoid swinging.'
  ],'Hang from a pull-up bar with shoulders active. Bring the knees toward the chest while curling the pelvis upward, pause, then lower the legs slowly back to a still hang.','kneeraise'),

  squat: ex('squat','Back Squat',4,8,'Quads & glutes','Hamstrings, core',[
    'Brace your torso before each rep.',
    'Keep knees tracking in the same direction as your toes.',
    'Use the deepest range you can control with a neutral spine.'
  ],'Set the bar securely across the upper back, stand with feet around shoulder width, brace, sit down and between the hips, then drive the floor away to stand while keeping the torso controlled.','squat'),
  legPress: ex('legPress','Leg Press',4,10,'Quads & glutes','Hamstrings',[
    'Keep your lower back supported by the pad.',
    'Do not let the knees collapse inward.',
    'Avoid locking the knees hard at the top.'
  ],'Place your feet securely on the platform. Lower the sled until your knees reach a comfortable bend while your hips stay supported, then press through the feet to return.','legpress'),
  rdl: ex('rdl','Romanian Deadlift',4,10,'Hamstrings & glutes','Back, grip',[
    'Push your hips backward instead of squatting straight down.',
    'Keep the weight close to your legs.',
    'Stop when you feel a strong hamstring stretch and can still keep your back neutral.'
  ],'Stand with the bar or dumbbells at thigh level. Soften the knees, brace, push the hips back while the weight slides close to the legs, then squeeze the glutes to stand tall.','hinge'),
  legExtension: ex('legExtension','Leg Extension',3,12,'Quads','Hip flexors',[
    'Align your knee joint with the machine pivot.',
    'Lift smoothly instead of kicking the pad.',
    'Pause briefly near the top.'
  ],'Sit with your back supported and the pad above your ankles. Extend the knees until the legs are nearly straight, squeeze the quads, then lower under control.','legextension'),
  legCurl: ex('legCurl','Leg Curl',3,12,'Hamstrings','Calves',[
    'Keep hips pressed into the pad.',
    'Curl smoothly without lifting your torso.',
    'Control the return to the stretched position.'
  ],'Set the machine so the knee lines up with the pivot. Curl the pad toward your body by bending the knees, squeeze the hamstrings, then return slowly.','legcurl'),
  calfRaise: ex('calfRaise','Standing Calf Raise',4,15,'Calves','Foot stabilisers',[
    'Use a full controlled stretch at the bottom.',
    'Rise as high as you comfortably can onto the balls of your feet.',
    'Avoid bouncing.'
  ],'Stand with the balls of your feet supported and heels free to move. Lower the heels under control, press through the forefoot to rise high, pause, then lower slowly.','calfraise'),

  benchPress: ex('benchPress','Barbell Bench Press',4,8,'Chest','Triceps, front delts',[
    'Keep shoulder blades supported against the bench.',
    'Touch the bar around the lower-to-mid chest with control.',
    'Keep wrists stacked over the forearms.'
  ],'Lie on the bench with a stable foot position. Unrack the bar, lower it toward the chest while keeping the upper back tight, then press upward until the arms are nearly straight.','bench'),
  pullUp: ex('pullUp','Pull-Up',4,8,'Lats','Biceps, upper back',[
    'Start from an active shoulder position.',
    'Drive elbows down as you lift.',
    'Avoid kicking or swinging unless intentionally doing a different variation.'
  ],'Hang from the bar with hands slightly wider than shoulder width. Brace, pull the chest toward the bar by driving the elbows down, then lower under control to the starting position.','pullup'),
  deadlift: ex('deadlift','Deadlift',3,6,'Posterior chain','Back, quads, grip',[
    'Brace before the bar leaves the floor.',
    'Keep the bar close to the body.',
    'Stand tall by extending the hips, not by leaning backward.'
  ],'Stand with the bar over mid-foot. Hinge down, grip the bar, brace, push through the floor and extend hips and knees together. Lower by hinging first, then bending the knees as the bar passes them.','deadlift'),
  dbInclineCurl: ex('dbInclineCurl','Incline Dumbbell Curl',3,10,'Biceps','Forearms',[
    'Let the arms hang naturally behind the torso.',
    'Keep the shoulder still while the elbow bends.',
    'Use a slow lowering phase.'
  ],'Sit back on an incline bench with arms hanging straight down. Curl the dumbbells without moving the upper arms forward, squeeze the biceps, then lower slowly.','inclinecurl'),
  skullCrusher: ex('skullCrusher','EZ-Bar Skull Crusher',3,10,'Triceps','Forearms',[
    'Keep upper arms angled slightly back instead of flaring widely.',
    'Lower toward the forehead or just behind the head using a comfortable path.',
    'Do not let the elbows drift excessively.'
  ],'Lie on a bench holding an EZ-bar above the chest. Bend the elbows to lower the bar toward the forehead or slightly behind the head, then extend the elbows to return.','skullcrusher'),
  walkingLunge: ex('walkingLunge','Walking Lunge',3,12,'Quads & glutes','Hamstrings, core',[
    'Take a long enough step to stay balanced.',
    'Keep the front knee tracking over the foot.',
    'Push through the whole front foot to rise.'
  ],'Step forward and lower until both knees are comfortably bent. Drive through the front foot to stand and bring the rear leg forward into the next step.','lunge'),
  facePull: ex('facePull','Cable Face Pull',3,15,'Rear delts & upper back','External rotators',[
    'Pull toward eye or forehead level.',
    'Finish with hands apart and elbows high.',
    'Keep your ribs down.'
  ],'Set a rope attachment around face height. Pull the rope toward your face while spreading the hands and rotating the shoulders outward, then return slowly.','facepull')
};

const d = (name, subtitle, exerciseIds, cardio = null) => ({
  name,
  subtitle,
  type: 'workout',
  cardio,
  exercises: exerciseIds.map(id => exercises[id])
});
const restDay = (name='Rest', subtitle='Saturday') => ({ name, subtitle, type: 'rest', exercises: [] });
const cardioDay = (name, subtitle, cardio) => ({ name, subtitle, type: 'cardio', cardio, exercises: [] });
const cyclingDay = (name, subtitle) => ({ name, subtitle, type: 'cycling', cardio: { mode: 'Cycling', minutes: null, intensity: 'Steady / comfortable pace' }, exercises: [] });

export const plans = [
  {
    id: 'ali',
    name: 'Ali Plan',
    short: '4 strength days + cardio + cycling',
    description: 'A full Monday-to-Sunday routine with four lifting days, treadmill cardio on Tuesday and Thursday, light cardio Friday, recovery Saturday, and cycling Sunday.',
    tag: 'Balanced & Powerful',
    accent: 'ALI',
    official: true,
    days: [
      d('Back + Biceps','Monday',[ 'latPulldown','seatedCableRow','oneArmRow','barbellCurl','hammerCurl' ]),
      d('Chest + Triceps','Tuesday',[ 'inclineDbPress','machineChestPress','cableFly','ropePushdown','overheadTriceps' ], { mode: 'Treadmill', minutes: 30, intensity: 'Cardio after weights' }),
      d('Shoulders + Abs','Wednesday',[ 'seatedShoulderPress','lateralRaise','reversePecDeck','cableCrunch','hangingKneeRaise' ]),
      d('Legs','Thursday',[ 'squat','legPress','rdl','legExtension','legCurl','calfRaise' ], { mode: 'Treadmill', minutes: 25, intensity: 'Cardio after weights' }),
      cardioDay('Light Cardio','Friday', { mode: 'Treadmill / light cardio', minutes: null, intensity: 'Easy recovery pace' }),
      restDay('Rest','Saturday'),
      cyclingDay('Cycling','Sunday')
    ]
  },
  {
    id: 'arnold',
    name: 'Arnold-Inspired',
    short: 'Chest + back / shoulders + arms / legs',
    description: 'A high-volume classic bodybuilding split inspired by the famous Arnold double-split body-part structure.',
    tag: 'Classic Physique',
    accent: 'A',
    official: false,
    days: [
      d('Chest + Back','Day 1',[ 'benchPress','inclineDbPress','cableFly','pullUp','seatedCableRow' ]),
      d('Shoulders + Arms','Day 2',[ 'seatedShoulderPress','lateralRaise','barbellCurl','dbInclineCurl','skullCrusher' ]),
      d('Legs + Abs','Day 3',[ 'squat','rdl','walkingLunge','calfRaise','cableCrunch' ]),
      d('Chest + Back','Day 4',[ 'benchPress','inclineDbPress','pullUp','oneArmRow','facePull' ]),
      d('Shoulders + Arms','Day 5',[ 'seatedShoulderPress','reversePecDeck','barbellCurl','hammerCurl','ropePushdown' ]),
      d('Legs + Abs','Day 6',[ 'legPress','rdl','legExtension','legCurl','hangingKneeRaise' ]),
      restDay('Rest')
    ]
  },
  {
    id: 'ronnie',
    name: 'Ronnie-Inspired',
    short: 'Heavy compounds + bodybuilding volume',
    description: 'A mass-focused routine inspired by Ronnie Coleman’s famously heavy, high-effort training style. Not an official program.',
    tag: 'Mass & Strength',
    accent: 'R',
    official: false,
    days: [
      d('Back + Biceps','Day 1',[ 'deadlift','latPulldown','seatedCableRow','oneArmRow','barbellCurl' ]),
      d('Legs','Day 2',[ 'squat','legPress','rdl','legExtension','calfRaise' ]),
      d('Chest + Triceps','Day 3',[ 'benchPress','inclineDbPress','machineChestPress','ropePushdown','skullCrusher' ]),
      restDay('Rest'),
      d('Back + Shoulders','Day 5',[ 'pullUp','seatedCableRow','seatedShoulderPress','lateralRaise','facePull' ]),
      d('Legs + Arms','Day 6',[ 'legPress','walkingLunge','legCurl','barbellCurl','overheadTriceps' ]),
      restDay('Rest')
    ]
  },
  {
    id: 'chris',
    name: 'Chris-Inspired',
    short: 'Classic physique PPL structure',
    description: 'A modern push/pull/legs routine inspired by classic-physique style training. Not an official Chris Bumstead program.',
    tag: 'Lean & Athletic',
    accent: 'C',
    official: false,
    days: [
      d('Push','Day 1',[ 'inclineDbPress','machineChestPress','seatedShoulderPress','lateralRaise','ropePushdown' ]),
      d('Pull','Day 2',[ 'latPulldown','seatedCableRow','oneArmRow','facePull','barbellCurl' ]),
      d('Legs','Day 3',[ 'squat','legPress','rdl','legCurl','calfRaise' ]),
      restDay('Rest'),
      d('Upper','Day 5',[ 'inclineDbPress','pullUp','lateralRaise','seatedCableRow','hammerCurl','ropePushdown' ]),
      d('Lower + Abs','Day 6',[ 'legPress','rdl','walkingLunge','legExtension','cableCrunch' ]),
      restDay('Rest')
    ]
  }
];

export const planById = id => plans.find(p => p.id === id) || plans[0];
