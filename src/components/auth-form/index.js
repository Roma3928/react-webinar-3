import PropTypes from "prop-types";
import { memo } from "react";
import "./style.css";
import Field from "../ui/field";

function AuthForm(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.login(props.loginValue.value, props.passwordValue.value);
    props.loginValue.reset();
    props.passwordValue.reset();
  };

  return (
    <div className="AuthForm">
      <h2 className="AuthForm-title">{props.t("login")}</h2>
      <form onSubmit={handleSubmit}>
        <Field
          title={props.t("input.login")}
          type="text"
          error={props.loginValue.error}
          value={props.loginValue.value}
          onChange={props.loginValue.onChange}
          onBlur={props.loginValue.onBlur}
          isDirty={props.loginValue.isDirty}
        />
        <Field
          title={props.t("input.password")}
          type="password"
          error={props.passwordValue.error}
          value={props.passwordValue.value}
          onChange={props.passwordValue.onChange}
          onBlur={props.passwordValue.onBlur}
          isDirty={props.passwordValue.isDirty}
        />

        {props.serverError && (
          <p className="AuthForm-error">{props.serverError}</p>
        )}
        <button disabled={props.passwordValue.error || props.loginValue.error}>
          {props.t("loginIn")}
        </button>
      </form>
    </div>
  );
}

AuthForm.propTypes = {
  t: PropTypes.func,
  login: PropTypes.func,
  serverError: PropTypes.string,
  loginValue: PropTypes.shape({
    error: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    isDirty: PropTypes.bool,
  }),
  passwordValue: PropTypes.shape({
    error: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    isDirty: PropTypes.bool,
  }),
};

AuthForm.defaultProps = {
  t: (text) => text,
  login: (data) => data,
  serverError: "",
};

export default memo(AuthForm);
