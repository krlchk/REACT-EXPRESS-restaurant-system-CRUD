export const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center p-9">
      <p className="text-3xl font-bold">Registration Form</p>
      <form className="flex flex-col gap-4 p-5 text-xl" action="">
        <div className="flex w-full flex-col gap-1">
          <label className="font-semibold" htmlFor="name">
            Name:
          </label>
          <input
            className="rounded-md bg-gray-200 px-2 py-1"
            type="text"
            id="name"
            placeholder="enter name..."
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <label className="font-semibold" htmlFor="email">
            Email:
          </label>
          <input
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
            className="rounded-md bg-gray-200 px-2 py-1"
            type="password"
            id="password"
            placeholder="enter password..."
          />
        </div>
        <button type="submit"></button>
      </form>
    </div>
  );
};
