import { memo, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import shallowequal from "shallowequal";
import articleActions from "../../store-redux/article/actions";
import commentsActions from "../../store-redux/comments/actions";
import Comments from "../../components/comments";
import SideLayout from "../../components/side-layout";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import useSelector from "../../hooks/use-selector";

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.items,
      commentsCount: state.comments.count,
    }),
    shallowequal
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const exists = useSelector((state) => state.session.exists);

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    addComment: useCallback(
      (text) =>
        dispatch(
          commentsActions.addNewComment({
            text,
            parent: { _id: params.id, _type: "article" },
          })
        ),
      [dispatch]
    ),
  };

  // const options = {
  //   comments: useMemo(
  //     () => [
  //       ...treeToList(listToTree(select.comments), (item, level) => ({
  //         ...item,
  //         value: item._id,
  //         text: "- ".repeat(level) + item.text,
  //       })),
  //     ],
  //     [select.comments]
  //   ),
  // };

  // console.log(options.comments);

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
      <SideLayout padding="large">
        <Comments
          items={select.comments}
          count={select.commentsCount}
          t={t}
          exists={exists}
          addComment={callbacks.addComment}
        />
      </SideLayout>
    </PageLayout>
  );
}

export default memo(Article);
