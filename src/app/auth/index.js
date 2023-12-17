import { memo, useCallback, useEffect } from "react";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import AuthForm from "../../components/auth-form";
import useStore from "../../hooks/use-store";
import { useAuth } from "../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import useInit from "../../hooks/use-init";
import Spinner from "../../components/spinner";
import { useInput } from "../../hooks/use-input";

function Auth() {
  const store = useStore();
  const navigate = useNavigate();
  const { isAuth, error, waiting } = useAuth();
  const loginValue = useInput("", {
    isEmpty: { message: "Логин нужно заполнить!" },
  });
  const passwordValue = useInput("", {
    isEmpty: { message: "Пароль нужно заполнить!" },
    minLength: {
      value: 6,
      message: "Минимальная длина пароля 6 символов",
    },
  });

  useInit(() => {
    if (isAuth) {
      navigate("/profile");
    }
  }, [isAuth, navigate]);

  const callbacks = {
    login: useCallback(
      (login, password) => store.actions.user.login({ login, password }),
      [store]
    ),
    logout: useCallback(() => store.actions.user.logout(), [store]),
  };

  const { t } = useTranslate();
  return (
    <PageLayout>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <SideLayout padding="medium">
        <Spinner active={waiting}>
          <AuthForm
            t={t}
            login={callbacks.login}
            serverError={error}
            loginValue={loginValue}
            passwordValue={passwordValue}
          />
        </Spinner>
      </SideLayout>
    </PageLayout>
  );
}

export default memo(Auth);
