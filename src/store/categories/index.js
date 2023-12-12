import StoreModule from "../module";

class CategoriesState extends StoreModule {
  initState() {
    return {
      data: [],
      waiting: false,
    };
  }

  /**
   * Загрузка категорий
   * @return {Promise<void>}
   */
  async load() {
    this.setState({
      data: [],
      waiting: true,
    });

    try {
      const response = await fetch(
        "/api/v1/categories?fields=_id,title,parent(_id)&limit=*"
      );
      const json = await response.json();

      this.setState(
        {
          data: json.result.items,
          waiting: false,
        },
        "Загружены категории"
      );
    } catch (e) {
      this.setState({
        data: {},
        waiting: false,
      });
    }
  }
}

export default CategoriesState;
