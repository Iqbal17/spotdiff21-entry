// Game state and rules for Lantern Row: three levels, a countdown, hints,
// a score, and the find/miss feedback. The two panels are drawn from the
// same scene painter — the left panel with no differences applied, the right
// panel with all of them — and a click on either panel counts.

import { LEVELS, PANEL, SCORE, HINT_PULSE_MS, FIND_RING_MS } from './config.js';
import { DIFFERENCES } from './differences.js';
import { drawMarket } from './scenes-market.js';
import { drawHarbour } from './scenes-harbour.js';
import { drawLibrary } from './scenes-library.js';
import { sfx } from './audio.js';

const PAINTERS = { market: drawMarket, harbour: drawHarbour, library: drawLibrary };

export class Game {
  constructor(canvases, hud) {
    this.left = canvases.left;
    this.right = canvases.right;
    this.hud = hud;
    this.lctx = this.left.getContext('2d');
    this.rctx = this.right.getContext('2d');
    this.left.width = PANEL.width;
    this.left.height = PANEL.height;
    this.right.width = PANEL.width;
    this.right.height = PANEL.height;

    this.screen = 'title'; // title | playing | levelDone | gameDone | timeUp
    this.levelIndex = 0;
    this.found = new Set();
    this.score = 0;
    this.totalFound = 0;
    this.timeLeft = 0;
    this.hintsLeft = 0;
    this.misses = 0;
    this.hintPulse = null; // { diff, until }
    this.findRings = []; // { diff, until }
    this.shakeUntil = 0;
    this.paused = false; // shot presets freeze the timer
    this.lastTick = 0;
    this.lowTickedAt = -1;
    this.onChange = () => {};
  }

  get level() {
    return LEVELS[this.levelIndex];
  }

  get diffs() {
    return DIFFERENCES[this.level.id];
  }

  get remaining() {
    return this.diffs.length - this.found.size;
  }

  startLevel(index) {
    this.levelIndex = index;
    this.found = new Set();
    this.timeLeft = this.level.timeLimit;
    this.hintsLeft = this.level.hints;
    this.hintPulse = null;
    this.findRings = [];
    this.screen = 'playing';
    this.lastTick = performance.now();
    this.lowTickedAt = -1;
    this.draw();
    this.onChange();
  }

  startGame() {
    this.score = 0;
    this.totalFound = 0;
    this.misses = 0;
    this.startLevel(0);
  }

  // Click on either panel, in scene coordinates.
  click(x, y) {
    if (this.screen !== 'playing' || this.paused) return;
    const now = performance.now();
    for (const d of this.diffs) {
      if (this.found.has(d.id)) continue;
      const dx = x - d.x;
      const dy = y - d.y;
      if (dx * dx + dy * dy <= (d.r + 12) * (d.r + 12)) {
        this.found.add(d.id);
        this.totalFound++;
        this.score += SCORE.perFind;
        this.findRings.push({ diff: d, until: now + FIND_RING_MS });
        sfx.find();
        if (this.remaining === 0) this.completeLevel();
        this.draw();
        this.onChange();
        return;
      }
    }
    // Miss: five seconds off the clock and a shake.
    this.misses++;
    this.timeLeft = Math.max(0, this.timeLeft - SCORE.missPenaltySeconds);
    this.shakeUntil = now + 220;
    sfx.miss();
    this.draw();
    this.onChange();
  }

  useHint() {
    if (this.screen !== 'playing' || this.paused) return;
    if (this.hintsLeft <= 0) return;
    const unfound = this.diffs.filter((d) => !this.found.has(d.id));
    if (unfound.length === 0) return;
    this.hintsLeft--;
    this.score = Math.max(0, this.score - SCORE.hintCost);
    const pick = unfound[Math.floor(Math.random() * unfound.length)];
    this.hintPulse = { diff: pick, until: performance.now() + HINT_PULSE_MS };
    sfx.hint();
    this.draw();
    this.onChange();
  }

  completeLevel() {
    const bonus = Math.round(this.timeLeft) * SCORE.levelBonusPerSecond;
    this.score += bonus;
    this.screen = 'levelDone';
    sfx.win();
    this.onChange();
  }

  nextLevel() {
    if (this.levelIndex + 1 < LEVELS.length) {
      this.startLevel(this.levelIndex + 1);
    } else {
      this.screen = 'gameDone';
      this.onChange();
    }
  }

  tick(now) {
    if (this.screen !== 'playing' || this.paused) return;
    const dt = (now - this.lastTick) / 1000;
    this.lastTick = now;
    this.timeLeft -= dt;
    if (this.timeLeft <= 10 && Math.ceil(this.timeLeft) !== this.lowTickedAt) {
      this.lowTickedAt = Math.ceil(this.timeLeft);
      if (this.timeLeft > 0) sfx.tick();
    }
    if (this.timeLeft <= 0) {
      this.timeLeft = 0;
      this.screen = 'timeUp';
      sfx.lose();
      this.onChange();
    }
    this.draw();
    this.onChange();
  }

  draw() {
    const all = new Set(this.diffs.map((d) => d.id));
    const now = performance.now();
    const shake = now < this.shakeUntil ? (Math.random() - 0.5) * 8 : 0;
    for (const [ctx, mods] of [
      [this.lctx, new Set()],
      [this.rctx, all],
    ]) {
      ctx.save();
      ctx.clearRect(0, 0, PANEL.width, PANEL.height);
      ctx.translate(shake, 0);
      PAINTERS[this.level.id](ctx, mods);
      // Rings on every difference already found, on both panels.
      for (const id of this.found) {
        const d = this.diffs.find((x) => x.id === id);
        this.drawRing(ctx, d, '#ffd60a', 1);
      }
      // A fresh find blooms briefly.
      this.findRings = this.findRings.filter((r) => now < r.until);
      for (const r of this.findRings) {
        const p = 1 - (r.until - now) / FIND_RING_MS;
        this.drawRing(ctx, r.diff, `rgba(255,214,10,${1 - p})`, 1 + p * 1.6);
      }
      // A hint pulses a dashed ring around one unfound difference.
      if (this.hintPulse && now < this.hintPulse.until) {
        const p = (Math.sin(now / 160) + 1) / 2;
        this.drawRing(ctx, this.hintPulse.diff, `rgba(69,123,157,${0.5 + p * 0.5})`, 1, true);
      }
      ctx.restore();
    }
  }

  drawRing(ctx, d, color, scale = 1, dashed = false) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    if (dashed) ctx.setLineDash([10, 8]);
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r * scale + 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}
