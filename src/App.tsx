import { useState } from "react";
import Images from "./components/Images";

const App = () => {
  const [imagesCount, setImagesCount] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!submitted) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-64 p-4 bg-white shadow-md rounded-md">
          <span className="block mb-2 text-lg font-semibold">
            How many images do you want to load?
          </span>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="number"
              min={1}              value={imagesCount}
              onChange={(e) => setImagesCount(+e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              disabled={!imagesCount}
              className="p-2 bg-blue-500 disabled:bg-blue-400 text-white rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <Images count={imagesCount} />;
};

export default App;
