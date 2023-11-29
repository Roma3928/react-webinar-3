import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление в корзину
   *  @param obj {Object}
   */
  addItemToCart(obj) {
    const findItem = this.state.cart.find((item) => item.code === obj.code);
    if (findItem) {
      findItem.count++;
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...obj, count: 1 }],
      });
    }

    this.calculateTotalPrice();
  }

  /**
   * Удаление по коду
   * @param code
   */
  deleteItemFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((item) => item.code !== code),
    });

    this.calculateTotalPrice();
  }

  /**
   * Расчет общей цены
   * @returns {Number}
   */
  calculateTotalPrice() {
    this.setState({
      ...this.state,
      totalPrice: this.state.cart.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0),
    });
  }
}

export default Store;
