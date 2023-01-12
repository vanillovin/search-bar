import { useState, useEffect } from 'react';

import { getSearchResults } from './api';
import type { ISearchResultItem } from './type';
import SearchForm from './components/SearchForm';
import SearchResultItem from './components/SearchResultItem';

let cache: { [key: string]: ISearchResultItem[] } = {};

const setCache = (searchWord: string, searchResult: ISearchResultItem[]) => {
  // cache = {
  //   ...cache,
  //   [searchWord]: searchResult,
  // };
  cache[searchWord] = searchResult;
};

const getCache = (searchWord: string) => {
  // const cacheSearchResult = cache[searchWord];
  // if (!cacheSearchResult) throw Error('nothing cache search result');
  return cache[searchWord];
};

function App() {
  let timer: any;
  const [searchWordInput, setSearchWordInput] = useState('');
  const [searchResult, setSearchResult] = useState<ISearchResultItem[]>([]);

  const onSetSearchResult = (newSearchResult: ISearchResultItem[]) => {
    setSearchResult(newSearchResult);
  };

  const onChangeSearchWordInput = (value: string) => {
    setSearchWordInput(value);
  };

  const onSubmit = () => {
    if (!searchWordInput) return;

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      let searchReulst: ISearchResultItem[] = getCache(searchWordInput);
      if (!searchReulst) {
        getSearchResults(searchWordInput).then((data) => {
          searchReulst = data;
          setSearchResult(searchReulst);
          setCache(searchWordInput, searchReulst);
        });
        return;
      }
      setSearchResult(searchReulst);
    }, 500);
  };

  useEffect(() => {
    if (!searchWordInput) {
      setSearchResult([]);
      return;
    }

    let searchResult: ISearchResultItem[] = getCache(searchWordInput);
    const debounce = setTimeout(() => {
      if (!searchResult) {
        getSearchResults(searchWordInput).then((data) => {
          searchResult = data;
          onSetSearchResult(searchResult);
          setCache(searchWordInput, searchResult);
        });
        return;
      }
      setSearchResult(searchResult);
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchWordInput]);

  return (
    <div className="flex items-center justify-center w-full bg-blue-100">
      <div className="bg-blue-100 p-10 rounded-sm w-full max-w-3xl">
        <h2 className="font-extrabold text-center">
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
            className="rounded-2xl bg-white p-4 max-h-96 overflow-y-auto shadow-md"
          >
            <li className="p-1">
              <span className="mr-2 text-gray-600 text-lg">🔍︎</span>
              <span className="font-semibold">{searchWordInput}</span>
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
