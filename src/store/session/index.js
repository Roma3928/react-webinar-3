import StoreModule from "../module";

class SessionState extends StoreModule {
  initState() {
    return {
      userInfo: {
        name: "",
      },
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
            userInfo: {
              name: json.result.user.profile.name,
            },
            waiting: false,
            error: "",
          },
          "Авторизация"
        );
        localStorage.setItem("token", json.result.token);
      } else {
        this.setState({
          ...this.getState(),
          waiting: false,
          error: json.error.data?.issues[0].message,
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
            userInfo: {
              name: json.result.profile.name,
            },
            waiting: false,
            error: "",
          },
          "Восстановление авторизации"
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
      "Сброс состояния сессии"
    );
  }
}

export default SessionState;
