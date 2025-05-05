import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="flex gap-5 flex-col p-9">
      <div>Homepage</div>
      <Link
        className="flex w-28 items-center justify-center rounded-md bg-gray-300 p-2 transition-colors hover:bg-gray-500 hover:text-white"
        to="menu"
      >
        to Menu
      </Link>
    </div>
  );
};
