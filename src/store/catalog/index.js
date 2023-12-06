import ProductService from "../../api/product-service";
import { getTotalPages } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      totalPages: 0,
      limit: 10,
    };
  }

  async load() {
    try {
      const { currentPage, limit } = this.getState();
      const skip = (currentPage - 1) * limit;
      const json = await ProductService.getAll(skip, limit);
      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
          totalPages: getTotalPages(json.result?.count, limit),
        },
        "Загружены товары из АПИ"
      );
    } catch (e) {
      console.error(e);
    }
  }

  setPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page,
    });
  }
}

export default Catalog;
