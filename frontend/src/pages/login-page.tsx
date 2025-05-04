import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { loginUser, resetStatus } from "../components/store/users/user-slice";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.restaurant.users);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status === "succeeded" || status === "failed") {
      const timer = setTimeout(() => {
        dispatch(resetStatus());
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, navigate, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password })).unwrap();
  };
  return (
    <div className="flex flex-col items-center p-9">
      <p className="text-3xl font-bold">Login Form</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-5 text-xl"
        action=""
      >
        <div className="flex w-full flex-col gap-1">
          <label className="font-semibold" htmlFor="email">
            Email:
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md bg-gray-200 px-2 py-1"
            type="email"
            id="email"
            placeholder="enter email..."
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <label className="font-semibold" htmlFor="password">
            Password:
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md bg-gray-200 px-2 py-1"
            type="password"
            id="password"
            placeholder="enter password..."
          />
        </div>
        <button
          className="mt-7 w-full rounded-md bg-gray-300 p-2 transition-colors hover:bg-gray-500 hover:text-white"
          type="submit"
        >
          {status === "loading" ? "Loginning..." : "Login"}
        </button>
      </form>
    </div>
  );
};
