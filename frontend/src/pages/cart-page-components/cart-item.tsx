import { useAppDispatch } from "../../app/hooks";
import { removeFromCart, setNewAmount } from "../../components/store/dishes/dish-slice";

interface ICartItem {
  id: number;
  amount: number;
  name: string;
  price: number;
}

export const CartItem = ({ id, amount, name, price }: ICartItem) => {
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
