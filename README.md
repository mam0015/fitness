# STRONGER v8

Mobile-first fitness app prototype redesigned around a premium black + neon-lime visual system inspired by the supplied reference screenshot, while keeping STRONGER branding.

## What changed in v8
- Whole app redesigned with image-first cards, black/charcoal surfaces, neon lime accents, rounded controls and compact iPhone-first navigation.
- Workout length selector added: **45 / 60 / 70 / 90 / 120 minutes**.
- Workout length changes actual workout volume, not just a label:
  - shorter sessions use fewer exercises and slightly lower volume
  - longer sessions add exercises
  - 120-minute sessions also increase selected set counts
- Ali cardio days include planned cardio inside the selected total session target.
- Arnold Inspired expanded into a 6-day repeated split:
  - Chest + Back A
  - Shoulders + Arms A
  - Legs + Abs A
  - Chest + Back B
  - Shoulders + Arms B
  - Legs + Abs B
  - Rest
- Arnold 60-minute Chest + Back = 6 exercises.
- Arnold 90-minute Chest + Back = 8 exercises.
- Arnold 120-minute Chest + Back = 10 exercises with higher volume.
- Real athlete photos remain configured on plan cards via Wikimedia Commons URLs with local fallbacks.
- Exercise-specific images load from free-exercise-db with local fallbacks.
- Progress is based only on completed user sessions stored locally in the browser.

## Ali Plan
- Monday: Back + Biceps
- Tuesday: Chest + Triceps + 30 min Treadmill
- Wednesday: Shoulders + Abs
- Thursday: Legs + 25 min Treadmill
- Friday: Light Cardio
- Saturday: Rest Day
- Sunday: Cycling

## GitHub Pages
Upload the contents of this folder to the root of your GitHub repo, then enable:

**Settings -> Pages -> Deploy from a branch -> main -> /root**

No build step is required.


## v9 correction
- Restored the original STRONGER Orange + Black identity.
- Kept the new v8 layout, card structure, adaptive workout length selector, and higher-volume program logic.
- Removed the neon-lime visual direction from the UI.
