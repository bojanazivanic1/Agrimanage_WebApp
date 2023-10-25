import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { isAuthenticated } from "../util/auth";

const Login = lazy(() => import("../components/Login/Login"));
const Register = lazy(() => import("../components/Register/Register"));
const ResetPassword = lazy(() => import("../components/ResetPassword/ResetPassword"));
const Dashboard = lazy(() => import("../components/Dashboard/Dashboard"));
const ParcelDetails = lazy(() => import("../components/ParcelDetails/ParcelDetails"));
const AddParcel = lazy(() => import("../components/ParcelDetails/AddParcel"));
const UpdateParcel = lazy(() => import("../components/ParcelDetails/UpdateParcel"));
const UpdateOperaion = lazy(() => import("../components/Dashboard/UpdateOperation"));
const AddOperation = lazy(() => import("../components/ParcelDetails/AddOperation"));

const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/parcel/:id" element={<ParcelDetails />} />
        <Route path="/add-parcel" element={<AddParcel />} />
        <Route path="/update-parcel/:id" element={<UpdateParcel />} />
        <Route path="/update-operation/:id" element={<UpdateOperaion />} />
        <Route path="/add-operation/:id" element={<AddOperation />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;