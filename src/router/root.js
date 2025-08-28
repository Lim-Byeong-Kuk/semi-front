import { ClipLoader } from "react-spinners";
import ListPage from "../pages/phonecase/ListPage";
import { createBrowserRouter } from "react-router-dom";
import DetailPage from "../pages/phonecase/DetailPage";

const root = createBrowserRouter([
  {
    path: "phonecase",
    element: <ListPage></ListPage>,
  },
  {
    path: "detail",
    element: <DetailPage></DetailPage>,
  },
]);

export default root;
