import { Link } from "react-router-dom";
import { CustomerOrder } from "./cart-page-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { fetchOrders } from "../components/store/dishes/dish-slice";

export const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.restaurant.users);
  const {  orders } = useAppSelector(
    (state) => state.restaurant.dishes,
  );

  useEffect(() => {
    if (user && token) {
      dispatch(fetchOrders());
    }
  }, [dispatch, user, token]);
  
  return (
    <div className="mx-auto flex h-auto w-2/3 flex-col justify-center gap-5 p-5">
      <div className="mb-10 text-center text-4xl">Users Orders</div>
      <div className="flex gap-5">
        <Link
          className="flex w-28 items-center justify-center rounded-md bg-gray-300 p-2 transition-colors hover:bg-gray-500 hover:text-white"
          to="/"
        >
          to Home
        </Link>
        <Link
          className="flex w-28 items-center justify-center rounded-md bg-gray-300 p-2 transition-colors hover:bg-gray-500 hover:text-white"
          to="/menu"
        >
          to Menu
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-10">
        {orders.map((order) => (
          <CustomerOrder
            key={order.id}
            id={order.id}
            status={order.status}
            total_price={order.total_price}
          />
        ))}
      </div>
    </div>
  );
};
