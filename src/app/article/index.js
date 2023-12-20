import { memo, useCallback, useMemo, useState } from "react";
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
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import useSelector from "../../hooks/use-selector";

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();
  const [activeReplyId, setActiveReplyId] = useState(null);

  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const selectRedux = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.items,
      commentsCount: state.comments.count,
    }),
    shallowequal
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const select = useSelector((state) => ({
    exists: state.session.exists,
    userName: state.session.user.profile?.name,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    addComment: useCallback(
      (text) => {
        const parent = activeReplyId
          ? { _id: activeReplyId, _type: "comment" }
          : { _id: params.id, _type: "article" };

        dispatch(
          commentsActions.addComment(
            {
              text,
              parent,
            },
            select.userName
          )
        );
      },
      [dispatch, select.userName, activeReplyId]
    ),
  };

  const options = {
    comments: useMemo(
      () =>
        [
          ...treeToList(listToTree(selectRedux.comments), (item, level) => ({
            ...item,
            level: level - 1,
          })),
        ].slice(1),
      [selectRedux.comments]
    ),
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={selectRedux.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={selectRedux.waiting}>
        <ArticleCard
          article={selectRedux.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
      <Comments
        items={options.comments}
        count={selectRedux.commentsCount}
        t={t}
        exists={select.exists}
        addComment={callbacks.addComment}
        activeReplyId={activeReplyId}
        setActiveReplyId={setActiveReplyId}
      />
    </PageLayout>
  );
}

export default memo(Article);
