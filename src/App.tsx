import { useState, useEffect } from 'react';

import { getSearchResults } from './api';
import type { ISearchResultItem } from './type';
import SearchForm from './components/SearchForm';
import SearchResultItem from './components/SearchResultItem';

type Cache = { [key: string]: ISearchResultItem[] };

function App() {
  let timer: any;
  const [searchWordInput, setSearchWordInput] = useState('');
  const [cache, setCache] = useState<Cache>({ '': [] });

  const searchResult = cache[searchWordInput] ?? [];

  const onChangeSearchWordInput = (value: string) => {
    setSearchWordInput(value);
  };

  const onSubmit = () => {
    if (!searchWordInput) return;
    if (searchResult.length) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      getSearchResults(searchWordInput).then((searchResult) => {
        setCache((old) => ({ ...old, [searchWordInput]: searchResult }));
      });
    }, 500);
  };

  // TODO: 선언형으로 바꾸기
  // 1. set에 빨간줄을 긋고 줄이자.
  //   - 검색어가 없으면 searchResult는 빈 배열이다. -> 선언적인 코드가 될 수 있는 부분 (+캐시)
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (!searchWordInput) return;
      if (searchResult.length) return;
      getSearchResults(searchWordInput).then((searchResult) => {
        setCache((old) => ({ ...old, [searchWordInput]: searchResult }));
      });
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchWordInput, setCache, searchResult.length]);

  return (
    <div className="flex items-center justify-center w-full bg-blue-100">
      <div className="bg-blue-100 p-2 sm:p-10 rounded-sm w-full max-w-3xl">
        <h2 className="font-extrabold text-center text-xl sm:text-3xl leading-normal">
          국내 모든 임상시험 검색하고
          <br /> 온라인으로 참여하기
        </h2>
        <SearchForm
          searchWordInput={searchWordInput}
          onChangeSearchWordInput={onChangeSearchWordInput}
          onSubmit={onSubmit}
        />
        {searchWordInput && (
          <ul
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
            {searchResult.length > 0 ? (
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
            ) : (
              <p className="p-1">추천 검색어가 없습니다</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
