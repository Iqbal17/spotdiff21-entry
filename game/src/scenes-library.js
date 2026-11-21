// Level 3 — The Night Library. Shelves of books, a reading lamp, a cat asleep
// on the rug. Nine small lies hide among the books.
// `mods` is the set of difference ids applied to this panel.

import { rr, circle, ellipse, line, sparkle, groundShadow } from './draw.js';

export function drawLibrary(ctx, mods) {
  const W = 620, H = 440;

  // Walls and floor.
  ctx.fillStyle = '#3e2f23';
  ctx.fillRect(0, 0, W, 330);
  ctx.fillStyle = '#5b4632';
  ctx.fillRect(0, 330, W, H - 330);
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(0, 326, W, 6);

  // Window with night sky: one star leaves on the right panel.
  ctx.fillStyle = '#1d3557';
  rr(ctx, 56, 56, 120, 130, 8);
  ctx.fill();
  ctx.strokeStyle = '#8a5a2b';
  ctx.lineWidth = 6;
  rr(ctx, 56, 56, 120, 130, 8);
  ctx.stroke();
  line(ctx, 116, 56, 116, 186);
  line(ctx, 56, 121, 176, 121);
  ctx.fillStyle = '#f8f3c8';
  circle(ctx, 148, 84, 16);
  ctx.fill();
  const winStars = [[72, 76], [160, 66], [86, 150], [150, 158], [100, 104]];
  for (const [x, y] of winStars) {
    if (mods.has('window-star') && x === 86 && y === 150) continue;
    sparkle(ctx, x, y, 3, 'rgba(255,255,220,0.95)');
  }

  // Framed picture: mountains on the left, a sun on the right.
  ctx.fillStyle = '#8a5a2b';
  rr(ctx, 186, 86, 70, 56, 4);
  ctx.fill();
  ctx.fillStyle = '#a8dadc';
  ctx.fillRect(192, 92, 58, 44);
  if (!mods.has('picture')) {
    ctx.fillStyle = '#457b9d';
    ctx.beginPath();
    ctx.moveTo(192, 136); ctx.lineTo(214, 104); ctx.lineTo(232, 136);
    ctx.moveTo(220, 136); ctx.lineTo(240, 110); ctx.lineTo(250, 136);
    ctx.closePath(); ctx.fill();
  } else {
    ctx.fillStyle = '#ffb703';
    circle(ctx, 221, 114, 12);
    ctx.fill();
    ctx.fillStyle = '#e07a5f';
    ctx.fillRect(192, 128, 58, 8);
  }

  // Wall clock: 3 o'clock on the left, 4:30 on the right.
  ctx.fillStyle = '#f4f1de';
  circle(ctx, 520, 80, 26);
  ctx.fill();
  ctx.strokeStyle = '#2b2d42';
  ctx.lineWidth = 3;
  circle(ctx, 520, 80, 26);
  ctx.stroke();
  ctx.lineWidth = 2.5;
  const hourAngle = mods.has('clock') ? 2.2 : 0;
  const minAngle = mods.has('clock') ? Math.PI : -Math.PI / 2;
  line(ctx, 520, 80, 520 + Math.sin(hourAngle) * 12, 80 - Math.cos(hourAngle) * 12);
  line(ctx, 520, 80, 520 + Math.sin(minAngle) * 18, 80 - Math.cos(minAngle) * 18);
  ctx.fillStyle = '#2b2d42';
  circle(ctx, 520, 80, 2.5);
  ctx.fill();

  // Bookshelves: three rows of coloured spines.
  shelf(ctx, 40, 200, 540, 3, mods);

  // Reading table with the lamp.
  ctx.fillStyle = '#6b4f2a';
  rr(ctx, 300, 300, 150, 14, 4);
  ctx.fill();
  ctx.fillRect(312, 314, 10, 60);
  ctx.fillRect(428, 314, 10, 60);
  // Lamp: warm glow on the left, dark on the right.
  ctx.strokeStyle = '#2b2d42';
  ctx.lineWidth = 4;
  line(ctx, 350, 300, 350, 262);
  ctx.fillStyle = '#e63946';
  ctx.beginPath();
  ctx.moveTo(330, 262);
  ctx.lineTo(370, 262);
  ctx.lineTo(362, 238);
  ctx.lineTo(338, 238);
  ctx.closePath();
  ctx.fill();
  if (!mods.has('lamp-glow')) {
    ctx.fillStyle = 'rgba(255,230,109,0.28)';
    circle(ctx, 350, 220, 52);
    ctx.fill();
    ctx.fillStyle = '#ffe66d';
    circle(ctx, 350, 250, 8);
    ctx.fill();
  }

  // Teapot on the table: there on the left, gone on the right.
  if (!mods.has('teapot')) {
    ctx.fillStyle = '#457b9d';
    ellipse(ctx, 420, 306, 18, 13);
    ctx.fill();
    ctx.fillStyle = '#457b9d';
    ctx.beginPath();
    ctx.moveTo(420, 294); ctx.lineTo(436, 300); ctx.lineTo(420, 306);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#457b9d';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(404, 302, 8, Math.PI * 0.6, Math.PI * 1.5);
    ctx.stroke();
    ctx.fillStyle = '#2a9d8f';
    circle(ctx, 420, 292, 4);
    ctx.fill();
  }

  // Rug: one stripe changes colour on the right panel.
  ctx.fillStyle = '#9b2226';
  rr(ctx, 220, 378, 200, 44, 8);
  ctx.fill();
  ctx.fillStyle = mods.has('rug-stripe') ? '#2a9d8f' : '#e9c46a';
  ctx.fillRect(240, 386, 160, 8);
  ctx.fillStyle = '#e9c46a';
  ctx.fillRect(240, 406, 160, 8);

  // The sleeping cat on the rug: tail up on the left, curled on the right.
  groundShadow(ctx, 150, 372, 40, 0.15);
  ctx.fillStyle = '#4a4e69';
  ellipse(ctx, 150, 356, 34, 16);
  ctx.fill();
  circle(ctx, 178, 348, 12);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(172, 338); ctx.lineTo(175, 326); ctx.lineTo(180, 336);
  ctx.moveTo(182, 336); ctx.lineTo(187, 326); ctx.lineTo(190, 338);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#4a4e69';
  ctx.lineWidth = 5;
  ctx.beginPath();
  if (!mods.has('cat-tail')) {
    ctx.moveTo(118, 356);
    ctx.quadraticCurveTo(100, 348, 104, 330);
  } else {
    ctx.moveTo(118, 358);
    ctx.quadraticCurveTo(104, 368, 116, 372);
  }
  ctx.stroke();

  // Plant in the corner: three leaves on the left, two on the right.
  ctx.fillStyle = '#b5651d';
  rr(ctx, 548, 356, 30, 26, 4);
  ctx.fill();
  ctx.fillStyle = '#2a9d8f';
  leaf(ctx, 563, 356, -30);
  leaf(ctx, 563, 356, 0);
  if (!mods.has('plant')) leaf(ctx, 563, 356, 30);
}

