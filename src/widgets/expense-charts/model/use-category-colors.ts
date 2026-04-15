import { useMemo } from 'react';

type ColorMap = Record<string, string>;

const DEFAULT_COLOR = '#667085';

const CATEGORY_COLORS: Record<string, string> = {
  '. общий быт': '#64748b',
  '.одолжения': '#475467',
  '📠 жкх': '#0ea5e9',
  '👗 одежда': '#a855f7',
  '🎁 подарки': '#ef4444',
  '🛒 продукты': '#3b82f6',
  '🎓 образование': '#f59e0b',
  '📡 сервисы и комиссии': '#6366f1',
  '🏠 для дома': '#f97316',
  '🩺 здоровье': '#14b8a6',
  '💅 красота': '#ec4899',
  '🧪 бытовая химия': '#22c55e',
  'стипендия': '#0ea5e9',
  '💰 зп': '#16a34a',
  '💰 прочие пополнения': '#65a30d',
  '🔌 техника': '#7c3aed',
  '🐈 питомцы': '#10b981',
  '🍸 алкоголь': '#b45309',
  '💲аренда': '#0f766e',
  '✈️ путешествия': '#dc2626',
  '💜 софа': '#c026d3',
};

const GROUP_COLORS = {
  foodOut: '#f97316',
  transport: '#06b6d4',
  entertainment: '#8b5cf6',
};

const normalizeCategory = (value: string) => value.toLowerCase().replace(/\s+/g, ' ').trim();

const getStaticColor = (rawCategory: string): string => {
  const category = normalizeCategory(rawCategory);

  if (category.includes('еда вне дома')) {
    return GROUP_COLORS.foodOut;
  }

  if (category.includes('проезд')) {
    return GROUP_COLORS.transport;
  }

  if (category.includes('развлечения')) {
    return GROUP_COLORS.entertainment;
  }

  return CATEGORY_COLORS[category] ?? DEFAULT_COLOR;
};

export const useCategoryColors = (categories: string[]) => {
  return useMemo(() => {
    const map: ColorMap = {};

    categories.forEach((category) => {
      map[category] = getStaticColor(category);
    });

    return map;
  }, [categories]);
};
