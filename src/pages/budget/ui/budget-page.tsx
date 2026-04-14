import { useMemo, useState } from 'react';

import {
  appendTransactionToSheet,
  hasGoogleSheetsConfig,
  loadTransactionsFromSheet,
} from '@/entities/transaction/api/google-sheets';
import { readLocalTransactions, writeLocalTransactions } from '@/entities/transaction/model/storage';
import { BudgetTransaction } from '@/entities/transaction/model/types';
import { CreateTransactionForm } from '@/features/transaction/create/ui/create-transaction-form';
import { BudgetOverview } from '@/widgets/budget-overview/ui/budget-overview';
import { TransactionsList } from '@/widgets/transactions-list/ui/transactions-list';

export const BudgetPage = () => {
  const [transactions, setTransactions] = useState<BudgetTransaction[]>(() => readLocalTransactions());
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
      setMessage('Не заполнены переменные Google Sheets. Используются только локальные данные браузера.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const fromSheet = await loadTransactionsFromSheet();
      setTransactions(fromSheet);
      writeLocalTransactions(fromSheet);
      setMessage('Данные загружены из Google Sheets.');
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Не удалось загрузить данные из таблицы.';
      setMessage(text);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (transaction: BudgetTransaction) => {
    const next = [transaction, ...transactions];
    setTransactions(next);
    writeLocalTransactions(next);
    setMessage('Операция сохранена локально.');

    if (!hasGoogleSheetsConfig()) {
      return;
    }

    try {
      await appendTransactionToSheet(transaction);
      setMessage('Операция записана в Google Sheets.');
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Не удалось записать операцию в таблицу.';
      setMessage(text);
    }
  };

  return (
    <main className="page">
      <BudgetOverview {...totals} isLoading={isLoading} onSync={syncFromSheet} />

      <section className="panel">
        <h2>Добавить операцию</h2>
        <CreateTransactionForm onCreate={handleCreate} />
        {message && <p className="message">{message}</p>}
      </section>

      <section className="panel">
        <h2>История</h2>
        <TransactionsList transactions={transactions} />
      </section>
    </main>
  );
};
