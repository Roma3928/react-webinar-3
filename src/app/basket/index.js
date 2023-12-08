import { memo, useCallback } from "react";
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/hooks/use-store";
import useSelector from "../../store/hooks/use-selector";
import translations from "../../translations";

function Basket() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentLang: state.language.lang,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(
      (_id) => store.actions.basket.removeFromBasket(_id),
      [store]
    ),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      (item, currentLang) => {
        return (
          <ItemBasket
            item={item}
            onRemove={callbacks.removeFromBasket}
            onClose={callbacks.closeModal}
            currentLang={currentLang}
          />
        );
      },
      [callbacks.removeFromBasket]
    ),
  };

  return (
    <ModalLayout
      title={translations[select.currentLang]["cart"]}
      onClose={callbacks.closeModal}
      currentLang={select.currentLang}
    >
      <List
        list={select.list}
        renderItem={renders.itemBasket}
        currentLang={select.currentLang}
      />
      <BasketTotal sum={select.sum} currentLang={select.currentLang} />
    </ModalLayout>
  );
}

export default memo(Basket);
