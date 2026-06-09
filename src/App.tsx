import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Inspirations from "./pages/Inspirations";
import Games from "./pages/Games";
import Music from "./pages/Music";
import Profile from "./pages/Profile";
import Progress from "./pages/Progress";
import Auth from "./pages/Auth";
import Settings from "./pages/Settings";
import Pricing from "./pages/Pricing";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "inspirations", element: <Inspirations /> },
      { path: "games", element: <Games /> },
      { path: "music", element: <Music /> },
      { path: "profile", element: <Profile /> },
      { path: "progress", element: <Progress /> },
      { path: "auth", element: <Auth /> },
      { path: "settings", element: <Settings /> },
      { path: "pricing", element: <Pricing /> },
      { path: "admin", element: <Admin /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
