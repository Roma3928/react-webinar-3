import Main from "./main";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "../router";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
