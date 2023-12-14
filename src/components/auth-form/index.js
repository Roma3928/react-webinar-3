import PropTypes from "prop-types";
import { memo } from "react";
import "./style.css";
import Field from "../ui/field";
import { useForm } from "react-hook-form";

function AuthForm(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    props.login(data);
    reset();
  };

  return (
    <div className="AuthForm">
      <h2 className="AuthForm-title">{props.t("login")}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          {...register("login", {
            required: "Логин нужно заполнить!",
          })}
          title={props.t("input.login")}
          type="text"
          error={errors.login}
        />
        <Field
          {...register("password", {
            required: "Пароль нужно заполнить!",
            minLength: {
              value: 6,
              message: "Мин. длина пароля 6 символов",
            },
          })}
          title={props.t("input.password")}
          type="password"
          error={errors.password}
        />

        {props.serverError && (
          <p className="AuthForm-error">{props.serverError}</p>
        )}
        <button>{props.t("loginIn")}</button>
      </form>
    </div>
  );
}

AuthForm.propTypes = {
  t: PropTypes.func,
  login: PropTypes.func,
  serverError: PropTypes.string,
};

AuthForm.defaultProps = {
  t: (text) => text,
  login: (data) => data,
  serverError: "",
};

export default memo(AuthForm);
