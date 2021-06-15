## 로컬 서버 실행
```
$ npm install
```
```
$ npm run dev
```

## library
- react
  - vanilla 환경으로 개발을 진행하다 코드상 정리가 되지 않아 익숙한 JSX문법과 컴포넌트 형태로 구조설계를 하기 위해 적용 하였습니다.
- mobx
  - model 구조 구현시 observer 패턴을 구현하여 진행하고자 했지만 구현이 쉽지않아 적용하였습니다.

## 개발 고려 중점 사항
- intersectionObserver API를 이용한 무한 스크롤 구현
- filter 컴포넌트 필터링 조건 추가 구현