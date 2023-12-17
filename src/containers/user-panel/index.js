import SideLayout from "../../components/side-layout";
import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import { useAuth } from "../../hooks/use-auth";
import useTranslate from "../../hooks/use-translate";
import AuthOptions from "../../components/auth-options";

function UserPanel() {
  const store = useStore();
  const { isAuth, userInfo } = useAuth();
  const { t } = useTranslate();

  const callbacks = {
    logout: useCallback(() => store.actions.user.logout(), [store]),
  };

  return (
    <SideLayout side="end" padding="mixed">
      <AuthOptions
        isAuth={isAuth}
        userInfo={userInfo}
        t={t}
        logout={callbacks.logout}
      />
    </SideLayout>
  );
}

export default memo(UserPanel);
