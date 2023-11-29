import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalPrice = store.getState().totalPrice;
  const [modalVisibility, setModalVisibility] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItemFromCart(code);
      },
      [store]
    ),

    onAddItem: useCallback(
      (obj) => {
        store.addItemToCart(obj);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        totalPrice={totalPrice}
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        cart={cart}
      />
      <List list={list} onAddItem={callbacks.onAddItem} />
      <Cart
        cart={cart}
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        onDeleteItem={callbacks.onDeleteItem}
        totalPrice={totalPrice}
      />
    </PageLayout>
  );
}

export default App;
