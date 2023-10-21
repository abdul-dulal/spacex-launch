const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
export const convertDate = (date) => {
  const utcDate = new Date(date);
  const localDate = utcDate.toLocaleString(undefined, options);
  return localDate;
};
