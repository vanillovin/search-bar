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
      className="rounded-full bg-white flex items-center justify-between my-4 shadow-md p-1 focus-within:border-2 border-blue-300"
    >
      <input
        type="text"
        value={searchWordInput}
        onChange={(e) => onChangeSearchWordInput(e.target.value)}
        className="outline-none py-2 px-4 flex-1 rounded-full"
        placeholder="질환명을 입력해 주세요."
      />
      <button
        type="submit"
        onClick={onSubmit}
        className="bg-blue-400 text-white rounded-full w-12 h-12 font-semibold"
      >
        검색
      </button>
    </form>
  );
}

export default SearchForm;
