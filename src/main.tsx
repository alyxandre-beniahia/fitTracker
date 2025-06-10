import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { App } from "./App";
import "./index.css";
import RegisterPage from "./pages/auth/register/register-page";
import { LoginPage } from "./pages/auth/login/login-page";
import DashboardPage from "./pages/dashboard/dashboard-page"
import AddProgress from "./pages/dashboard/addProgress"; 
import PageCompte from "./pages/dashboard/monCompte";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
    {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/dashboard/add-progress",
    element: <AddProgress />,
  },
  { 
    path: "/dashboard/monCompte",
    element: <PageCompte />,
  },
]);

const root = document.getElementById("root");

if (!root) {
  throw new Error("L'élément root n'existe pas dans le document");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
