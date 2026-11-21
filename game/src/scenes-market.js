// Level 1 — Morning Market. A sleepy street stall under a striped awning.
// `mods` is the set of difference ids applied to this panel (empty on the
// left panel, all of them on the right one).

import { rr, circle, ellipse, line, sparkle, groundShadow } from './draw.js';

export function drawMarket(ctx, mods) {
  const W = 620, H = 440;

  // Sky.
  const sky = ctx.createLinearGradient(0, 0, 0, 300);
  sky.addColorStop(0, '#ffe9b8');
  sky.addColorStop(0.6, '#ffd98f');
  sky.addColorStop(1, '#ffc978');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Clouds.
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  cloud(ctx, 200, 55, 1);
  cloud(ctx, 430, 40, 0.7);
  cloud(ctx, 520, 130, 0.55);

  // Sun: smiling on the left panel, plain on the right.
  ctx.fillStyle = '#ffb703';
  circle(ctx, 78, 72, 34);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,183,3,0.35)';
  circle(ctx, 78, 72, 44);
  ctx.fill();
  if (!mods.has('sun-face')) {
    ctx.fillStyle = '#7a4a00';
    circle(ctx, 68, 66, 3); ctx.fill();
    circle(ctx, 88, 66, 3); ctx.fill();
    ctx.strokeStyle = '#7a4a00';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(78, 74, 12, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();
  }

  // Distant rooftops.
  ctx.fillStyle = '#e07856';
  ctx.fillRect(0, 250, 620, 30);
  ctx.fillStyle = '#c65f43';
  ctx.fillRect(40, 228, 90, 26);
  ctx.fillRect(470, 232, 110, 24);
  ctx.fillStyle = '#8d4a2f';
  ctx.fillRect(60, 240, 14, 14);
  ctx.fillRect(500, 242, 14, 12);

  // Cobblestones.
  ctx.fillStyle = '#d9b48a';
  ctx.fillRect(0, 280, W, H - 280);
  ctx.strokeStyle = 'rgba(120,80,40,0.25)';
  ctx.lineWidth = 2;
  for (let y = 296; y < H; y += 26) {
    line(ctx, 0, y, W, y);
    for (let x = (y % 52 === 0 ? 0 : 26); x < W; x += 52) {
      line(ctx, x, y, x, y + 26);
    }
  }

  // Bunting flags across the top.
  const flagColors = ['#e63946', '#f4a261', '#2a9d8f', '#e9c46a', '#457b9d'];
  ctx.strokeStyle = '#5b3a1e';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 18);
  ctx.quadraticCurveTo(310, 64, 620, 18);
  ctx.stroke();
  for (let i = 0; i < 11; i++) {
    const t = i / 10;
    const x = t * 620;
    const y = 18 + Math.sin(t * Math.PI) * 22 + 14;
    ctx.fillStyle = flagColors[i % flagColors.length];
    ctx.beginPath();
    ctx.moveTo(x - 11, y);
    ctx.lineTo(x + 11, y);
    ctx.lineTo(x, y + 22);
    ctx.closePath();
    ctx.fill();
  }

  // Stall: posts, counter, awning.
  ctx.fillStyle = '#7a4a21';
  ctx.fillRect(120, 150, 12, 190);
  ctx.fillRect(488, 150, 12, 190);
  // Awning: striped canopy; one stripe changes colour on the right panel.
  for (let i = 0; i < 8; i++) {
    const x = 110 + i * 50;
    let c = i % 2 === 0 ? '#e63946' : '#fff3e0';
    if (mods.has('awning-stripe') && i === 4) c = '#457b9d';
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.moveTo(x, 120);
    ctx.lineTo(x + 50, 120);
    ctx.lineTo(x + 44, 152);
    ctx.lineTo(x + 6, 152);
    ctx.closePath();
    ctx.fill();
  }
  ctx.fillStyle = '#5b3a1e';
  ctx.fillRect(108, 148, 404, 8);

  // Counter and crates.
  ctx.fillStyle = '#a4713a';
  rr(ctx, 130, 300, 360, 40, 6);
  ctx.fill();
  ctx.fillStyle = '#8a5a2b';
  ctx.fillRect(130, 300, 360, 8);
  // Crates of fruit on the counter.
  fruitCrate(ctx, 165, 268, '#e63946', mods.has('apples') ? 4 : 5);
  fruitCrate(ctx, 265, 268, '#f4a261', 4);
  fruitCrate(ctx, 365, 268, '#90be6d', 5);
  // Bread basket.
  ctx.fillStyle = '#c98f4e';
  rr(ctx, 445, 272, 46, 30, 8);
  ctx.fill();
  ctx.fillStyle = '#f3d9a4';
  ellipse(ctx, 452, 272, 12, 7); ctx.fill();
  ellipse(ctx, 468, 270, 12, 7); ctx.fill();
  ellipse(ctx, 482, 273, 10, 6); ctx.fill();

  // Hanging lantern.
  ctx.strokeStyle = '#5b3a1e';
  ctx.lineWidth = 2;
  line(ctx, 310, 156, 310, 176);
  ctx.fillStyle = '#f4a261';
  rr(ctx, 298, 176, 24, 30, 6);
  ctx.fill();
  ctx.fillStyle = '#ffe66d';
  circle(ctx, 310, 191, 7);
  ctx.fill();

  // The stall cat: present on the left, wandered off on the right.
  if (!mods.has('cat')) {
    groundShadow(ctx, 505, 348, 34, 0.15);
    ctx.fillStyle = '#e07a5f';
    ellipse(ctx, 505, 330, 26, 18); ctx.fill(); // body
    circle(ctx, 528, 312, 13); ctx.fill(); // head
    ctx.beginPath();
    ctx.moveTo(520, 302); ctx.lineTo(524, 288); ctx.lineTo(530, 300);
    ctx.moveTo(534, 300); ctx.lineTo(540, 288); ctx.lineTo(542, 302);
    ctx.closePath(); ctx.fill(); // ears
    ctx.strokeStyle = '#e07a5f';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(482, 336);
    ctx.quadraticCurveTo(462, 330, 466, 310);
    ctx.stroke(); // tail
    ctx.fillStyle = '#3d2b1f';
    circle(ctx, 532, 309, 2); ctx.fill();
    ctx.strokeStyle = '#3d2b1f';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(536, 316, 4, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }

  // Bicycle leaning on the right post.
  ctx.strokeStyle = '#2b2d42';
  ctx.lineWidth = 4;
  circle(ctx, 548, 372, 26); ctx.stroke();
  circle(ctx, 600, 372, 26); ctx.stroke();
  line(ctx, 548, 372, 574, 330);
  line(ctx, 600, 372, 574, 330);
  line(ctx, 574, 330, 560, 330);
  line(ctx, 574, 330, 596, 356);
  ctx.strokeStyle = '#8d99ae';
  ctx.lineWidth = 3;
  line(ctx, 556, 326, 592, 326);
  ctx.fillStyle = '#2b2d42';
  rr(ctx, 552, 322, 14, 6, 3); ctx.fill(); // saddle
  // The bell: there on the left, gone on the right.
  if (!mods.has('bell')) {
    ctx.fillStyle = '#ffd60a';
    circle(ctx, 565, 295, 7);
    ctx.fill();
    ctx.fillStyle = '#8d99ae';
    circle(ctx, 565, 295, 2.5);
    ctx.fill();
  }

  // A few sparkles of morning light.
  sparkle(ctx, 250, 200, 5, 'rgba(255,255,255,0.9)');
  sparkle(ctx, 420, 230, 4, 'rgba(255,255,255,0.9)');
}

function cloud(ctx, x, y, s) {
  ctx.beginPath();
  ctx.ellipse(x, y, 42 * s, 16 * s, 0, 0, Math.PI * 2);
  ctx.ellipse(x + 26 * s, y + 4 * s, 30 * s, 13 * s, 0, 0, Math.PI * 2);
  ctx.ellipse(x - 28 * s, y + 5 * s, 26 * s, 12 * s, 0, 0, Math.PI * 2);
  ctx.fill();
}

function fruitCrate(ctx, x, y, color, count) {
  ctx.fillStyle = '#7a4a21';
  rr(ctx, x, y, 62, 32, 4);
  ctx.fill();
  ctx.fillStyle = color;
  const spots = [[12, 8], [30, 5], [46, 9], [20, 16], [38, 15]];
  for (let i = 0; i < count; i++) {
    const [dx, dy] = spots[i];
    circle(ctx, x + dx, y + dy, 8);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    circle(ctx, x + dx - 2, y + dy - 3, 2.5);
    ctx.fill();
    ctx.fillStyle = color;
  }
}
