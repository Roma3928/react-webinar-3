import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const [modalVisibility, setModalVisibility] = useState(false);

  const callbacks = {};

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls setModalVisibility={setModalVisibility} />
      <List list={list} />
      <Modal
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
      />
    </PageLayout>
  );
}

export default App;
