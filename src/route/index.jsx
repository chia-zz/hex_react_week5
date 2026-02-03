import { createHashRouter } from "react-router-dom";
import App from "../App.jsx";
// Layouts
import FrontLayout from "../assets/layout/FrontLayout.jsx";
import AdminLayout from "../assets/layout/AdminLayout.jsx";
// 前台
import Home from "../assets/pages/front/Home.jsx";
import Product from "../assets/pages/front/ProductList.jsx";
import ProductDetail from "../assets/pages/front/ProductDetail.jsx";
import Cart from "../assets/pages/front/Cart.jsx";
import NotFound404 from "../assets/pages/front/NotFound404.jsx";
// 後台
import AdmLogin from "../assets/pages/admin/AdmLogin.jsx";
// import AdmDashboard from "../assets/pages/admin/AdmDashboard.jsx";
import AdmProducts from "../assets/pages/admin/AdmProducts.jsx";
import AdmNotFound404 from "../assets/pages/admin/AdmNotFound404.jsx";

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 前台
      {
        path: "/",
        element: <FrontLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "product", element: <Product /> },
          { path: "product/:id", element: <ProductDetail /> },
          { path: "cart", element: <Cart /> },
          { path: "*", element: <NotFound404 /> },
        ],
      }, // 後台登入頁
      {
        path: "/admin/login",
        element: <AdmLogin />,
      },
      // 後台
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdmProducts /> },
          { path: "products", element: <AdmProducts /> },
          { path: "*", element: <AdmNotFound404 /> },
        ],
      },
    ],
  },
]);

export default router;
