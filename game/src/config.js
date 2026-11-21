// Every tuning number for Lantern Row in one place. Two panels, each 620x440
// logical pixels; the page scales them to the window, so no rule below depends
// on the screen size.

export const PANEL = { width: 620, height: 440 };

export const LEVELS = [
  {
    id: 'market',
    name: 'Morning Market',
    subtitle: 'A sleepy street stall, five things out of place',
    timeLimit: 150,
    hints: 3,
    diffCount: 5,
  },
  {
    id: 'harbour',
    name: 'Harbour at Dusk',
    subtitle: 'The lighthouse keeper is losing count',
    timeLimit: 180,
    hints: 3,
    diffCount: 7,
  },
  {
    id: 'library',
    name: 'The Night Library',
    subtitle: 'Nine small lies among the books',
    timeLimit: 210,
    hints: 3,
    diffCount: 9,
  },
];

export const SCORE = {
  perFind: 100,
  hintCost: 25,
  missPenaltySeconds: 5,
  levelBonusPerSecond: 5,
};

export const HINT_PULSE_MS = 2500;
export const FIND_RING_MS = 900;
