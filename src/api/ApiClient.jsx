import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE;
const apiPath = import.meta.env.VITE_API_PATH;

export { apiUrl, apiPath };

// 取得所有產品
export const getAllProducts = () => {
  return axios.get(`${apiUrl}/api/${apiPath}/products/all`);
};

// 取得包含產品分類、頁面的所有產品
export const getProducts = (page = 1, category = "") => {
  return axios.get(`${apiUrl}/api/${apiPath}/products`, {
    params: {
      page,
      category,
    },
  });
};

// 取得產品詳情
export const getProductDetail = (id) => {
  return axios.get(`${apiUrl}/api/${apiPath}/product/${id}`);
};
