import { memo } from "react";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import UserCard from "../../components/user-card";
import { useAuth } from "../../hooks/use-auth";
import Spinner from "../../components/spinner";

function Profile() {
  const { t } = useTranslate();
  const { userInfo, waiting } = useAuth();

  return (
    <PageLayout>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <SideLayout padding="medium">
        <Spinner active={waiting}>
          <UserCard t={t} userInfo={userInfo} />
        </Spinner>
      </SideLayout>
    </PageLayout>
  );
}

export default memo(Profile);
