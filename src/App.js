import root from "./router/root";
import { RouterProvider } from "react-router-dom";

function App() {
  return <RouterProvider router={root}></RouterProvider>;
}

export default App;
