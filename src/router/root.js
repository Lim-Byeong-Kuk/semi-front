import { ClipLoader } from "react-spinners";
import ListPage from "../pages/phonecase/ListPage";
import { createBrowserRouter } from "react-router-dom";

const root = createBrowserRouter([
  {
    path: "phonecase",
    element: <ListPage></ListPage>,
  },
]);

export default root;
