import AuthParent from "../components/auth/AuthParent";
import { useLogUserIn } from "../hooks/userHooks";
import { StateUserType } from "../types/types";
import { validateToAuthenticateUser } from "../utils/validators";
import { enqueueSnackbar } from "notistack";

const Login = () => {
  const { isPending, mutate } = useLogUserIn();

  const handleSubmit = async (user: StateUserType) => {
    try {
      if (!validateToAuthenticateUser(user)) {
        throw new Error("INVALID_DATA_ERROR");
      }

      // Request the server to authenticate the user
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
      switchTo="signup"
      title="Log In"
      pending={isPending}
    ></AuthParent>
  );
};

export default Login;
