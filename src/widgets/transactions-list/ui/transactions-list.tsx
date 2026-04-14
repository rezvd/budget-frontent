import { Transaction } from '@/entities/budget-data/model/models';
import { formatCurrency } from '@/shared/lib/format/format-currency';

type TransactionsListProps = {
  transactions: Transaction[];
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
            <p>{new Date(transaction.date).toLocaleDateString('ru-RU')}</p>
            {(transaction.comment || transaction.additionalComment || transaction.shop) && (
              <small>{[transaction.shop, transaction.comment, transaction.additionalComment].filter(Boolean).join(' | ')}</small>
            )}
          </div>
          <b className={transaction.type === 'income' ? 'income' : 'expense'}>
            {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amountAbs)}
          </b>
        </li>
      ))}
    </ul>
  );
};
