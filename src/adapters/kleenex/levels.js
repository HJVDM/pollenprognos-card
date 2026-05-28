// src/adapters/kleenex/levels.js

// Dutch standard pollen thresholds (RIVM / Natuur & Milieu guidelines):
//   Laag      : 0 < ppm < 30
//   Matig     : 30 ≤ ppm < 70
//   Hoog      : 70 ≤ ppm ≤ 150
//   Zeer hoog : ppm > 150
const LOW_THRESHOLD      = 30;
const MODERATE_THRESHOLD = 70;
const HIGH_THRESHOLD     = 150;

// Convert a numeric ppm value to level (0-4).
// The allergenName parameter is accepted for API compatibility but is not used;
// uniform thresholds apply across all allergen categories.
export function ppmToLevel(value, _allergenName) {
  const numVal = Number(value);
  if (isNaN(numVal) || numVal < 0) return -1;
  if (numVal === 0) return 0;

  if (numVal < LOW_THRESHOLD)      return 1; // Laag
  if (numVal < MODERATE_THRESHOLD) return 2; // Matig
  if (numVal <= HIGH_THRESHOLD)    return 3; // Hoog
  return 4;                                  // Zeer hoog
}
