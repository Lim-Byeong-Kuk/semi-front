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
import QandAComponent from "../components/phonecase/QandAComponent";
import OrderHistory from "../components/common/OrderHistory";
import ProfileEdit from "../components/common/ProfileEdit";
import MypageLayout from "../pages/common/MypageLayout";

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
    path: "qanda",
    element: <QandAComponent></QandAComponent>,
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
    path: "mypage",
    element: <MypageLayout />,
    children: [
      {
        path: "orders",
        element: <OrderHistory />,
      },
      {
        path: "profile",
        element: <ProfileEdit />,
      },
    ],
  },
]);

export default root;
