import useSelector from "./use-selector";

export const useAuth = () => {
  const { userInfo, error, waiting } = useSelector((state) => state.user);

  return {
    isAuth: !!localStorage.getItem("token"),
    userInfo,
    error,
    waiting,
  };
};
