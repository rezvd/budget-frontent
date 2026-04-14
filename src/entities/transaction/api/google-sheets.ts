import { BudgetTransaction } from '../model/types';

const GOOGLE_SHEETS_API_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

type RawSheetValue = string | number | boolean | undefined;

type RawSheetResponse = {
  values?: RawSheetValue[][];
};

export type SheetPreviewRow = {
  index: number;
  date: string;
  amount: string;
  store: string;
  category: string;
  comment: string;
};

const getEnv = (key: 'VITE_GOOGLE_SHEET_ID' | 'VITE_GOOGLE_SHEET_RANGE' | 'VITE_GOOGLE_SHEETS_API_KEY') =>
  import.meta.env[key]?.trim();

const normalizeText = (value: RawSheetValue) => String(value ?? '').trim();

const parseAmount = (value: RawSheetValue): number => {
  const raw = normalizeText(value).replace(/[\s\u00A0]/g, '').replace(',', '.');
  const parsed = Number(raw);

  return Number.isFinite(parsed) ? parsed : 0;
};

const getReadUrl = () => {
  const sheetId = getEnv('VITE_GOOGLE_SHEET_ID');
  const range = getEnv('VITE_GOOGLE_SHEET_RANGE');
  const apiKey = getEnv('VITE_GOOGLE_SHEETS_API_KEY');

  if (!sheetId || !range || !apiKey) {
    throw new Error('Google Sheets config is missing');
  }

  const params = new URLSearchParams({
    key: apiKey,
    majorDimension: 'ROWS',
    valueRenderOption: 'UNFORMATTED_VALUE',
  });

  return `${GOOGLE_SHEETS_API_URL}/${sheetId}/values/${encodeURIComponent(range)}?${params}`;
};

export const hasGoogleSheetsConfig = () => {
  return Boolean(getEnv('VITE_GOOGLE_SHEET_ID') && getEnv('VITE_GOOGLE_SHEET_RANGE') && getEnv('VITE_GOOGLE_SHEETS_API_KEY'));
};

const loadRows = async (): Promise<RawSheetValue[][]> => {
  const response = await fetch(getReadUrl());

  if (!response.ok) {
    throw new Error(`Failed to read sheet: ${response.status}`);
  }

  const payload = (await response.json()) as RawSheetResponse;

  return payload.values ?? [];
};

export const loadPreviewRows = async (limit = 5): Promise<SheetPreviewRow[]> => {
  const rows = await loadRows();

  return rows
    .slice(1)
    .filter((row) => normalizeText(row[0]) || normalizeText(row[2]) || normalizeText(row[4]))
    .slice(0, limit)
    .map((row, idx) => ({
      index: idx + 1,
      date: normalizeText(row[0]),
      amount: normalizeText(row[2]),
      store: normalizeText(row[3]),
      category: normalizeText(row[4]),
      comment: normalizeText(row[5]),
    }));
};

export const loadTransactionsFromSheet = async (): Promise<BudgetTransaction[]> => {
  const rows = await loadRows();

  return rows
    .slice(1)
    .filter((row) => normalizeText(row[0]) || normalizeText(row[2]) || normalizeText(row[4]))
    .map((row, idx) => {
      const amount = parseAmount(row[2]);

      return {
        id: `${normalizeText(row[0])}-${idx}`,
        date: normalizeText(row[0]),
        type: amount >= 0 ? 'income' : 'expense',
        category: normalizeText(row[4]) || 'без категории',
        amount: Math.abs(amount),
        note: [normalizeText(row[3]), normalizeText(row[5])].filter(Boolean).join(' | '),
      };
    });
};
