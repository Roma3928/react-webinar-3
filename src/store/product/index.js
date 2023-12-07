import ProductService from "../../api/product-service";
import StoreModule from "../module";

class Product extends StoreModule {
  initState() {
    return {
      _id: "",
      category: {
        title: "",
      },
      description: "Описание",
      edition: 0,
      madeIn: {
        code: "",
        title: "",
      },
      price: 0,
      title: "Заголовок",
    };
  }

  async loadProduct(id) {
    const json = await ProductService.getById(id);
    this.setState(
      {
        ...this.getState(),
        _id: json.result._id,
        category: {
          title: json.result.category.title,
        },
        description: json.result.description,
        edition: json.result.edition,
        madeIn: {
          code: json.result.madeIn.code,
          title: json.result.madeIn.title,
        },
        price: json.result.price,
        title: json.result.title,
      },
      "Загрузка информацию о товаре"
    );
  }
}

export default Product;
