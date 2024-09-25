import React from "react";
import Navbar from './components/Navbar';
import {
  Outlet,
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import './App.css';
import CafesPage from "./pages/CafesPage";
import UpdateCafesPage from "./pages/UpdateCafesPage";
import EmployeesPage from './pages/EmployeesPage';
import UpdateEmployeesPage from './pages/UpdateEmployeesPage';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Outlet />
    </>
  ),
});

// Routes
const cafesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CafesPage,
});

const addCafeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/add-cafe",
  component: UpdateCafesPage,
});

const editCafeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/edit-cafe/$id",
  component: UpdateCafesPage,
});

const employeesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/employees',
  component: EmployeesPage,
});

const addEmployeeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/add-employee',
  component: UpdateEmployeesPage,
});

const editEmployeeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/edit-employee/$id',
  component: UpdateEmployeesPage,
});

const routeTree = rootRoute.addChildren([
  cafesRoute,
  addCafeRoute,
  editCafeRoute,
  employeesRoute,
  addEmployeeRoute,
  editEmployeeRoute,
]);

// Create the router
const router = createRouter({ routeTree });

function App() {
  return <RouterProvider router={router} />;
}

export default App;
