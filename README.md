# 우아한테크캠프 9조 - TODO 

## 개발환경 / 기술스택

- webpack
- babel
- ESLint
- prettier
- sass

---

## 그라운드 룰

###  코드리뷰
    1. 데일리 스크럼 시간 이후
    2. 페어의 요청에 따라 유동적으로
    3. 리뷰 요청 시 올 스탑 후 리뷰 


---

### 커밋 메시지


`commitType emoji  <message>`

> example) feat: :sparkles: Sign In Page 구현

|   Commit type              | Emoji                                         | Situation |
|:---------------------------|:----------------------------------------------|:----|
| Initial commit             | :tada: `:tada:`                               | 따단~~~~~ |
| feat                | :sparkles: `:sparkles:`                       | 새로운 기능, UI 등 | 
| bug                     | :bug: `:bug:`                                 |  버그 수정/리포트  |
| Documentation              | :memo: `:memo:`                             | 문서화 |
| refactor             | :hammer: `:hammer:`                           | 구조 변경, 리팩토링 |
| css              | 🎨 : `:art:`                           | css 관련 |
| remove or edit        | :fire: `:fire:`                               |  파일 삭제 및 수정 |
| fix lint                       | :shirt: `:shirt:`                             | eslint 에러 수정 | 
| chore           | :gear:  `:gear:`              | 기능상 변경 없는 수정 | 
| init           | :construction:  `:construction:`              | 브랜치 첫 커밋 | 
> [Reference](https://gist.github.com/parmentf/035de27d6ed1dce0b36a)

---

### 브랜치 전략

- `feature / refactor / dev / main` 4개의 대분류를 기준으로 한다.
- 브랜치 상세 명은 `{feature or refactor}/{기능명}`으로 통일한다.
- ex) `feature/login`

