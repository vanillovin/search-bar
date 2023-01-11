# 원티드 프리온보딩 인턴십 3차 과제

## 목표

- 검색창 구현 + 검색어 추천 기능 구현

## 실행 방법

### 설치

```bash
$ npm install
# or
$ yarn
```

### 실행

루트 폴더에 다음 명령어를 입력해 json-server와 로컬 서버를 실행합니다.

json-server ([http://localhost:4000/sick](http://localhost:4000/sick))

```bash
$ npm run server
```

로컬 서버 ([http://localhost:3000](http://localhost:3000))

```
$ npm run start
# or
$ yarn start
```

## 구현 목표

[한국임상정보](https://clinicaltrialskorea.com/) 사이트의 검색영역 클론하기

### 1. 검색어 추천 기능 구현하기

질환명 검색시 API 호출을 통해서 검색어 추천 기능 구현하기
사용자가 입력한 텍스트와 일치하는 부분 볼드처리
예)

- 사용자 입력: 담낭
  추천 검색어:  **담낭**의 악성 신생물, **담낭**염, **담낭**의 기타 질환, 달리 분류된 질환에서의 **담낭**, 담도 및 췌장의 장애
- 검색어가 없을 시 “검색어 없음” 표출

```tsx

```

### 2. API 호출 최적화

#### API 호출별로 로컬 캐싱 구현

- 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)

```tsx

```

#### API 호출 횟수를 줄이기

- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
- API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

디바운스 적용 (setTimeout)

```tsx

```

### 3. 웹 접근성 고려

#### 키보드만으로 추천 검색어들로 이동 가능하도록 구현

focus되는 요소인 button tag를 이용

```tsx

```

## 기술스택

- 사용가능한 기술:
  - 전역 상태관리 라이브러리(Redux 등)
    - **단, 캐싱 기능이 포함되지 않은 것으로 제한**
  - 스타일 관련 라이브러리(styled-components, emotion, UI kit, tailwind, antd 등)
  - HTTP Client(axios 등)
- 사용한 기술: React, TypeScript, Tailwind CSS
