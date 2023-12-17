import { memo, useEffect } from "react";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import UserCard from "../../components/user-card";
import Spinner from "../../components/spinner";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import UserPanel from "../../containers/user-panel";

function Profile() {
  const store = useStore();
  const { t } = useTranslate();
  const token = localStorage.getItem("token");

  useInit(() => {
    store.actions.user.loadUserInfo();
  }, [token]);

  const select = useSelector((state) => ({
    userInfo: state.user.userInfo,
    waiting: state.user.waiting,
  }));

  return (
    <PageLayout>
      <UserPanel />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <SideLayout padding="medium">
        <Spinner active={select.waiting}>
          <UserCard t={t} userInfo={select.userInfo} />
        </Spinner>
      </SideLayout>
    </PageLayout>
  );
}

export default memo(Profile);
