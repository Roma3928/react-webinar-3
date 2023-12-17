import StoreModule from "../module";

class UserState extends StoreModule {
  initState() {
    return {
      userInfo: {},
      waiting: false,
      error: "",
    };
  }

  async loadUserInfo() {
    if (!localStorage.getItem("token")) {
      return;
    }
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch("/api/v1/users/self?fields=*", {
        headers: {
          "Content-Type": "application/json",
          "X-Token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();

      if (response.ok) {
        this.setState(
          {
            userInfo: json.result,
            waiting: false,
          },
          "Загрузка данных профиля"
        );
      } else {
        this.setState({
          ...this.initState(),
          waiting: false,
          error: json.error.message,
        });
      }
    } catch (e) {
      this.setState({
        ...this.initState(),
        waiting: false,
        error: e.message,
      });
    }
  }

  resetState() {
    this.setState(
      {
        ...this.initState(),
      },
      "Сброс состояния юзера"
    );
  }
}

export default UserState;
