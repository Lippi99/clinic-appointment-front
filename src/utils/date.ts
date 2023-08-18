import { format } from "date-fns";

export const formatDate = (date: Date, dateFormat = "dd/MM/yyyy") => {
  return format(date, dateFormat);
};
