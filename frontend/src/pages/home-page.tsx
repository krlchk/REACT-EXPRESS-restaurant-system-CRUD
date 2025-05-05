import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setUserReset } from "../components/store/users/user-slice";
import { setDishesReset } from "../components/store/dishes/dish-slice";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.restaurant.users);
  return (
    <div className="flex flex-col gap-5 p-9">
      <div className="text-4xl">RESTAURANT</div>
      <p className="text-3xl">
        Your name is: <span className="font-bold">{user?.name}</span>{" "}
      </p>
      <p className="text-3xl">
        Your email is: <span className="font-bold">{user?.email}</span>
      </p>
      <p className="text-3xl">
        Your role is: <span className="font-bold">{user?.role}</span>
      </p>
      <div className="flex gap-5">
        <button
          onClick={() => {
            dispatch(setUserReset());
            dispatch(setDishesReset());
          }}
          className="flex w-28 items-center justify-center rounded-md bg-red-400 p-2 transition-colors hover:bg-red-800 hover:text-white"
        >
          Logout
        </button>
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
    </div>
  );
};
