import { formatCategories } from "../../utils";
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

      const formattedData = formatCategories(json.result.items);

      this.setState(
        {
          data: formattedData,
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
