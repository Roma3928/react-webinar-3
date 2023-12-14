import StoreModule from "../module";

class UserState extends StoreModule {
  initState() {
    return {
      userInfo: {},
      waiting: false,
      error: "",
    };
  }

  async login(data) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (response.ok) {
        this.setState(
          {
            userInfo: json.result.user,
            waiting: false,
          },
          "Авторизация"
        );
        localStorage.setItem("token", json.result.token);
      } else {
        this.setState({
          ...this.getState(),
          waiting: false,
          error: json.error.message,
        });
      }
    } catch (e) {
      this.setState({
        ...this.getState(),
        waiting: false,
        error: e.message,
      });
    }
  }

  async logout() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();

      if (json.result) {
        this.setState(
          {
            ...this.initState(),
            waiting: false,
          },
          "Выход из аккаунта"
        );
        localStorage.removeItem("token");
      }
    } catch (e) {
      this.setState({
        ...this.initState(),
      });
    }
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
          "Восстановление авторизации"
        );
      } else {
        this.setState({
          ...this.initState(),
          waiting: false,
        });
      }
    } catch (e) {
      this.setState({
        ...this.initState(),
        waiting: false,
      });
    }
  }
}

export default UserState;
