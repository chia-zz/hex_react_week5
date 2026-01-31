import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// API
import {
  getAdminProducts,
  checkUserLogin,
  deleteProduct,
  adminLogout,
} from "../../../api/ApiAdmin";
// 元件
import LoadingSpinner from "../../../components/LoadingSpinner";
import Pagination from "../../../components/Pagination";

function AdmProducts() {
  const navigate = useNavigate();

  // 新增商品格式
  // const addNewProduct = {
  //   title: "",
  //   category: "",
  //   origin_price: 0,
  //   price: 0,
  //   unit: "",
  //   description: "",
  //   content: "",
  //   is_enabled: 1,
  //   imageUrl: "",
  //   imagesUrl: [],
  // };

  const [products, setProducts] = useState([]);
  // const [tempProduct, setTempProduct] = useState(addNewProduct); // 之前是 null 但現在要存資料的格式
  // loading spinner 設定
  const [isLoading, setIsLoading] = useState(false);
  // pagination
  const [pagination, setPagination] = useState({});

  // API
  // 取得商品資料
  const getData = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await getAdminProducts(page);
      setProducts(Object.values(res.data.products));
      setPagination(res.data.pagination);
    } catch (error) {
      toast.error("取得資料失敗", error);
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };
  // 檢查登入狀態
  const checkLogin = async () => {
    setIsLoading(true);
    try {
      const res = await checkUserLogin();
      // toast.success("登入成功", res.data);
      return true;
    } catch (error) {
      toast.error("檢查失敗，請確認是否登入", error);
      navigate("/");
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    if (!token) {
      toast.error("您尚未登入");
      navigate("/");
      return;
    }

    axios.defaults.headers.common["Authorization"] = token;
    const isAuth = async () => {
      const isValid = await checkLogin();
      if (isValid) {
        getData();
      }
    };
    isAuth();
  }, []);

  const handleLogout = () => {
    try {
      const res = adminLogout();
      document.cookie = "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      axios.defaults.headers.common["Authorization"] = "";
      toast.success("成功登出", res.data);
      navigate("/");
    } catch (error) {
      toast.error("發生錯誤", error);
      navigate("/");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteProduct(id);
      toast.success("刪除成功", res.data);
      getData();
    } catch (error) {
      toast.error("刪除失敗", error);
    }
  };
  // const handleUpload = async (e) => {
  //   const file = e.target.files?.[0];
  //   // 如果沒有檔案
  //   if (!file) {
  //     return;
  //   }
  //   // 限制檔案大小
  //   if (file.size > 3 * 1024 * 1024) {
  //     toast.error("檔案不能超過 3MB");
  //     return;
  //   }
  //   try {
  //     const formData = new FormData();
  //     formData.append("file-to-upload", file);
  //     const res = await uploadImage(formData);
  //     toast.success("上傳成功");
  //     setTempProduct((pre) => ({
  //       ...pre,
  //       imageUrl: res.data.imageUrl,
  //     }));
  //   } catch (error) {
  //     toast.error("上傳失敗", error);
  //   }
  // };

  // 多張圖片
  // const handleImageChange = (index, value) => {
  //   setTempProduct((pre) => {
  //     const newImages = [...pre.imagesUrl]; // 複製新陣列
  //     newImages[index] = value; // 修改指定位置的值
  //     return { ...pre, imagesUrl: newImages }; // 更新回去
  //   });
  // };
  // 新增多圖的圖片
  // const handleAddImage = () => {
  //   setTempProduct((pre) => {
  //     const newImages = [...pre.imagesUrl, ""]; // 原始陣列 + 一個空字串
  //     return { ...pre, imagesUrl: newImages };
  //   });
  // };
  // 刪除多圖的圖片
  // const handleRemoveImage = () => {
  //   setTempProduct((prev) => {
  //     const newImages = [...prev.imagesUrl];
  //     newImages.pop();
  //     return { ...prev, imagesUrl: newImages };
  //   });
  // };

  return (
    <div className="container p-5">
      {isLoading && <LoadingSpinner />}
      <ToastContainer />
      <h1 className="text-sec-500 mb-4">產品列表</h1>

      <div className="mb-3 d-flex gap-2">
        <button className="btn btn-success" onClick={getData}>
          <i className="bi bi-arrow-clockwise me-1"></i>重整資料
        </button>
        <button className="btn btn-warning" onClick={checkLogin}>
          <i className="bi bi-person-check me-1"></i>驗證登入狀態
        </button>
        <button className="btn btn-primary">
          <i className="bi bi-plus-lg me-1"></i>建立新的商品
        </button>
        <button className="btn btn-danger ms-auto" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right me-1"></i>登出
        </button>
      </div>

      <div className="table-responsive-lg">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>產品名稱</th>
              <th>原價</th>
              <th>售價</th>
              <th>是否啟用</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.origin_price}</td>
                <td>{item.price}</td>
                <td>
                  {item.is_enabled ? (
                    <span className="text-success">啟用</span>
                  ) : (
                    <span className="text-danger">未啟用</span>
                  )}
                </td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2">
                    查看內容
                  </button>
                  <button className="btn btn-sm btn-outline-success me-2">
                    編輯
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination pagination={pagination} onChangePage={getData} />
      </div>
    </div>
  );
}

export default AdmProducts;
