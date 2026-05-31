// src/adapters/kleenex/levels.js

// Dutch pollen concentration categories (hooikoorts guidelines, NL).
// Thresholds differ per pollen category:
//
//   Bomen  (trees) : Laag 0–14   | Matig 15–89   | Hoog 90–1499  | Zeer hoog ≥1500
//   Grassen (grass): Laag 0–4    | Matig 5–19    | Hoog 20–199   | Zeer hoog ≥200
//   Kruiden (weeds): Laag 0–9    | Matig 10–49   | Hoog 50–499   | Zeer hoog ≥500
//
// Each entry: [matig_grens, hoog_grens, zeer_hoog_grens]
const THRESHOLDS = {
  trees: [  15,   90, 1500],
  grass: [   5,   20,  200],
  weeds: [  10,   50,  500],
};

import { KLEENEX_ALLERGEN_CATEGORIES } from "./constants.js";

// Convert a numeric ppm value to level (0-4).
export function ppmToLevel(value, allergenName) {
  const numVal = Number(value);
  if (isNaN(numVal) || numVal < 0) return -1;
  if (numVal === 0) return 0;

  const category = KLEENEX_ALLERGEN_CATEGORIES[allergenName] || "trees";
  const [matig, hoog, zeerHoog] = THRESHOLDS[category] ?? THRESHOLDS.trees;

  if (numVal < matig)    return 1; // Laag
  if (numVal < hoog)     return 2; // Matig
  if (numVal < zeerHoog) return 3; // Hoog
  return 4;                        // Zeer hoog
}
