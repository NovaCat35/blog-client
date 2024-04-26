import { format } from "date-fns";

function formatDate(dateString: string) {
   const date = new Date(dateString)
   const formattedDate = format(date, 'MMMM dd, yyyy')

   return formattedDate;
}

export default formatDate;