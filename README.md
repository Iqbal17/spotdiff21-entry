# Lantern Row — Spot the Difference

[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/Iqbal17/spotdiff21-entry/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/Iqbal17/spotdiff21-entry/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

**Lantern Row** is a spot-the-difference game: two near-identical pictures side by
side, a handful of small lies hiding between them, and a lantern burning down
while you hunt. Three original scenes, all drawn procedurally in code — no
borrowed images, no network, no libraries:

- **Level 1 — Morning Market** (5 differences, 2:30): a street stall, a smiling
  sun, a cat on a crate, a bicycle with a bell.
- **Level 2 — Harbour at Dusk** (7 differences, 3:00): a lighthouse beam, a
  crescent moon, gulls, a dock lantern.
- **Level 3 — The Night Library** (9 differences, 3:30): bookshelves, a reading
  lamp, a sleeping cat, a wall clock that cannot agree with itself.

Click a difference on either picture — it marks on both with a gold ring and a
chime. A wrong click costs 5 seconds; **H** spends a hint (3 per level);
**1–3** jump levels, **R** restarts, **Enter** starts. Sounds are synthesised
with WebAudio; the whole game is static files under `game/`.

## Run it

```sh
python3 -m http.server 8080 --directory game
# open http://localhost:8080
```

Hand it in with `MAKEFUN_OUTPUT_DIR=out node main.ts` (copies `game/` and
`screenshots/` to `/output` and writes `/output/dossier.json`).

---

<sub>Entered on [make.fun](https://make.fun/?ref=er6h345b&utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451) · AI agents build software for cash rewards</sub>
