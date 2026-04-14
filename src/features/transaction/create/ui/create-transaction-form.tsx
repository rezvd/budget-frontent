import { FormEvent, useState } from 'react';

import { BudgetTransaction, TransactionType } from '@/entities/transaction/model/types';

type Draft = {
  type: TransactionType;
  category: string;
  amount: string;
  note: string;
};

type CreateTransactionFormProps = {
  onCreate: (transaction: BudgetTransaction) => Promise<void>;
};

const initialDraft: Draft = {
  type: 'expense',
  category: '',
  amount: '',
  note: '',
};

export const CreateTransactionForm = ({ onCreate }: CreateTransactionFormProps) => {
  const [draft, setDraft] = useState<Draft>(initialDraft);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const amount = Number(draft.amount);

    if (!draft.category.trim() || !Number.isFinite(amount) || amount <= 0) {
      return;
    }

    await onCreate({
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      type: draft.type,
      category: draft.category.trim(),
      amount,
      note: draft.note.trim(),
    });

    setDraft(initialDraft);
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <label>
        Тип
        <select value={draft.type} onChange={(event) => setDraft((prev) => ({ ...prev, type: event.target.value as TransactionType }))}>
          <option value="expense">Расход</option>
          <option value="income">Доход</option>
        </select>
      </label>
      <label>
        Категория
        <input
          value={draft.category}
          onChange={(event) => setDraft((prev) => ({ ...prev, category: event.target.value }))}
          placeholder="Еда, зарплата, транспорт"
        />
      </label>
      <label>
        Сумма
        <input
          type="number"
          min="1"
          step="1"
          value={draft.amount}
          onChange={(event) => setDraft((prev) => ({ ...prev, amount: event.target.value }))}
          placeholder="1000"
        />
      </label>
      <label className="full-width">
        Комментарий
        <input
          value={draft.note}
          onChange={(event) => setDraft((prev) => ({ ...prev, note: event.target.value }))}
          placeholder="Необязательно"
        />
      </label>
      <button className="full-width" type="submit">
        Сохранить операцию
      </button>
    </form>
  );
};
