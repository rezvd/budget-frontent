import ReactMarkdown from 'react-markdown';

type MonthCommentProps = {
  markdown: string | null;
};

export const MonthComment = ({ markdown }: MonthCommentProps) => {
  return (
    <section className="panel">
      <h2>Комментарий</h2>
      {!markdown ? (
        <p className="empty month-comment-empty">Комментарий за выбранный месяц отсутствует.</p>
      ) : (
        <div className="month-comment-markdown">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      )}
    </section>
  );
};
