import { useMemo, useState } from 'react';

import {
  hasGoogleSheetsConfig,
  loadPreviewRows,
  loadTransactionsFromSheet,
  SheetPreviewRow,
} from '@/entities/transaction/api/google-sheets';
import { BudgetTransaction } from '@/entities/transaction/model/types';
import { BudgetOverview } from '@/widgets/budget-overview/ui/budget-overview';
import { TransactionsList } from '@/widgets/transactions-list/ui/transactions-list';

export const BudgetPage = () => {
  const [transactions, setTransactions] = useState<BudgetTransaction[]>([]);
  const [previewRows, setPreviewRows] = useState<SheetPreviewRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const totals = useMemo(() => {
    const income = transactions.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0);
    const expense = transactions.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0);

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [transactions]);

  const syncFromSheet = async () => {
    if (!hasGoogleSheetsConfig()) {
      setMessage('Не заполнены переменные Google Sheets (.env).');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const [fromSheet, preview] = await Promise.all([loadTransactionsFromSheet(), loadPreviewRows(5)]);
      setTransactions(fromSheet);
      setPreviewRows(preview);
      setMessage(`Данные загружены: ${fromSheet.length} строк.`);
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Не удалось загрузить данные из таблицы.';
      setMessage(text);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="page">
      <BudgetOverview {...totals} isLoading={isLoading} onSync={syncFromSheet} />

      <section className="panel">
        <h2>Первые 5 записей из Google Sheets (проверка)</h2>
        {previewRows.length === 0 ? (
          <p className="empty">Нажми «Синхронизировать из Google Sheets».</p>
        ) : (
          <pre style={{ overflowX: 'auto', fontSize: 13, marginTop: 12 }}>{JSON.stringify(previewRows, null, 2)}</pre>
        )}
        {message && <p className="message">{message}</p>}
      </section>

      <section className="panel">
        <h2>История</h2>
        <TransactionsList transactions={transactions} />
      </section>
    </main>
  );
};
