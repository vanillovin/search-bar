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
      <span className="mr-1 sm:mr-2 text-gray-600 text-sm sm:text-lg">ποΈ</span>
      {/* μλ²μμ²­μλ΄κ±°λ‘λ°κΎΈκ±°λ μ§νλͺμ΄λ¦μμλ°μ€ν¬λ¦½νΈμ½λλ‘λ°κΏλμμμμ */}
      {/* κ·Έλμ λ΄μ Έλ¬μ€μ΄μ°κ΅¬λμ°μ§λ§μ. μΈλνμ΄μ λ₯Όνμ§μμμΌλ©΄! */}
      <span className="text-sm sm:text-base flex-1">
        {/* mark - htmlκΈ°λ₯. λ΄μ λ¬μ€λ μΈλνμ΄μ μ°λ©΄μ±λ₯μ΄μμ’μμ§. μ’μλ°©λ²μλ */}
        {/* html νμ±νλλ°μκ°μ΄λμ€λκ±Έλ¦Ό! */}
        {result.sickNm.split(searchWordInput)[0]}
        <mark className="font-medium">{searchWordInput}</mark>
        {/* <mark><b>{searchWordInput}</b></mark> */}
        {result.sickNm.split(searchWordInput)[1]}
      </span>
    </button>
  );
}

export default SearchResultItem;
