import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addToCart,
  deleteDish,
  fetchDishes,
} from "../../components/store/dishes/dish-slice";
import { useNavigate } from "react-router-dom";

interface IMenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

export const MenuItem = ({ id, name, description, price }: IMenuItem) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.restaurant.users);
  const [amount, setAmount] = useState(1);
  const navigate = useNavigate();

  const handleClick = async () => {
    const resultThunk = await dispatch(deleteDish({ id }));
    if (deleteDish.fulfilled.match(resultThunk)) {
      dispatch(fetchDishes());
    }
  };

  const handleAddToCatr = () => {
    dispatch(
      addToCart({
        amount: amount,
        dish: {
          id: id,
          name: name,
          description: description,
          price: price,
        },
      }),
    );
    setAmount(1);
    navigate("/cart");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 border border-black p-3">
      <h1 className="text-xl text-center font-bold">{name}</h1>
      <p className="text-center text-lg">{description}</p>
      <p className="text-lg font-bold text-green-700">{price} $</p>
      {user?.role === "customer" ? (
        <div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                if (amount >= 2) setAmount((lastAmount) => lastAmount - 1);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black bg-slate-200 font-bold transition-colors hover:bg-slate-300"
            >
              -
            </button>
            <p className="text-xl">{amount}</p>
            <button
              onClick={() => setAmount((lastAmount) => lastAmount + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black bg-slate-200 font-bold transition-colors hover:bg-slate-300"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCatr}
            className="mt-2 w-full border border-black bg-slate-200 p-2 transition-colors hover:bg-slate-300"
          >
            Add to cart
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleClick}
            className="mt-2 w-full border bg-red-500 p-2 font-semibold text-white transition-colors hover:bg-red-900"
          >
            Delete dish
          </button>
        </div>
      )}
    </div>
  );
};
