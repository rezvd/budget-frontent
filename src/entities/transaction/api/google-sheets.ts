import { BudgetTransaction } from '../model/types';

const GOOGLE_SHEETS_API_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

type RawSheetValue = string | number | undefined;

const toNumber = (value: RawSheetValue): number => {
  const parsed = Number(value ?? 0);

  return Number.isFinite(parsed) ? parsed : 0;
};

const getEnv = (key: 'VITE_GOOGLE_SHEET_ID' | 'VITE_GOOGLE_SHEET_RANGE' | 'VITE_GOOGLE_SHEETS_API_KEY') =>
  import.meta.env[key]?.trim();

export const hasGoogleSheetsConfig = () => {
  return Boolean(getEnv('VITE_GOOGLE_SHEET_ID') && getEnv('VITE_GOOGLE_SHEET_RANGE') && getEnv('VITE_GOOGLE_SHEETS_API_KEY'));
};

const mapRowToTransaction = (row: RawSheetValue[]): BudgetTransaction => {
  const [id, date, type, category, amount, note] = row;

  return {
    id: String(id ?? crypto.randomUUID()),
    date: String(date ?? ''),
    type: type === 'income' ? 'income' : 'expense',
    category: String(category ?? ''),
    amount: toNumber(amount),
    note: String(note ?? ''),
  };
};

export const loadTransactionsFromSheet = async (): Promise<BudgetTransaction[]> => {
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

  const response = await fetch(`${GOOGLE_SHEETS_API_URL}/${sheetId}/values/${encodeURIComponent(range)}?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to read sheet: ${response.status}`);
  }

  const payload = (await response.json()) as { values?: RawSheetValue[][] };
  const rows = payload.values ?? [];

  return rows.slice(1).map(mapRowToTransaction);
};

export const appendTransactionToSheet = async (transaction: BudgetTransaction): Promise<void> => {
  const sheetId = getEnv('VITE_GOOGLE_SHEET_ID');
  const range = getEnv('VITE_GOOGLE_SHEET_RANGE');
  const apiKey = getEnv('VITE_GOOGLE_SHEETS_API_KEY');

  if (!sheetId || !range || !apiKey) {
    throw new Error('Google Sheets config is missing');
  }

  const params = new URLSearchParams({
    key: apiKey,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
  });

  const response = await fetch(
    `${GOOGLE_SHEETS_API_URL}/${sheetId}/values/${encodeURIComponent(range)}:append?${params}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        values: [[transaction.id, transaction.date, transaction.type, transaction.category, transaction.amount, transaction.note]],
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to append row. For writes Google Sheets usually requires OAuth, not just API key. Status: ${response.status}`,
    );
  }
};
