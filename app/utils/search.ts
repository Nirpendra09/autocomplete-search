import data from '../../public/data.json';

const { summaries } = data;

export const searchSummaries = (query: string): number[] => {
  const queryTokens = query.toLowerCase().split(/\s+/);
  const results: { id: number; count: number }[] = [];

  summaries.forEach((summary) => {
    const summaryText = summary.summary.toLowerCase();
    let count = 0;
    queryTokens.forEach((token) => {
      if (summaryText.includes(token)) {
        count += summaryText.split(token).length - 1; 
      }
    });
    if (count > 0) {
      results.push({ id: summary.id, count });
    }
  });

  return results
    .sort((a, b) => b.count - a.count) 
    .map((result) => result.id);
};