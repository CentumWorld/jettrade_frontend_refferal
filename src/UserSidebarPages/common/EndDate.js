export const endDate = (givenDateString) => {
  const [month, day, year] = givenDateString.split("/");
  const formattedDateString = `${day}/${month}/${year}`;
  return formattedDateString;
};
