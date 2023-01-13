import type { ISearchResultItem } from '../type';

interface Props {
  result: ISearchResultItem;
  searchWordInput: string;
  onChangeSearchWordInput: (value: string) => void;
}

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
      {/* 서버요청을딴거로바꾸거나 질환명이름을자바스크립트코드로바꿔놓을수있음 */}
      {/* 그래서 덴져러스어찌구는쓰지말자. 세니타이저를하지않앗으면! */}
      <span className="text-sm sm:text-base flex-1">
        {/* mark - html기능. 덴저러스랑 세니타이저쓰면성능이안좋아짐. 좋은방법아님 */}
        {/* html 파싱하는데시간이더오래걸림! */}
        {result.sickNm.split(searchWordInput)[0]}
        <mark className="font-medium">{searchWordInput}</mark>
        {/* <mark><b>{searchWordInput}</b></mark> */}
        {result.sickNm.split(searchWordInput)[1]}
      </span>
    </button>
  );
}

export default SearchResultItem;
