# 🎞 Runner's pedia

## 📝 프로젝트 소개
<div>
  <img src="https://img.shields.io/badge/HTML5-%23-orange" alt="HTML">
  <img src="https://img.shields.io/badge/CSS3-%23-blue" alt="CSS">
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-yellow" alt="JavaScript">
</div>
TMDB Open API를 활용한 영화 소개 웹 사이트입니다.

<br/>
<br/>

## ⚙ 프로젝트 기능 소개 

-   바닐라 자바스크립트로 구성된 프로젝트입니다.
-   **TMDB Open API**의 `인기 영화 목록 조회 API` 및 `영화 검색어 조회 API`를 활용했습니다.
-   영화 제목 기반 검색에서 **debounce**와 **hangul-js**를 적용하여 성능 최적화를 했습니다.
-   **localStorage**를 이용하여 사용자에게 북마크 기능을 구현했습니다.

<br/>

## 🚀 트러블 슈팅

#### [ 한글 검색 기능 최적화 ](https://aboard-particle-0d4.notion.site/JS-17dee001a71580e7b8e4e0e182618752?pvs=4)

#### [ 북마크 on/off 시 검색 기능이 동작하지 않는 문제 해결 ](https://aboard-particle-0d4.notion.site/JS-on-off-17cee001a71580de8303c7f7afd53a93?pvs=4)

#### [ debounce 검색 기능이 동작하지 않는 문제 해결](https://aboard-particle-0d4.notion.site/JS-debounce-179ee001a715804ca377e96f2f828ee6?pvs=4)

<br/>

## 📁 프로젝트 구조

```markdown
run_js
├─ css
│ ├─ cards.css
│ ├─ common.css
│ ├─ footer.css
│ ├─ header.css
│ ├─ home.css
│ ├─ modal.css
│ └─ search.css
├─ image
│ ├─ favicon-16x16.png
│ ├─ favicon-32x32.png
│ ├─ favicon-96x96.png
│ └─ logo.png
├─js
│ ├─ common.js
│ ├─ dummy.js
│ ├─ home.js
│ └─ storage.js
├─ index.html
└─ README.md
```
