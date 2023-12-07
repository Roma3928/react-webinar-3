import { memo, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Head from "../../components/head";
import { useFetching } from "../../store/hooks/use-fetching";
import useStore from "../../store/hooks/use-store";
import useSelector from "../../store/hooks/use-selector";
import Loader from "../../components/ui/loader";
import ProductCard from "../../components/product-card";
import BasketTool from "../../components/basket-tool";

function ProductPage() {
  const store = useStore();
  const { id } = useParams();

  const select = useSelector((state) => ({
    product: state.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const [fetchProduct, isProductLoading, productError] = useFetching(
    async () => {
      store.actions.product.loadProduct(id);
    }
  );

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const callbacks = {
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };

  return (
    <>
      <Head title={select.product.title} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      {isProductLoading && (
        <div className="LoaderBox">
          <Loader />
        </div>
      )}
      <ProductCard item={select.product} onAction={callbacks.addToBasket} />
    </>
  );
}

export default memo(ProductPage);