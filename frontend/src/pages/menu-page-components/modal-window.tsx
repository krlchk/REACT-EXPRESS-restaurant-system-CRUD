import { FormEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { closeModal } from "../../components/store/ui/ui-slice";
import {
  createDish,
  fetchDishes,
} from "../../components/store/dishes/dish-slice";

export const ModalWindow = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(
      createDish({ name, description, price }),
    );
    if (createDish.fulfilled.match(resultAction)) {
      await dispatch(fetchDishes());
      dispatch(closeModal());
    }
  };

  return (
    <div
      onClick={() => dispatch(closeModal())}
      className="absolute inset-0 flex h-screen w-full items-center justify-center backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-auto w-1/3 rounded-lg border-2 border-black bg-white p-5"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h1 className="text-xl font-semibold">Create dish form</h1>
          <input
            onChange={(e) => setName(e.target.value)}
            required
            className="rounded-md border border-black px-2 py-1 outline-none"
            placeholder="dish name..."
            id="name"
            type="text"
          />
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            required
            className="rounded-md border border-black px-2 py-1 outline-none"
            placeholder="dish desc..."
            id="description"
            rows={5}
          />
          <input
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            className="rounded-md border border-black px-2 py-1 outline-none"
            placeholder="dish prise..."
            id="price"
            type="number"
          />
          <button
            type="submit"
            className="mt-2 w-full rounded-md border bg-green-500 p-2 font-semibold text-white transition-colors hover:bg-green-700"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
