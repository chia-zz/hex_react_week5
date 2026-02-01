import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// API
import { getProducts, getAllProducts } from "../../../api/ApiClient";
// 元件
import LoadingSpinner from "../../../components/LoadingSpinner";
import Pagination from "../../../components/Pagination";
import CategoryNav from "../../../components/CategoryNav";

function ProductList() {
  // const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  // loading spinner 設定
  const [isLoading, setIsLoading] = useState(false);
  // pagination
  const [pagination, setPagination] = useState({});
  // category
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");

  // API
  // 取得商品分類分頁資料
  const getData = async (page = 1, category = "") => {
    setIsLoading(true);
    try {
      const res = await getProducts(page, category);
      console.log("API 回傳資料:", res.data);
      setProducts(Object.values(res.data.products));
      setPagination(res.data.pagination);
    } catch (error) {
      toast.error("取得資料失敗", error);
      // navigate("/");
    } finally {
      setIsLoading(false);
    }
  };
  // 取得產品分類
  const getCategories = async () => {
    try {
      const res = await getAllProducts();
      console.log("API 回傳分類資料:", res.data);
      const allProducts = Object.values(res.data.products);
      const categoryList = [
        ...new Set(allProducts.map((item) => item.category)),
      ];
      setCategories(categoryList);
    } catch (error) {
      console.error("取得分類失敗", error);
    }
  };

  useEffect(() => {
    getData();
    getCategories();
  }, []);

  return (
    <div className="container p-5">
      {isLoading && <LoadingSpinner />}
      <ToastContainer />
      <h1 className="text-primary-800 mb-4">植感圖鑑</h1>
      <CategoryNav
        categories={categories}
        activeCategory={currentCategory}
        onChangeCategory={getCategories}
      />
      <div className="container">
        <div className="row g-3">
          {products.map((item) => (
            <div className="col-md-6 col-lg-4" key={item.id}>
              <div className="card list-card">
                <img
                  src={item.imageUrl}
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="card-body text-start">
                  <span className="badge bg-tert-700 text-sec-50 px-2 rounded-pill mb-1">
                    {item.category}
                  </span>
                  <h5 className="card-title fw-bold">{item.title}</h5>
                  <p className="card-text">
                    <span className="text-error fw-bold fs-5">
                      <span className="me-1">NT$</span>
                      {item.price}
                    </span>
                    /
                    <small>
                      <del className="text-muted">
                        {" "}
                        <span className="me-1">NT$</span>
                        {item.origin_price}
                      </del>
                    </small>
                  </p>
                  <div>
                    <a href="#" className="btn btn-primary">
                      查看更多
                    </a>
                    <a href="#" className="btn btn-primary">
                      加入購物車
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <Pagination pagination={pagination} onChangePage={getData} />
        </div>
      </div>
    </div>
  );
}

export default ProductList;
