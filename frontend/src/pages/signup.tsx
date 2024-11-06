import AuthParent from "../components/auth/AuthParent";
import { UserToAuthenticateStateType } from "../types/types";
import { validateToAuthenticateUser } from "../utils/validators";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigateTo = useNavigate();

  const handleSubmit = async (user: UserToAuthenticateStateType) => {
    try {
      if (!validateToAuthenticateUser(user)) {
        throw new Error("INVALID_DATA_ERROR");
      }

      // Save the account data in a state

      navigateTo("/");
    } catch (e) {
      switch ((e as Error).message) {
        case "INVALID_DATA_ERROR": {
          // Do something
          // The user didn't provide any credentials
          break;
        }

        default:
          console.log(e);
      }
    }
  };

  return (
    <AuthParent
      handleSubmit={handleSubmit}
      switchTo="login"
      title="Create an account"
    ></AuthParent>
  );
};

export default Signup;
