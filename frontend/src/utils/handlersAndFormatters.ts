import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";

export const handleErrors = (
  error: AxiosError,
  defaultHandler?: () => void
) => {
  switch (error.status) {
    case 400:
      enqueueSnackbar("Request failed, check you network !");
      break;

    case 401:
      enqueueSnackbar("Unauthorized : please, do log in !");
      break;

    case 404:
      enqueueSnackbar("404 : ressource not found !");
      break;

    case 406:
      enqueueSnackbar("Incomplete or invalid data !");
      break;

    case 500:
      enqueueSnackbar("Internal error : call the developer !");
      break;
    default:
      if (defaultHandler && typeof defaultHandler === "function") {
        defaultHandler();
      }
      console.log(error.message);
      break;
  }
};

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  let hour = date.getHours();
  let minutes = date.getMinutes();
  return `${day}·${month}·${year} | ${hour}·${minutes}`;

  // Format the date using the Intl.DateTimeFormat object
}
