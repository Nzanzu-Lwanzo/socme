import { enqueueSnackbar } from "notistack";
import AuthParent from "../components/auth/AuthParent";
import { useCreateAccount } from "../hooks/userHooks";
import { StateUserType } from "../types/interfaces";
import { validateToAuthenticateUser } from "../utils/validators";

const Signup = () => {
  const { mutate, isPending } = useCreateAccount();

  const handleSubmit = async (user: StateUserType) => {
    try {
      if (!validateToAuthenticateUser(user)) {
        throw new Error("INVALID_DATA_ERROR");
      }

      // Request the server to create the account
      mutate(user);
    } catch (e) {
      switch ((e as Error).message) {
        case "INVALID_DATA_ERROR": {
          enqueueSnackbar("Données incomplètes ou invalides fournies !");
          break;
        }

        default:
          console.log(e);
      }
    }
  };

  return (
    <AuthParent
      onSubmit={handleSubmit}
      switchTo="login"
      title="Create an account"
      pending={isPending}
    ></AuthParent>
  );
};

export default Signup;
