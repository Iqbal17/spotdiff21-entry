// Lantern Row — bootstrap: wires the canvases, HUD, overlays, keyboard and
// mouse to the Game, and drives the countdown.

import { LEVELS, PANEL } from './config.js';
import { Game } from './game.js';
import { applyShot } from './shots.js';

const $ = (id) => document.getElementById(id);

const game = new Game(
  { left: $('panel-left'), right: $('panel-right') },
  {},
);

const hud = {
  levelName: $('level-name'),
  counter: $('counter'),
  timerText: $('timer-text'),
  timerFill: $('timer-fill'),
  score: $('score'),
  hints: $('hint-count'),
  hintBtn: $('hint-btn'),
  levelDots: $('level-dots'),
  message: $('message'),
};

function fmtTime(s) {
  const m = Math.floor(Math.max(0, s) / 60);
  const r = Math.floor(Math.max(0, s) % 60);
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
}

function refreshHud() {
  const level = game.level;
  hud.levelName.textContent = `Level ${game.levelIndex + 1} · ${level.name}`;
  hud.counter.textContent = `Found ${game.found.size} / ${game.diffs.length} · ${game.remaining} left`;
  hud.timerText.textContent = fmtTime(game.timeLeft);
  hud.timerFill.style.width = `${(game.timeLeft / level.timeLimit) * 100}%`;
  hud.timerFill.classList.toggle('low', game.timeLeft <= 15);
  hud.score.textContent = `Score ${game.score}`;
  hud.hints.textContent = `Hints ${game.hintsLeft}`;
  hud.hintBtn.disabled = game.screen !== 'playing' || game.hintsLeft <= 0;
  hud.levelDots.innerHTML = LEVELS.map(
    (l, i) => `<span class="dot${i === game.levelIndex ? ' current' : ''}${i < game.levelIndex ? ' done' : ''}">${i + 1}</span>`,
  ).join('');
  hud.message.textContent =
    game.screen === 'playing'
      ? 'Click a difference on either picture — it counts on both.'
      : game.screen === 'levelDone'
        ? `Level clear! Time bonus banked.`
        : game.screen === 'timeUp'
          ? 'Out of time — the differences keep their secrets. Try again?'
          : '';
}

function showOverlay(which) {
  for (const id of ['overlay-title', 'overlay-level', 'overlay-end', 'overlay-time']) {
    $(id).classList.add('hidden');
  }
  if (which) $(which).classList.remove('hidden');
}

function syncScreen() {
  refreshHud();
  if (game.screen === 'title') showOverlay('overlay-title');
  else if (game.screen === 'levelDone') {
    $('level-stats').textContent =
      `All ${game.diffs.length} differences found · ${game.misses} miss${game.misses === 1 ? '' : 'es'} · Score ${game.score}`;
    $('level-next').textContent =
      game.levelIndex + 1 < LEVELS.length ? 'Next level →' : 'See my score →';
    showOverlay('overlay-level');
  } else if (game.screen === 'gameDone') {
    $('end-score').textContent = `Final score: ${game.score}`;
    $('end-found').textContent = `Differences found: ${game.totalFound} · Misses: ${game.misses}`;
    showOverlay('overlay-end');
  } else if (game.screen === 'timeUp') {
    showOverlay('overlay-time');
  } else {
    showOverlay(null);
  }
}

game.onChange = syncScreen;

// Clicks on either panel, converted to scene coordinates.
for (const canvas of [game.left, game.right]) {
  canvas.addEventListener('click', (ev) => {
    const rect = canvas.getBoundingClientRect();
    const x = ((ev.clientX - rect.left) / rect.width) * PANEL.width;
    const y = ((ev.clientY - rect.top) / rect.height) * PANEL.height;
    game.click(x, y);
  });
}

$('hint-btn').addEventListener('click', () => game.useHint());
$('start-btn').addEventListener('click', () => game.startGame());
$('level-next').addEventListener('click', () => game.nextLevel());
$('again-btn').addEventListener('click', () => game.startGame());
$('retry-btn').addEventListener('click', () => game.startLevel(game.levelIndex));
$('how-btn').addEventListener('click', () => {
  $('howto').classList.toggle('hidden');
});

document.addEventListener('keydown', (ev) => {
  if (ev.key === 'h' || ev.key === 'H') game.useHint();
  else if (ev.key === 'Enter' && game.screen === 'title') game.startGame();
  else if (ev.key === 'Enter' && game.screen === 'levelDone') game.nextLevel();
  else if ((ev.key === 'r' || ev.key === 'R') && game.screen !== 'title') game.startLevel(game.levelIndex);
  else if (ev.key >= '1' && ev.key <= '3' && game.screen === 'title') {
    game.startGame();
    game.startLevel(Number(ev.key) - 1);
  }
});

function loop(now) {
  game.tick(now);
  requestAnimationFrame(loop);
}

// Boot: title screen, unless a screenshot preset was requested.
game.screen = 'title';
game.levelIndex = 0;
game.timeLeft = game.level.timeLimit;
game.hintsLeft = game.level.hints;
game.draw();
const shot = applyShot(game, new URLSearchParams(location.search));
syncScreen();
if (!shot) requestAnimationFrame(loop);
else requestAnimationFrame(() => {}); // frozen frame for the screenshot
