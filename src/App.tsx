import { useState, useEffect } from 'react';

import { getSearchResults } from './api';
import type { ISearchResultItem } from './type';
import SearchForm from './components/SearchForm';
import SearchResultItem from './components/SearchResultItem';

type Cache = Record<string, ISearchResultItem[]>;

function App() {
  const [searchWordInput, setSearchWordInput] = useState('');
  const [cache, setCache] = useState<Cache>({ '': [] });

  // 빈배열이두가지이유가잇을수있다.
  // 잇을수도잇고없을수도잇고 로딩중뜨고
  // setState로할땐 타이밍이안맞고
  // 마라탕 마라->마라탕 마라탕으로보여야하는데마라요청이나중에올수잇다
  // 마라검색결과가더많으니까 서버에서더오래걸려서 요청이나중에올수잇는가능성 희박하지만
  // 그런걸겪을수있다.
  const searchResult: ISearchResultItem[] | undefined = cache[searchWordInput];

  const onChangeSearchWordInput = (value: string) => {
    setSearchWordInput(value);
  };

  // 입력할때가잇으면온서브밋이사라져야함
  // 버튼을누르기전에 글자릉안칠수없음. 무조건쳐야함. 요청이두번날라감
  // onSubmit 없애기

  // 어떻게 리액트에서 세련되게 사용자의이벤트를처리하냐면
  // useTransition 렌더링시간이오래걸리는걸기다려주는친구
  useEffect(() => {
    // 조건에따라멀하고안하고가갈림
    // 명령으로밖에못짜니까! 명령이나쁘단게아님.
    // 자바스크립트에선 못바꾼다선언으로. 하스켈로가야함

    // 선언형으로만드는방법 => 커스텀훅 => 내가어떻게하면요청을보낸다가아니라, 검색어가잇으면캐시랑동기화되게해라! 동기화된다!
    // 명령형 : 내가멀한다한다계속말하는것
    // 어떻게돼야해. 어떤거야. a는b야. a는b가될거야. 안에서구독하고취소하고어떻게하는거겟지만
    // 어떻게일어나는진신경안써도됨

    // 버그가생기면 그때생각 일단놥두자 언젠간버그가생기고 내가모든걸알수없음
    // 버그가나는거임. 내가맞게하는건가? 올바르게하는건가? 걱정되는데공부해야하나?
    // => 마음가짐! 모르는게잇을수밖에없다. 공부할게세상에정말많음. 우울할수바께없다
    // 하지만 그렇게생각만안하면안우울해짐. 그냥사는거임. 살다보면버그도나고에러도나괴실수도함. 그렇게배우는거임
    // 선언적으로바꾸는게안편할수도잇음. 복잡해질수도잇고 그러면 에러도더많이남 성능도더안좋아짐
    // 토스개발자도 선언적인게좋대 그래서 다바꾸려다보니 끔찍해졋음. (교육쪽도메인)
    const timerId = setTimeout(() => {
      if (!searchWordInput) return;
      // cache[searchWordInput] => in이더명확하다고생각!
      // 캐시인풋이존재하지않을때요청을보낸다. result랑왜달라? 서버에진짜검색결과가없을수도있음. 진짜로없을수도.
      if (searchWordInput in cache) return;

      getSearchResults(searchWordInput).then((searchResult) => {
        setCache((old) => ({ ...old, [searchWordInput]: searchResult }));
      });
    }, 400);

    // 언제 타임아웃이 클리어되나 - 단어나 캐시가바뀔때 없어짐.
    return () => clearTimeout(timerId);
  }, [searchWordInput, cache, setCache]);
  // 캐시가바뀌면 유즈이팩트가다시시작됨. 클리어함!
  // 그럼 예를 들어, 단어요청을보냇는데 이전요청보낸걸setcache해서 마지막요청잘가고잇던걸취소해버림
  // 자동완성이원래만들기어렵다. 모든걸다잘할수없다 결국이렇게살아야한다
  // 올바르지만 복잡한 것은 어렵다... 복잡한걸하고싶다면 라이브러리를 사용

  return (
    <div className="flex items-center justify-center w-full bg-blue-100">
      <div
        id="search-container"
        className="bg-blue-100 p-2 sm:p-10 rounded-sm w-full max-w-3xl"
      >
        <h2 className="font-extrabold text-center text-xl sm:text-3xl leading-normal">
          국내 모든 임상시험 검색하고
          <br /> 온라인으로 참여하기
        </h2>
        <SearchForm
          searchWordInput={searchWordInput}
          onChangeSearchWordInput={onChangeSearchWordInput}
        />
        {/* 경우가세가지 */}
        {/* 로딩중, 결과가잇거나, 검색결과가없거나 */}
        {/* 패턴매칭. 함수형언어에잇는이쁜기능. 삼항연산자를깔끔하게 */}
        {searchWordInput && (
          <ul
            id="search-result-list"
            role="tablist"
            className="rounded-2xl bg-white p-3 sm:p-4 max-h-96 overflow-y-auto shadow-md"
          >
            <li className="p-1">
              <span className="mr-1 sm:mr-2 text-gray-600 text-sm sm:text-lg">
                🔍︎
              </span>
              <span className="font-semibold text-sm sm:text-base">
                {searchWordInput}
              </span>
            </li>
            <SearchResultBody
              searchResult={searchResult}
              searchWordInput={searchWordInput}
              onChangeSearchWordInput={onChangeSearchWordInput}
            />
          </ul>
        )}
      </div>
    </div>
  );
}

function SearchResultBody({
  searchResult,
  searchWordInput,
  onChangeSearchWordInput,
}: {
  searchResult: ISearchResultItem[] | undefined;
  searchWordInput: string;
  onChangeSearchWordInput: (s: string) => void;
}) {
  // 경험이안좋아짐. 사용자가로딩중인지모르면
  if (searchResult === undefined) {
    // 부수효과가없고 리턴만하면 선언적일수잇다.
    // 여기다값을 let으로바꾼ㄴ다거나그런게없음. setState, console.log이런거안하고있음
    //
    // if (searchResult === undefined) 일떄는 밑에 리턴이야
    return <span>로딩 중</span>;
  }

  if (searchResult.length === 0) {
    return <p className="p-1">검색된 결과가 없습니다</p>;
  }

  return (
    <>
      <h3 className="text-gray-600 text-sm p-1 font-semibold mt-1">
        추천 검색어
      </h3>
      {searchResult.map((result, index) => (
        <SearchResultItem
          key={index}
          result={result}
          searchWordInput={searchWordInput}
          onChangeSearchWordInput={onChangeSearchWordInput}
        />
      ))}
    </>
  );
}
export default App;
