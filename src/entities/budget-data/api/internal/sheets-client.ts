import { BatchGetResponse, RawCell, SheetName } from './types';

const GOOGLE_SHEETS_API_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

const getEnv = (key: 'VITE_GOOGLE_SHEET_ID' | 'VITE_GOOGLE_SHEETS_API_KEY') => import.meta.env[key]?.trim();

const buildBatchGetUrl = () => {
  const sheetId = getEnv('VITE_GOOGLE_SHEET_ID');
  const apiKey = getEnv('VITE_GOOGLE_SHEETS_API_KEY');

  if (!sheetId || !apiKey) {
    throw new Error('Google Sheets config is missing');
  }

  const params = new URLSearchParams({
    key: apiKey,
    majorDimension: 'ROWS',
    valueRenderOption: 'UNFORMATTED_VALUE',
  });
  params.append('ranges', 'logs!A:H');
  params.append('ranges', 'month_plans!A:C');
  params.append('ranges', 'month_comments!A:B');

  return `${GOOGLE_SHEETS_API_URL}/${sheetId}/values:batchGet?${params.toString()}`;
};

export const fetchBudgetSheets = async (): Promise<BatchGetResponse> => {
  const response = await fetch(buildBatchGetUrl());
  if (!response.ok) {
    throw new Error(`Failed to read sheets: ${response.status}`);
  }

  return (await response.json()) as BatchGetResponse;
};

export const extractRows = (payload: BatchGetResponse, sheet: SheetName): RawCell[][] => {
  const target = payload.valueRanges?.find((item) => item.range?.startsWith(`${sheet}!`));

  return target?.values ?? [];
};
