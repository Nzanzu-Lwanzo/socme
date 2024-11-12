import { PropsWithChildren } from "react";
import "../../assets/style/perPage/auth.scss";
import { Link } from "react-router-dom";
import { StateUserType } from "../../types/interfaces";
import Loader from "../cross-app/Loader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RefreshCcw, House } from "lucide-react";
import { authUserSchema } from "../../utils/yupSchemas";

interface Props {
  title: string;
  switchTo: "login" | "signup";
  onSubmit: (user: StateUserType) => void;
  pending?: boolean;
}

const AuthParent = ({
  title,
  switchTo,
  onSubmit,
  pending,
}: PropsWithChildren<Props>) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(authUserSchema),
  });

  return (
    <main className="auth__page">
      <div className="auth__card form__container">
        <div className="auth__card__topbar">
          <h1 className="card__name">{title}</h1>
          <div className="actions">
            <button
              type="button"
              className="action"
              onClick={() => reset({ name: "", password: "" })}
            >
              <RefreshCcw size={20} />
            </button>
            <Link to="/" className="action">
              <House size={20} />
            </Link>
          </div>
        </div>
        <form className="inputs" onSubmit={handleSubmit(onSubmit)}>
          <div className="wrap__input">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              placeholder="ex : Nzanzu Lwanzo"
              {...register("name")}
            />
            {errors?.name && (
              <span className="error__on__input">{errors.name.message}</span>
            )}
          </div>
          <div className="wrap__input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Secret password"
              {...register("password")}
            />
            {errors?.password && (
              <span className="error__on__input">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button type="submit" className="submit__button">
            {pending ? <Loader height={23} width={23} /> : "Submit"}
          </button>

          <Link to={`/auth/${switchTo}`} className="switcher">
            {switchTo === "login"
              ? "I already have an account"
              : "I  have no account"}
          </Link>
        </form>
      </div>
    </main>
  );
};

export default AuthParent;
