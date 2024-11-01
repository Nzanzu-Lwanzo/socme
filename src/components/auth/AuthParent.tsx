import { PropsWithChildren, useState } from "react";
import "../../assets/style/perPage/auth.scss";
import { Link } from "react-router-dom";
import { UserToAuthenticate } from "../../types/types";

interface Props {
  title: string;
  switchTo: "login" | "signup";
  handleSubmit: (user: UserToAuthenticate) => void;
}

const AuthParent = ({
  title,
  switchTo,
  handleSubmit,
}: PropsWithChildren<Props>) => {
  const [user, setUser] = useState<UserToAuthenticate>({
    email: "",
    password: "",
  });

  return (
    <main className="auth__page">
      <div className="auth__card">
        <h1 className="card__name">{title}</h1>

        <div className="inputs">
          <div className="wrap__input">
            <label htmlFor="email">E-mail address</label>
            <input
              type="email"
              placeholder="ex : user@gmail.com"
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
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
            Submit
          </button>
          <Link to={`/auth/${switchTo}`} className="switcher">
            {switchTo === "login"
              ? "I already have an account"
              : "I  have no account"}
          </Link>
          <button type="button" className="o__auth">
            Use Google to authenticate
          </button>
        </div>
      </div>
    </main>
  );
};

export default AuthParent;
