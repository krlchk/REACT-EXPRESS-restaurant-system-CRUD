import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  removeFromCart,
  setNewAmount,
} from "../components/store/dishes/dish-slice";

export const CartPage = () => {
  const { user } = useAppSelector((state) => state.restaurant.users);
  const { cartDishes } = useAppSelector((state) => state.restaurant.dishes);

  const subtotal = cartDishes.reduce(
    (acc, dish) => acc + dish.dish.price * dish.amount,
    0,
  );

  return (
    <div className="mx-auto flex h-auto w-2/3 flex-col justify-center gap-5 p-5">
      <p className="mb-10 text-center text-4xl">
        {user?.role === "admin" ? "Admin" : "Customer"}{" "}
        <span className="font-bold">{user?.name}</span> cart{" "}
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
        <Link
          className="flex w-28 items-center justify-center rounded-md bg-gray-300 p-2 transition-colors hover:bg-gray-500 hover:text-white"
          to="/cart"
        >
          to Cart
        </Link>
      </div>
      <div className="text-2xl">
        Total cart price:{" "}
        <span className="font-bold text-green-700">{subtotal} $</span>
      </div>
      {cartDishes.length === 0 ? null : (
        <button className="flex w-40 items-center justify-center rounded-md bg-yellow-300 p-2 transition-colors hover:bg-yellow-500 hover:text-white">
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

interface ICartItem {
  id: number;
  amount: number;
  name: string;
  price: number;
}

const CartItem = ({ id, amount, name, price }: ICartItem) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col items-center justify-center gap-5 border border-black p-3">
      <h1 className="text-xl">
        amount: <span className="font-bold">{amount}</span>
      </h1>
      <p className="text-center text-lg">{name}</p>
      <p className="text-lg">
        Total price:{" "}
        <span className="font-bold text-green-700">{amount * price} $</span>
      </p>

      <div className="flex flex-col items-center justify-center gap-3">
        <button
          onClick={() => {
            amount = amount + 1;
            dispatch(setNewAmount({ id, amount }));
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black bg-slate-200 font-bold transition-colors hover:bg-slate-300"
        >
          +
        </button>
        {amount > 1 ? (
          <button
            onClick={() => {
              amount = amount - 1;
              dispatch(setNewAmount({ id, amount }));
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black bg-slate-200 font-bold transition-colors hover:bg-slate-300"
          >
            -
          </button>
        ) : (
          <button
            onClick={() => dispatch(removeFromCart(id))}
            className="mt-2 w-full border bg-red-500 p-2 transition-colors hover:bg-red-700"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};
