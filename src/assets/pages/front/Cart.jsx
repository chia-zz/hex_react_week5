import { useState, useEffect } from "react";
import { toast } from "react-toastify";
// API
import {
  getCart,
  editCart,
  deleteCart,
  deleteAllCart,
} from "../../../api/ApiClient";
// 元件
import LoadingSpinner from "../../../components/LoadingSpinner";

function Cart() {
  const [cartItem, setCartItem] = useState([]);
  // 金額
  const [total, setTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 取得購物車內容
  const getAllCart = async () => {
    setIsLoading(true);
    try {
      const res = await getCart();
      console.log("購物車 API 回傳:", res.data);
      setCartItem(res.data.data.carts);
      setTotal(res.data.data.total);
      setFinalTotal(res.data.data.final_total);
    } catch (error) {
      console.error("購物車內容載入失敗", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 修改購物車內容
  const updateCartItem = async (item, qty) => {
    if (qty === 0) {
      const isConfirm = window.confirm("確定要移除該商品嗎？");
      if (isConfirm) {
        removeCartItem(item.id);
      }
      return;
    }
    setIsLoading(true);
    try {
      await editCart(item.id, item.product_id, qty);
      toast.success("數量已更新");
      getAllCart();
    } catch (error) {
      console.error("更新失敗", error);
      toast.error("更新失敗");
      setIsLoading(false);
    }
  };

  // 刪除一項
  const removeCartItem = async (cartId) => {
    setIsLoading(true);
    try {
      const isConfirm = window.confirm("確定要移除該商品嗎？");
      if (isConfirm) {
        await deleteCart(cartId);
        toast.success("已刪除該商品");
        getAllCart();
      }
    } catch (error) {
      console.error("刪除失敗", error);
      setIsLoading(false);
    }
  };

  // 刪除全部
  const clearCart = async () => {
    setIsLoading(true);
    try {
      const isConfirm = window.confirm("確定要清空購物車嗎？");
      if (isConfirm) {
        await deleteAllCart();
        toast.success("購物車已清空");
        getAllCart();
      }
    } catch (error) {
      console.error("清空失敗", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCart();
  }, []);

  return (
    <>
      <div className="container my-3">
        {isLoading && <LoadingSpinner />}
        <h1 className="text-start text-sec-600 mb-4">
          <i className="bi bi-handbag me-1"></i>Your Bag
        </h1>

        {/* 先判斷購物車裡有沒有東西 */}
        {cartItem.length === 0 ? (
          <div className="text-error text-start fs-4">購物車目前沒有商品</div>
        ) : (
          <div className="row">
            <div className="col-12 col-md-8 text-end">
              <button
                type="button"
                className="btn btn-error mb-3 me-4"
                onClick={() => clearCart()}
              >
                刪除全部
              </button>
            </div>
            <div className="col-md-8">
              <table className="table table-striped table-hover align-middle">
                <thead className="fs-5">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Products</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItem.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>{item.product.title}</td>
                      <td>
                        <div className="d-flex justify-content-evenly align-items-center">
                          <button
                            className="btn btn-outline-primary border-0"
                            type="button"
                            onClick={() => updateCartItem(item, item.qty - 1)}
                          >
                            <i className="bi bi-dash-circle"></i>
                          </button>
                          <span>
                            <strong className="fs-3 text-success mx-2">
                              {item.qty}
                            </strong>
                          </span>
                          <button
                            className="btn btn-outline-primary border-0"
                            type="button"
                            onClick={() => updateCartItem(item, item.qty + 1)}
                          >
                            <i className="bi bi-plus-circle"></i>
                          </button>
                        </div>
                      </td>
                      <td>NT$ {item.total}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removeCartItem(item.id)}
                        >
                          <i className="bi bi-trash"></i> 刪除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="col-md-4 text-sec-600">
              <h3>Order Summary</h3>
              <hr />
              <div className="d-flex flex-column gap-2">
                <h5 className="d-flex px-3">
                  商品小計
                  <span className="ms-auto">
                    NT$<span className="fw-bold ms-1">{total}</span>
                  </span>
                </h5>
                <h5 className="d-flex px-3">
                  運費
                  <span className="ms-auto">
                    <span className="text-error fw-bold me-1">
                      <span className="me-1">NT$</span>0
                    </span>
                    /
                    <small className="ms-1">
                      <del className="text-muted">
                        <span className="me-1">NT$</span>
                        60
                      </del>
                    </small>
                  </span>
                </h5>
              </div>
              <hr />
              <h3 className="d-flex px-3">
                商品總計
                <span className="ms-auto">
                  NT$<span className="fw-bold ms-1">{finalTotal}</span>
                </span>
              </h3>
              <button
                type="button"
                className="mt-3 mx-2 w-100 fs-5 btn btn-primary"
              >
                前往結帳
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Cart;
