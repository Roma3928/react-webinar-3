import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/hooks/use-store";
import { useFetching } from "../../store/hooks/use-fetching";
import useSelector from "../../store/hooks/use-selector";
import Pagination from "../../components/pagination";
import Loader from "../../components/ui/loader";
import translations from "../../translations";

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPages: state.catalog.totalPages,
    currentPage: state.catalog.currentPage,
    currentLang: state.language.lang,
  }));

  const [fetchListProducts, isListProductsLoading, listProductsError] =
    useFetching(async () => {
      store.actions.catalog.load();
    });

  useEffect(() => {
    fetchListProducts();
  }, [select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    setPage: useCallback(
      (page) => store.actions.catalog.setPage(page),
      [store]
    ),
    setLang: useCallback(
      (lang) => store.actions.language.setLang(lang),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item, currentLang) => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            currentLang={currentLang}
          />
        );
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <>
      <Head
        title={translations[select.currentLang]["store"]}
        setLang={callbacks.setLang}
        currentLang={select.currentLang}
      />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        currentLang={select.currentLang}
      />
      {isListProductsLoading && (
        <div className="LoaderBox">
          <Loader />
        </div>
      )}
      <List
        list={select.list}
        renderItem={renders.item}
        currentLang={select.currentLang}
      />
      <Pagination
        totalPages={select.totalPages}
        currentPage={select.currentPage}
        setPage={callbacks.setPage}
      />
    </>
  );
}

export default memo(Main);
