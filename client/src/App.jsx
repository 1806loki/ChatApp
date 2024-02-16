import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import "./App.css";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "chat",
      element: <Chat />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
