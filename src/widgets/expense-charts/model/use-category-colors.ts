import { useMemo } from 'react';

const STORAGE_KEY = 'budget-category-colors-v1';

const PALETTE = [
  '#667085',
  '#475467',
  '#1570ef',
  '#0e9384',
  '#16a34a',
  '#65a30d',
  '#ca8a04',
  '#ea580c',
  '#dc2626',
  '#be123c',
  '#c026d3',
  '#7c3aed',
  '#4338ca',
  '#0369a1',
  '#0891b2',
  '#0f766e',
  '#15803d',
  '#4d7c0f',
  '#a16207',
  '#92400e',
];

type ColorMap = Record<string, string>;

const hashString = (value: string) => {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
};

const loadStoredMap = (): ColorMap => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as ColorMap;

    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

const saveMap = (map: ColorMap) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // no-op: storage can be unavailable in private mode
  }
};

const assignColor = (category: string, usedColors: Set<string>) => {
  const startIndex = hashString(category) % PALETTE.length;

  for (let i = 0; i < PALETTE.length; i += 1) {
    const color = PALETTE[(startIndex + i) % PALETTE.length];

    if (!usedColors.has(color)) {
      return color;
    }
  }

  return PALETTE[startIndex];
};

export const useCategoryColors = (categories: string[]) => {
  return useMemo(() => {
    const stored = loadStoredMap();
    const usedColors = new Set(Object.values(stored));
    const next = { ...stored };

    categories.forEach((category) => {
      if (next[category]) {
        return;
      }

      const color = assignColor(category, usedColors);
      next[category] = color;
      usedColors.add(color);
    });

    saveMap(next);

    return next;
  }, [categories]);
};
