import { createHashRouter } from "react-router-dom";
import App from "../App.jsx";
// 前台
import Home from "../assets/pages/front/Home.jsx";
import Product from "../assets/pages/front/ProductList.jsx";
import ProductDetail from "../assets/pages/front/ProductDetail.jsx";
import Cart from "../assets/pages/front/Cart.jsx";
import NotFound404 from "../assets/pages/front/NotFound404.jsx";
// 後台
import Login from "../assets/pages/admin/AdmLogin.jsx";
import AdmDashboard from "../assets/pages/admin/AdmDashboard.jsx";
import AdmProducts from "../assets/pages/admin/AdmProducts.jsx";
import AdmNotFound404 from "../assets/pages/admin/AdmNotFound404.jsx";

const routes = [
  // 前台
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "product", element: <Product /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "*", element: <NotFound404 /> },
    ],
  },
  // 後台登入頁
  {
    path: "/admin/login",
    element: <Login />,
  },
  // 後台
  {
    path: "/admin",
    element: <AdmDashboard />,
    children: [
      { path: "products", element: <AdmProducts /> },
      { path: "*", element: <AdmNotFound404 /> },
    ],
  },
];

const router = createHashRouter(routes);

export default router;
