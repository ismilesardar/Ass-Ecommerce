import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Menu from "./components/nav/Menu";
import AdminRoute from "./components/routes/AdminRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminCategory from "./pages/admin/Category";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminProduct from "./pages/admin/Product";
import AdminProducts from "./pages/admin/Products";
import AdminProductUpdate from "./pages/admin/ProductUpdate";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductView from "./pages/ProductView";
import Search from "./pages/Search";
import Shop from "./pages/Shop";
import DashBoard from "./pages/user/DashBoard";
import UsersOrders from "./pages/user/Orders";
import UsersProfile from "./pages/user/Profile";

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      404 | Page not found
    </div>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Toaster />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:slug" element={<ProductView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<DashBoard />} />
            <Route path="user/profile" element={<UsersProfile />} />
            <Route path="user/orders" element={<UsersOrders />} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/category" element={<AdminCategory />} />
            <Route path="admin/product" element={<AdminProduct />} />
            <Route path="admin/products" element={<AdminProducts />} />
            <Route
              path="admin/product/update/:slug"
              element={<AdminProductUpdate />}
            />
            <Route path="admin/orders" element={<AdminOrders />} />
          </Route>
          
          <Route path="*" element={<PageNotFound />} replace />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
