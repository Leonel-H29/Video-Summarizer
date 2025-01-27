export const SummaryDisplay: React.FC<{ summary: string }> = ({ summary }) => {
  return (
    <div>
      <h2>Video Summary</h2>
      <p>{summary || 'No summary available'}</p>
    </div>
  );
};
