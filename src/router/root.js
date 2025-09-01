import { ClipLoader } from "react-spinners";
import ListPage from "../pages/phonecase/ListPage";
import { createBrowserRouter } from "react-router-dom";
import DetailPage from "../pages/phonecase/DetailPage";

import CartPage from "../pages/common/CartPage";
import CheckoutPage from "../pages/common/CheckoutPage";
import HomePage from "../pages/HomePage";
import APITestPage from "../pages/APITestPage";
import APITestPage2 from "../pages/APITestPage2";
import LoginPage from "../pages/common/LoginPage";
import SignupPage from "../pages/common/SignupPage";
import SignupPage2 from "../pages/common/SingupPage2";

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
    path: "phonecase/:productId",
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
  {
    path: "apiTest",
    element: <APITestPage></APITestPage>,
  },
  {
    path: "apiTest2",
    element: <APITestPage2></APITestPage2>,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "signup2",
    element: <SignupPage2 />,
  },
]);

export default root;
