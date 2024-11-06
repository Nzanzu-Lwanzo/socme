import { PropsWithChildren, useState } from "react";
import "../../assets/style/perPage/auth.scss";
import { Link } from "react-router-dom";
import { UserToAuthenticateStateType } from "../../types/types";
import Loader from "../cross-app/Loader";

interface Props {
  title: string;
  switchTo: "login" | "signup";
  handleSubmit: (user: UserToAuthenticateStateType) => void;
  pending?: boolean;
}

const AuthParent = ({
  title,
  switchTo,
  handleSubmit,
  pending,
}: PropsWithChildren<Props>) => {
  const [user, setUser] = useState<UserToAuthenticateStateType>({
    name: "",
    password: "",
  });

  return (
    <main className="auth__page">
      <div className="auth__card">
        <h1 className="card__name">{title}</h1>

        <div className="inputs">
          <div className="wrap__input">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              placeholder="ex : Nzanzu Lwanzo"
              value={user.name}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="wrap__input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Secret password"
              value={user.password}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <button
            type="button"
            className="submit__button"
            onClick={() => {
              handleSubmit(user);
            }}
          >
            {pending ? <Loader height={23} width={23} /> : "Submit"}
          </button>
          <Link to={`/auth/${switchTo}`} className="switcher">
            {switchTo === "login"
              ? "I already have an account"
              : "I  have no account"}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AuthParent;
