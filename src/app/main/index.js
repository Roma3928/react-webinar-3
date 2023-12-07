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

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPages: state.catalog.totalPages,
    currentPage: state.catalog.currentPage,
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
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <>
      <Head title="Магазин" />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      {isListProductsLoading && (
        <div className="LoaderBox">
          <Loader />
        </div>
      )}
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        totalPages={select.totalPages}
        currentPage={select.currentPage}
        setPage={callbacks.setPage}
      />
    </>
  );
}

export default memo(Main);
