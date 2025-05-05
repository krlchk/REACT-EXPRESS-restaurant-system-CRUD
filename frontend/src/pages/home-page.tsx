import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../components/store/users/user-slice";

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
      <button
        onClick={() => dispatch(logout())}
        className="mt-2 flex w-28 items-center justify-center rounded-md border bg-red-500 p-2 font-semibold text-white transition-colors hover:bg-red-700"
      >
        Logout
      </button>
      <Link
        className="flex w-28 items-center justify-center rounded-md bg-gray-300 p-2 transition-colors hover:bg-gray-500 hover:text-white"
        to="menu"
      >
        to Menu
      </Link>
    </div>
  );
};