function shelf(ctx, x, y, w, rows, mods) {
  const palette = ['#e63946', '#f4a261', '#2a9d8f', '#e9c46a', '#457b9d', '#9b5de5', '#f15bb5'];
  ctx.fillStyle = '#8a5a2b';
  ctx.fillRect(x - 8, y - 6, w + 16, rows * 46 + 12);
  for (let r = 0; r < rows; r++) {
    const sy = y + r * 46;
    for (let i = 0; i < 13; i++) {
      const bx = x + i * 42;
      const bh = 30 + ((i * 7 + r * 13) % 10);
      let c = palette[(i + r * 3) % palette.length];
      // One spine changes colour on the right panel (row 0, 6th book).
      if (mods.has('book-spine') && r === 0 && i === 5) c = '#2a9d8f';
      ctx.fillStyle = c;
      ctx.fillRect(bx, sy + 34 - bh, 16, bh);
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.fillRect(bx + 3, sy + 34 - bh, 3, bh);
    }
    ctx.fillStyle = '#6b4f2a';
    ctx.fillRect(x - 8, sy + 34, w + 16, 6);
  }
}

function leaf(ctx, x, y, angleDeg) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((angleDeg * Math.PI) / 180);
  ctx.beginPath();
  ctx.ellipse(0, -18, 7, 18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
