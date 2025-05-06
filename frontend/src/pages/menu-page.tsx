import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchDishes } from "../components/store/dishes/dish-slice";
import { openModal } from "../components/store/ui/ui-slice";
import { Link } from "react-router-dom";
import { MenuItem, ModalWindow } from "./menu-page-components";

export const MenuPage = () => {
  const dispatch = useAppDispatch();
  const { dishes, status } = useAppSelector((state) => state.restaurant.dishes);
  const { user, token } = useAppSelector((state) => state.restaurant.users);
  const { isModalOpen } = useAppSelector((state) => state.restaurant.ui);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (status === "idle" && user && token) {
      dispatch(fetchDishes());
    }
  }, [dishes, dispatch, status, user, token]);

  return (
    <div className="mx-auto flex h-auto w-2/3 flex-col justify-center gap-5 p-5">
      <div className="mb-10 text-center text-4xl">Our menu</div>
      <div className="flex gap-5">
        <Link
          className="flex w-28 items-center justify-center rounded-md bg-gray-300 p-2 transition-colors hover:bg-gray-500 hover:text-white"
          to="/"
        >
          to Home
        </Link>
        {user?.role === "admin" ? (
          <Link
            className="flex w-28 items-center justify-center rounded-md bg-gray-300 p-2 transition-colors hover:bg-gray-500 hover:text-white"
            to="/orders"
          >
            to Orders
          </Link>
        ) : (
          <Link
            className="flex w-28 items-center justify-center rounded-md bg-gray-300 p-2 transition-colors hover:bg-gray-500 hover:text-white"
            to="/cart"
          >
            to Cart
          </Link>
        )}
      </div>

      {user?.role === "admin" ? (
        <button
          onClick={() => dispatch(openModal())}
          className="mt-2 w-full border bg-green-500 p-2 font-semibold text-white transition-colors hover:bg-green-700"
        >
          Create dish
        </button>
      ) : null}
      <div className="grid grid-cols-3 gap-10">
        {dishes.map((dish) => (
          <MenuItem
            key={dish.id}
            id={dish.id}
            price={dish.price}
            description={dish.description}
            name={dish.name}
          />
        ))}
      </div>
      {isModalOpen ? <ModalWindow /> : null}
    </div>
  );
};
