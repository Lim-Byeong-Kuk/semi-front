import { ClipLoader } from "react-spinners";
import ListPage from "../pages/phonecase/ListPage";
import { createBrowserRouter } from "react-router-dom";
import DetailPage from "../pages/phonecase/DetailPage";

import CartPage from "../pages/phonecase/CartPage";
import CheckoutPage from "../pages/common/CheckoutPage";
import HomePage from "../pages/HomePage";

const root = createBrowserRouter([
  {
    path: "",
    element: <HomePage></HomePage>,
  },
  {
    path: "phonecase",
    element: <ListPage></ListPage>,
  },
  {
    path: "detail",
    element: <DetailPage></DetailPage>,
  },
  {
    path: "cart",
    element: <CartPage></CartPage>,
  },
  {
    path: "checkout",
    element: <CheckoutPage></CheckoutPage>,
  },
]);

export default root;
