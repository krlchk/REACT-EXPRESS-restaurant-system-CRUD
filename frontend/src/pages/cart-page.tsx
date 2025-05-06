import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  createOrder,
  fetchOrders,
  resetCart,
} from "../components/store/dishes/dish-slice";
import { useEffect } from "react";
import { CartItem, CustomerOrder } from "./cart-page-components";

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.restaurant.users);
  const { cartDishes, orders } = useAppSelector(
    (state) => state.restaurant.dishes,
  );

  useEffect(() => {
    if (user && token) {
      dispatch(fetchOrders());
    }
  }, [dispatch, user, token]);

  const isUserOrder = orders.some((order) => order.user_id === user?.id);
  const userOrders = orders.filter((order) => order.user_id === user?.id);
  const subtotal = cartDishes.reduce(
    (acc, dish) => acc + dish.dish.price * dish.amount,
    0,
  );

  const handleCreateOrder = async () => {
    const resultAction = await dispatch(
      createOrder({
        user_id: user?.id,
        dishes: cartDishes,
        total_price: subtotal,
        status: "pending",
      }),
    );
    if (createOrder.fulfilled.match(resultAction)) {
      dispatch(resetCart());
      dispatch(fetchOrders());
    } else {
      console.error("Order creation failed:", resultAction);
    }
  };

  return (
    <div className="mx-auto flex h-auto w-2/3 flex-col justify-center gap-5 p-5">
      <p className="mb-10 text-center text-4xl">
        Customer<span className="font-bold"> {user?.name}</span> cart{" "}
      </p>
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
      <div className="border border-black p-5">
        <p className="mb-5 text-center text-3xl">Your Orders:</p>
        {isUserOrder ? (
          <div className="grid grid-cols-3 gap-10">
            {userOrders.map((order) => (
              <CustomerOrder
                key={order.id}
                id={order.id}
                status={order.status}
                total_price={order.total_price}
              />
            ))}
          </div>
        ) : null}
      </div>
      <div className="text-2xl">
        Total cart price:{" "}
        <span className="font-bold text-green-700">{subtotal} $</span>
      </div>
      {cartDishes.length === 0 ? null : (
        <button
          onClick={handleCreateOrder}
          className="flex w-40 items-center justify-center rounded-md bg-yellow-300 p-2 transition-colors hover:bg-yellow-500 hover:text-white"
        >
          Confirm order
        </button>
      )}

      <div className="grid grid-cols-3 gap-10">
        {cartDishes.map((dish) => (
          <CartItem
            key={dish.dish.id}
            id={dish.dish.id}
            amount={dish.amount}
            name={dish.dish.name}
            price={dish.dish.price}
          />
        ))}
      </div>
    </div>
  );
};
