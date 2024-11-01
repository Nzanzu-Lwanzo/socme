import AuthParent from "../components/auth/AuthParent";
import { UserToAuthenticate } from "../types/types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { fbAuth } from "../firebase/config";
import useAppStore from "../stores/AppStore";
import { validateToAuthenticateUser } from "../utils/validators";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const setAuth = useAppStore((state) => state.setAuth);
  const navigateTo = useNavigate();

  const handleSubmit = async (user: UserToAuthenticate) => {
    try {
      if (!validateToAuthenticateUser(user)) {
        throw new Error("INVALID_DATA_ERROR");
      }
      const { user: account } = await createUserWithEmailAndPassword(
        fbAuth,
        user.email,
        user.password
      );

      // Save the account data in a state
      setAuth({
        email: account.email,
        name: account.displayName,
        picture: account.photoURL,
      });

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
