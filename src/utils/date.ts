import { format, parseISO } from "date-fns";

export const removeUTCDate = (date: Date) => {
  // date format is Wed Jun 30 2021

  let formattedDate = "";
  if (date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return (formattedDate = `${day}/${month}/${year}`);
  }
};

export const formatDate = (date: Date, dateFormat = "dd/MM/yyyy") => {
  return format(new Date(date), dateFormat);
};
