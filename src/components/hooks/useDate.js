export default function useDate() {
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const endDate = `${today.getFullYear()}-${('0' + today.getMonth() + 1).slice(
    -2
  )}-${('0' + today.getDate()).slice(-2)}`;
  const startDate = `${oneMonthAgo.getFullYear()}-${(
    '0' +
    oneMonthAgo.getMonth() +
    1
  ).slice(-2)}-${('0' + oneMonthAgo.getDate()).slice(-2)}`;

  return [startDate, endDate];
}
