# Wavelength game

## GitHub Pages deployment (2026-11-20)

- [x] Inspect the static site and current Git/GitHub setup.
- [x] Start a local preview and verify an HTTP response.
- [x] Create an isolated Git repository for this site and a Pages publishing workflow.
- [x] Authenticate GitHub, create the remote repository, and push the site.
- [x] Enable Pages, verify the public URL, and record the result below.

### Review

The local preview at `http://localhost:8765` returned HTTP 200. `node --check dist/script.js` passed. GitHub Pages workflow run 44800687962 succeeded, and `https://tarundevi.github.io/wavelength/` returned HTTP 200 over HTTPS. The first run failed because Pages was not yet enabled; enabling Pages and rerunning the workflow resolved it.

- [x] Settle scope: solo pass-and-play, lightweight static HTML.
- [x] Build responsive dial and round flow.
- [x] Verify clue, guess, reveal, scoring, and replay in Safari.
- [x] Open the game on localhost; hosting canceled at user request.
- [x] Separate spectrum labels from the dial edge.
- [x] Allow editable category endpoints and verify script syntax.
- [x] Tighten scoring around the center of the visible target band and verify the thresholds.

## Review

Safari on `http://localhost:8765` showed the clue screen. Entered a clue, passed to guesser, moved the slider, revealed a 2-point score, then advanced to round 2 with the total retained. No deployment was created.

After the layout correction, Safari showed the labels fully below the dial. Preset and editable left/right category controls appeared on the clue screen. `node --check dist/script.js` passed.

Scoring now awards 4/3/2/1 points within 1/3/5/8 slider steps of the center and 0 beyond the visible target. The target band is centered symmetrically on that point. Syntax and threshold checks passed.
