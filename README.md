# STRONGER v7

Premium iPhone-first fitness app prototype with improved UI/UX, richer workout visuals, a polished orange/black theme, real component-based screens, and the user's updated Ali weekly plan.

## Features
- Home screen with today's workout
- Athlete plans screen
- Ali weekly plan (Mon-Sun)
- Workout day screens with exercise-specific photos
- Exercise detail screens with muscles, how-to, and tips
- Live workout screen
- 90-second rest timer with +15 / pause / skip
- Treadmill cardio and cycling screens
- Workout complete screen
- Progress screen
- PWA-ready static site for GitHub Pages

## GitHub Pages
Upload the contents of this folder to the root of your repo, then enable:

Settings -> Pages -> Deploy from a branch -> main -> /root

No build step is needed.


## Update in v6
- The Choose Your Plan cards now use real photos for Arnold, Ronnie, and Chris via Wikimedia Commons hosted images, with local fallbacks if loading fails.


## v7 Progress update
- Removed the unnecessary "Muscle build / Phone only / 90 sec rest" chips from the plan screen.
- Progress metrics are now calculated only from the user's locally logged completed sessions.
- Weekly activity chart uses actual logged training minutes from the last seven calendar days.
- Recent activity is generated from the user's real workout/cardio history.
- Removed fake percentage-growth and estimated-calorie numbers.
- Cardio duration is saved from actual elapsed time instead of the planned duration.
