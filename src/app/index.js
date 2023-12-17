import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Auth from "./auth";
import Profile from "./profile";
import useInit from "../hooks/use-init";
import useStore from "../hooks/use-store";
import RequireAuth from "../router/require-auth";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const activeModal = useSelector((state) => state.modals.name);

  useInit(() => {
    store.actions.session.loadUserInfo();
  }, []);

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Auth />} />
        <Route
          path={"/profile"}
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
