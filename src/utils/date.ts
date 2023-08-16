import { format } from "date-fns";

export const formatDate = (date: string, dateFormat = "dd/MM/yyyy") => {
  return format(new Date(date), dateFormat);
};
