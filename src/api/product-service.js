const API_URL = "/api/v1/articles";

export default class ProductService {
  static async getAll(skip = 10, limit = 0) {
    const response = await fetch(
      `${API_URL}?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`
    );
    return response.json();
  }

  static async getById(id) {
    const response = await fetch(
      `${API_URL}/${id}?fields=*,madeIn(title,code),category(title)`
    );
    return response.json();
  }
}
