// The differences for every level. Coordinates are in panel space (620x440);
// x, y is the centre of the changed thing, r its click radius. The scene
// painters read the same ids: a difference is "applied" on the right panel
// only, so left and right stay near-identical except for these spots.

export const DIFFERENCES = {
  market: [
    { id: 'sun-face', x: 78, y: 72, r: 30, name: 'the sun lost its smile' },
    { id: 'awning-stripe', x: 300, y: 92, r: 24, name: 'one awning stripe changed colour' },
    { id: 'apples', x: 175, y: 305, r: 20, name: 'an apple went missing' },
    { id: 'cat', x: 505, y: 335, r: 32, name: 'the stall cat wandered off' },
    { id: 'bell', x: 565, y: 295, r: 16, name: 'the bicycle bell vanished' },
  ],
  harbour: [
    { id: 'moon', x: 540, y: 70, r: 28, name: 'the moon changed phase' },
    { id: 'beam', x: 180, y: 150, r: 30, name: 'the lighthouse beam went dark' },
    { id: 'gull', x: 320, y: 90, r: 22, name: 'a gull flew away' },
    { id: 'flag', x: 420, y: 120, r: 18, name: 'the boat flag changed colour' },
    { id: 'lantern', x: 90, y: 320, r: 22, name: 'the dock lantern went out' },
    { id: 'star', x: 460, y: 50, r: 14, name: 'a star appeared' },
    { id: 'rope', x: 150, y: 380, r: 24, name: 'the rope coil disappeared' },
  ],
  library: [
    { id: 'clock', x: 520, y: 80, r: 26, name: 'the clock shows another hour' },
    { id: 'cat-tail', x: 150, y: 350, r: 28, name: 'the cat curled its tail' },
    { id: 'book-spine', x: 300, y: 150, r: 16, name: 'one book spine changed colour' },
    { id: 'teapot', x: 420, y: 320, r: 24, name: 'the teapot is gone' },
    { id: 'window-star', x: 90, y: 90, r: 14, name: 'a star left the window' },
    { id: 'plant', x: 560, y: 330, r: 22, name: 'the plant lost a leaf' },
    { id: 'picture', x: 210, y: 110, r: 24, name: 'the framed picture changed' },
    { id: 'lamp-glow', x: 350, y: 220, r: 30, name: 'the reading lamp went dark' },
    { id: 'rug-stripe', x: 310, y: 400, r: 20, name: 'the rug stripe changed colour' },
  ],
};
