const Loader = ({ isLoading }: { isLoading: boolean }) =>
  isLoading ? (
    <div className="absolute z-10 bg-white flex w-full justify-center h-screen items-center">
      <span>Loading...</span>
    </div>
  ) : null;

export default Loader;
