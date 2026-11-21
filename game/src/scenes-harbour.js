// Level 2 — Harbour at Dusk. A lighthouse, two boats and a sky going purple.
// `mods` is the set of difference ids applied to this panel.

import { rr, circle, ellipse, line, sparkle, groundShadow } from './draw.js';

export function drawHarbour(ctx, mods) {
  const W = 620, H = 440;

  // Dusk sky.
  const sky = ctx.createLinearGradient(0, 0, 0, 300);
  sky.addColorStop(0, '#2b2d5c');
  sky.addColorStop(0.55, '#7b4b94');
  sky.addColorStop(1, '#e07a5f');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, 300);

  // Stars: one extra appears on the right panel.
  const stars = [[60, 40], [150, 70], [250, 35], [350, 60], [440, 30], [500, 90], [90, 120], [300, 110]];
  for (const [x, y] of stars) sparkle(ctx, x, y, 3.5, 'rgba(255,255,220,0.9)');
  if (mods.has('star')) sparkle(ctx, 460, 50, 4, 'rgba(255,255,220,1)');

  // Moon: full on the left, crescent on the right.
  ctx.fillStyle = '#f8f3c8';
  circle(ctx, 540, 70, 26);
  ctx.fill();
  if (mods.has('moon')) {
    ctx.fillStyle = '#7b4b94';
    circle(ctx, 550, 64, 22);
    ctx.fill();
  }

  // Gulls: three on the left, two on the right.
  ctx.strokeStyle = '#1d1d2e';
  ctx.lineWidth = 2.5;
  gull(ctx, 300, 80);
  gull(ctx, 350, 105);
  if (!mods.has('gull')) gull(ctx, 320, 90);

  // Sea.
  const sea = ctx.createLinearGradient(0, 290, 0, H);
  sea.addColorStop(0, '#3d5a80');
  sea.addColorStop(1, '#1d3557');
  ctx.fillStyle = sea;
  ctx.fillRect(0, 290, W, H - 290);
  ctx.strokeStyle = 'rgba(255,255,255,0.22)';
  ctx.lineWidth = 2;
  for (let y = 310; y < H; y += 22) {
    for (let x = ((y / 22) % 2) * 40; x < W; x += 80) {
      line(ctx, x, y, x + 34, y);
    }
  }
  // Moon reflection.
  ctx.fillStyle = 'rgba(248,243,200,0.35)';
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(528 - i * 6, 300 + i * 24, 24 + i * 12, 5);
  }

  // Lighthouse on the left headland.
  ctx.fillStyle = '#3d3a4a';
  ctx.fillRect(120, 190, 120, 110);
  ctx.fillStyle = '#f4f1de';
  ctx.beginPath();
  ctx.moveTo(155, 200);
  ctx.lineTo(185, 200);
  ctx.lineTo(178, 80);
  ctx.lineTo(162, 80);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#e63946';
  ctx.fillRect(160, 165, 20, 18);
  ctx.fillRect(163, 118, 14, 16);
  ctx.fillStyle = '#2b2d42';
  rr(ctx, 156, 62, 28, 20, 4);
  ctx.fill();
  ctx.fillStyle = '#ffe66d';
  circle(ctx, 170, 72, 6);
  ctx.fill();
  // The beam: shining on the left, dark on the right.
  if (!mods.has('beam')) {
    const beam = ctx.createLinearGradient(170, 72, 420, 110);
    beam.addColorStop(0, 'rgba(255,230,109,0.55)');
    beam.addColorStop(1, 'rgba(255,230,109,0)');
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(170, 66);
    ctx.lineTo(430, 96);
    ctx.lineTo(430, 128);
    ctx.lineTo(170, 80);
    ctx.closePath();
    ctx.fill();
  }

  // Two boats.
  boat(ctx, 330, 330, 1, mods.has('flag') ? '#2a9d8f' : '#e63946');
  boat(ctx, 470, 360, 0.8, '#e9c46a');

  // Dock on the right with a lantern and a rope coil.
  ctx.fillStyle = '#6b4f2a';
  ctx.fillRect(60, 340, 150, 16);
  ctx.fillStyle = '#5b3a1e';
  ctx.fillRect(70, 356, 10, 60);
  ctx.fillRect(190, 356, 10, 60);
  // Lantern on a post: lit on the left, out on the right.
  ctx.fillStyle = '#4a3220';
  ctx.fillRect(84, 300, 6, 42);
  ctx.fillStyle = '#2b2d42';
  rr(ctx, 76, 282, 22, 22, 4);
  ctx.fill();
  if (!mods.has('lantern')) {
    ctx.fillStyle = '#ffe66d';
    circle(ctx, 87, 293, 6);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,230,109,0.3)';
    circle(ctx, 87, 293, 16);
    ctx.fill();
  }
  // Rope coil: there on the left, gone on the right.
  if (!mods.has('rope')) {
    ctx.strokeStyle = '#d9a05b';
    ctx.lineWidth = 5;
    circle(ctx, 150, 380, 16); ctx.stroke();
    circle(ctx, 150, 380, 9); ctx.stroke();
  }

  groundShadow(ctx, 170, 306, 60, 0.2);
}

function gull(ctx, x, y) {
  ctx.beginPath();
  ctx.moveTo(x - 12, y);
  ctx.quadraticCurveTo(x - 5, y - 8, x, y);
  ctx.quadraticCurveTo(x + 5, y - 8, x + 12, y);
  ctx.stroke();
}

function boat(ctx, x, y, s, flagColor) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  // Hull.
  ctx.fillStyle = '#8d3b2f';
  ctx.beginPath();
  ctx.moveTo(-42, 0);
  ctx.lineTo(42, 0);
  ctx.lineTo(30, 22);
  ctx.lineTo(-30, 22);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#f4f1de';
  ctx.fillRect(-42, 0, 84, 5);
  // Mast and sail.
  ctx.strokeStyle = '#5b3a1e';
  ctx.lineWidth = 4;
  line(ctx, 0, 0, 0, -62);
  ctx.fillStyle = '#fff3e0';
  ctx.beginPath();
  ctx.moveTo(0, -60);
  ctx.lineTo(0, -8);
  ctx.lineTo(30, -8);
  ctx.closePath();
  ctx.fill();
  // Flag.
  ctx.fillStyle = flagColor;
  ctx.beginPath();
  ctx.moveTo(0, -62);
  ctx.lineTo(18, -57);
  ctx.lineTo(0, -52);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
