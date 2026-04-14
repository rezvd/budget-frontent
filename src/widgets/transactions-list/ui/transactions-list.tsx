import { BudgetTransaction } from '@/entities/transaction/model/types';
import { formatCurrency } from '@/shared/lib/format/format-currency';

type TransactionsListProps = {
  transactions: BudgetTransaction[];
};

export const TransactionsList = ({ transactions }: TransactionsListProps) => {
  if (transactions.length === 0) {
    return <p className="empty">Операций пока нет.</p>;
  }

  return (
    <ul className="list">
      {transactions.map((transaction) => (
        <li key={transaction.id} className="row">
          <div>
            <strong>{transaction.category}</strong>
            <p>{new Date(transaction.date).toLocaleString('ru-RU')}</p>
            {transaction.note && <small>{transaction.note}</small>}
          </div>
          <b className={transaction.type === 'income' ? 'income' : 'expense'}>
            {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
          </b>
        </li>
      ))}
    </ul>
  );
};
