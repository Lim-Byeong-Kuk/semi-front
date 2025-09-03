import { LoginProvider } from "./api/context/LoginContext";
import root from "./router/root";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <LoginProvider>
      <RouterProvider router={root}></RouterProvider>
    </LoginProvider>
  );
}

export default App;
