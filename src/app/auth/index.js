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

function Auth() {
  const store = useStore();
  const navigate = useNavigate();
  const { isAuth, error, waiting } = useAuth();

  useInit(() => {
    if (isAuth) {
      navigate("/profile");
    }
  }, [isAuth, navigate]);

  const callbacks = {
    login: useCallback((data) => store.actions.user.login(data), [store]),
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
          <AuthForm t={t} login={callbacks.login} serverError={error} />
        </Spinner>
      </SideLayout>
    </PageLayout>
  );
}

export default memo(Auth);
