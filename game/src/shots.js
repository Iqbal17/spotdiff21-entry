// Screenshot presets, driven by the page query (?shot=start|play|harbour|
// complete). The maker uses these to take the entry's screenshots; they put
// the game in a fixed, readable state with the timer frozen.

export function applyShot(game, params) {
  const shot = params.get('shot');
  if (!shot) return false;
  game.paused = true;
  if (shot === 'start') {
    game.screen = 'title';
    game.levelIndex = 0;
    game.found = new Set();
    game.score = 0;
    game.timeLeft = game.level.timeLimit;
    game.hintsLeft = game.level.hints;
    game.draw();
    return true;
  }
  if (shot === 'play') {
    game.startLevel(0);
    game.paused = true;
    // Three of five found: markers on, two still unfound, counter visible.
    for (const id of ['sun-face', 'apples', 'bell']) game.found.add(id);
    game.score = 300;
    game.timeLeft = 135;
    game.draw();
    return true;
  }
  if (shot === 'harbour') {
    game.startLevel(1);
    game.paused = true;
    for (const id of ['moon', 'gull']) game.found.add(id);
    game.score = 820;
    game.timeLeft = 160;
    game.draw();
    return true;
  }
  if (shot === 'complete') {
    game.startLevel(0);
    game.paused = true;
    for (const d of game.diffs) game.found.add(d.id);
    game.score = 575;
    game.timeLeft = 122;
    game.screen = 'levelDone';
    game.draw();
    return true;
  }
  return false;
}
