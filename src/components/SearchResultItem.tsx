import type { ISearchResultItem } from '../type';

interface Props {
  result: ISearchResultItem;
  searchWordInput: string;
  onChangeSearchWordInput: (value: string) => void;
}

const boldString = (str: string, substr: string) => {
  const strRegExp = new RegExp(substr, 'g');
  return str.replace(strRegExp, `<b>${substr}</b>`);
};

function SearchResultItem({
  result,
  searchWordInput,
  onChangeSearchWordInput,
}: Props) {
  return (
    <button
      role="tab"
      key={result.sickCd}
      className="flex items-start sm:items-center w-full p-1 sm:p-2 border-b last:border-0 cursor-pointer hover:bg-gray-100 focus-visible:bg-gray-100 text-start"
      onClick={() => onChangeSearchWordInput(result.sickNm)}
    >
      <span className="mr-1 sm:mr-2 text-gray-600 text-sm sm:text-lg">🔍︎</span>
      <span
        className="text-sm sm:text-base flex-1"
        dangerouslySetInnerHTML={{
          __html: boldString(result.sickNm, searchWordInput),
        }}
      />
    </button>
  );
}

export default SearchResultItem;
