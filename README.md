# MJ Workspace

MJ의 작업 페이지와 가이드를 정리한 저장소입니다.

## 공개 가이드

- **수퍼사이클 가이드:** `https://mjky1014-collab.github.io/super/`
- **코인노트 통합장부:** `https://mjky1014-collab.github.io/super/memo.html`
- **EX 시작 가이드:** `https://mjky1014-collab.github.io/ex/`
- **NEXT CHART 신호등 가이드:** `https://mjky1014-collab.github.io/next/`
- **탑10 급등락 코인 공략:** `https://mjky1014-collab.github.io/top10/`
- **병아리 매매법 · 시바진 어고:** `https://mjky1014-collab.github.io/chick/`

## 개인 작업 목록

루트 `index.html`은 개인용 작업 목록입니다.

- 작업물 제목과 바로가기만 표시합니다.
- 외부 랜딩페이지에는 이 목록으로 돌아가는 링크를 두지 않습니다.
- `noindex, nofollow, noarchive`와 `robots.txt`로 검색 노출을 막습니다.

> GitHub Pages는 공개형 호스팅이라 주소를 아는 사람은 접근할 수 있습니다. 완전한 잠금이 필요하면 별도 인증 수단이 필요합니다.

## 구조

| 구성 | 위치 |
| --- | --- |
| 개인 작업 목록 | 이 저장소 루트 `index.html` |
| 병아리 매매법 | `chick/` |
| 탑10 급등락 코인 공략 | `top10/` |
| EX 시작 가이드 | `ex/` |
| NEXT CHART 신호등 가이드 | `next/` |
| 수퍼사이클 가이드 | `super` 저장소 |
| 코인노트 통합장부 | `super` 저장소의 `memo.html` |

로컬 원본은 각 `*-guide/` 폴더와 `수퍼사이클_가이드/`, `코인노트_통합장부.html`에 보관되어 있습니다.

## 작업물 추가

루트 `index.html`의 `<nav class="list">` 안에 항목을 하나 추가합니다.

```html
<a class="item" href="https://mjky1014-collab.github.io/my-new-page/" target="_blank" rel="noopener">
  <span class="icon" aria-hidden="true">🧪</span>
  <span class="body">
    <span class="title">새 작업물 이름</span>
    <span class="cat">가이드</span>
  </span>
  <span class="arrow" aria-hidden="true">↗</span>
</a>
```

## 배포

GitHub 웹 업로드를 사용합니다.

- 루트 파일: `index.html`, `robots.txt`, `README.md`
- 하위 페이지: 각 폴더의 `index.html`
  - `chick-guide/index.html` → `chick/index.html`
  - `top10-guide/index.html` → `top10/index.html`
  - `next-guide/index.html` → `next/index.html`
  - `ex-guide/index.html` → `ex/index.html`

업로드 페이지 주소 끝에 폴더 경로를 붙이면 해당 폴더로 들어갑니다.

```text
https://github.com/mjky1014-collab/mjky1014-collab.github.io/upload/main/
https://github.com/mjky1014-collab/mjky1014-collab.github.io/upload/main/chick
https://github.com/mjky1014-collab/mjky1014-collab.github.io/upload/main/top10
https://github.com/mjky1014-collab/mjky1014-collab.github.io/upload/main/next
https://github.com/mjky1014-collab/mjky1014-collab.github.io/upload/main/ex
```

`.nojekyll` 파일이 포함되어 있어 한글 파일명과 폴더가 그대로 배포됩니다.
