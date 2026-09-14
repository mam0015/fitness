# STRONGER v8 test notes

Tested at iPhone-style 390 × 844 viewport.

- Home screen renders with reference-inspired neon-lime visual style.
- No horizontal overflow at tested viewport.
- Arnold Inspired defaults to 90 min.
- Arnold Chest + Back at 120 min generates 10 exercises.
- Arnold Chest + Back at 60 min generates 6 exercises.
- Arnold 90 min plan uses the repeated 6-day classic split structure.
- Ali Tuesday at 60 min generates 4 strength exercises + 30 min treadmill inside the total time target.
- Exercise detail screen opens correctly.
- Live workout opens correctly.
- Complete Set opens 90-second rest timer.
- +15 sec changes 01:30 to 01:45.
- Progress starts at 0 sessions / 0 minutes / 0 sets / 0 active days when no sessions exist.
- Progress is populated from completed session history stored in localStorage.
- JavaScript syntax checks pass for app.js and data.js.

- Theme regression check: v8 neon-lime accents replaced with STRONGER orange while preserving the adaptive workout logic and layout.
