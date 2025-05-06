import { useAppSelector } from "../../app/hooks";

interface ICustomerOrder {
  id: number;
  status: string;
  total_price: number;
}

export const CustomerOrder = ({ id, status, total_price }: ICustomerOrder) => {
  const { user } = useAppSelector((state) => state.restaurant.users);

  return (
    <div className="flex flex-col items-center justify-center gap-5 border border-black p-3">
      <h1 className="text-xl">
        Your order № <span className="font-bold">{id}</span>
      </h1>
      <p className="text-center text-lg">
        Status: <span className="font-bold">{status}</span>
      </p>
      <p className="text-lg">
        Total price:{" "}
        <span className="font-bold text-green-700">{total_price} $</span>
      </p>
      {user?.role === "admin" ? (
        <div className="mt-2 flex flex-col gap-2">
          <p className="text-xl font-bold">Change status on</p>
          <button className="flex w-full items-center justify-center rounded-md bg-green-300 p-2 transition-colors hover:bg-green-500 hover:text-white">
            Completed
          </button>
          <button className="flex w-full items-center justify-center rounded-md bg-yellow-300 p-2 transition-colors hover:bg-yellow-500 hover:text-white">
            Pending
          </button>
          <button className="flex w-full items-center justify-center rounded-md bg-red-300 p-2 transition-colors hover:bg-red-500 hover:text-white">
            Failed
          </button>
          <button className="flex mt-4 w-full items-center justify-center rounded-md bg-red-400 p-2 transition-colors hover:bg-red-600 hover:text-white">
            Remove order
          </button>
        </div>
      ) : null}
    </div>
  );
};
