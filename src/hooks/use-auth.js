import useSelector from "./use-selector";

export const useAuth = () => {
  const { userInfo, error, waiting } = useSelector((state) => state.session);

  return {
    isAuth: !!localStorage.getItem("token"),
    userInfo,
    error,
    waiting,
  };
};
