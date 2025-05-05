import { JSX } from "react";
import { useAppSelector } from "../../app/hooks";
import { Navigate } from "react-router-dom";

interface IProtectedRoute {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: IProtectedRoute) => {
  const user = useAppSelector((state) => state.restaurant.users.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
