interface Props {
  searchWordInput: string;
  onChangeSearchWordInput: (value: string) => void;
  onSubmit: () => void;
}

function SearchForm({
  searchWordInput,
  onChangeSearchWordInput,
  onSubmit,
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="rounded-full bg-white flex items-center mt-4 sm:mt-8 mb-2 sm:mb-4 shadow-md p-1 focus-within:border-2 border-blue-400"
    >
      <input
        type="text"
        value={searchWordInput}
        onChange={(e) => onChangeSearchWordInput(e.target.value)}
        className="outline-none py-2 px-4 flex-1 rounded-full"
        placeholder="질환명을 입력해 주세요."
      />
      {searchWordInput && (
        <button
          type="button"
          onClick={() => onChangeSearchWordInput('')}
          className="mr-1 sm:mr-2 text-gray-500 font-semibold hover:text-black"
          disabled={searchWordInput.length === 0}
        >
          ✕
        </button>
      )}
      <button
        type="submit"
        onClick={onSubmit}
        className="bg-blue-400 text-white rounded-full text-sm sm:text-base w-10 sm:w-12 h-10 sm:h-12 font-semibold hover:bg-blue-500"
      >
        검색
      </button>
    </form>
  );
}

export default SearchForm;
