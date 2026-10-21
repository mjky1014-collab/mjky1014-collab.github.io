# 🗂️ 모음목록 — MJ Workspace

MJ(`mjky1014-collab`)가 만든 모든 작업물을 한 페이지에 모아, 클릭 한 번으로 바로 입장하는 개인 랜딩페이지입니다.

- **모음목록 (루트 사이트):** `https://mjky1014-collab.github.io/`
- **수퍼사이클 가이드:** `https://mjky1014-collab.github.io/super/`
- **코인노트 통합장부:** `https://mjky1014-collab.github.io/super/memo.html`

---

## 1. 현재 구조

| 구성 | 위치 | 배포 |
| --- | --- | --- |
| 모음목록 랜딩페이지 | 이 저장소(`mjky1014-collab.github.io`) 루트 | GitHub Pages |
| 수퍼사이클 가이드 | `super` 저장소 | GitHub Pages |
| 코인노트 통합장부 | `super` 저장소의 `memo.html` | GitHub Pages |

로컬 원본 파일도 함께 보관되어 있습니다.

```
.
├─ index.html                 # 모음목록 랜딩페이지 (배포 대상)
├─ 수퍼사이클_가이드/          # 가이드 로컬 원본
├─ 코인노트_통합장부.html       # 장부 로컬 원본
├─ notion/
│  ├─ 모음목록.md              # 노션 붙여넣기용
│  └─ 모음목록.csv             # 노션 CSV 가져오기용
├─ .nojekyll                  # GitHub Pages Jekyll 비활성화
└─ README.md
```

## 2. 새 작업물 추가하기

`index.html`의 `WORKS` 배열에 한 줄만 추가하면 카드·검색·노션 복사 목록에 자동 반영됩니다.

```js
const WORKS = [
  // ... 기존 항목
  {
    id: 'my-new-site',                    // 고유 ID
    title: '새 작업물 이름',
    desc: '한두 줄 소개',
    url: 'https://...',                    // 실제 사이트 주소
    category: '실험',                      // 가이드 / 도구 / 실험 ...
    icon: '🧪',
    tags: ['태그1', '태그2'],
    cover: 'https://.../cover.jpg',        // 없으면 mock 사용
    badge: 'NEW',
    date: '2026-10-22',
    repo: 'https://github.com/mjky1014-collab/...'  // 선택
  }
];
```

`cover`가 없으면 `mock` 값으로 목업 커버를 그립니다. 현재는 `mock: 'ledger'`만 지원합니다.

## 3. GitHub Pages 배포

루트 저장소 이름을 `mjky1014-collab.github.io`로 만들면 `https://mjky1014-collab.github.io/`가 됩니다.

### 방법 A — 웹에서 업로드

1. `mjky1014-collab.github.io` 저장소 → **Add file → Upload files**
2. `index.html`, `.nojekyll`, `README.md` 업로드
3. **Settings → Pages** → Source: `Deploy from a branch` → `main` / `/ (root)` → **Save**

### 방법 B — git CLI

```bash
git init
git add .
git commit -m "Add workspace collection landing page"
git branch -M main
git remote add origin https://github.com/mjky1014-collab/mjky1014-collab.github.io.git
git push -u origin main
```

### 방법 C — GitHub CLI (이미 인증됨)

```bash
gh repo create mjky1014-collab/mjky1014-collab.github.io --public --source . --push
gh api --method POST repos/mjky1014-collab/mjky1014-collab.github.io/pages \
  -f 'source[branch]=main' -f 'source[path]=/'
```

> `.nojekyll` 파일이 포함되어 있어 한글 파일명·폴더가 그대로 배포됩니다.

## 4. 노션에 목록 올리기

### 방법 A — 페이지에서 바로 복사 (추천)

1. `https://mjky1014-collab.github.io/` 접속
2. **노션에서도 같은 목록** 섹션 → **Markdown 복사**
3. mjky 계정 노션에서 새 페이지 만들고 `Ctrl+V`
4. 표 왼쪽 위 `⋮⋮` → **데이터베이스로 전환**

복사되는 링크는 현재 접속한 주소를 기준으로 자동 생성됩니다.

### 방법 B — CSV 가져오기

1. 페이지에서 **CSV 다운로드**
2. 노션 → **Settings → Import → CSV**
3. `모음목록_노션.csv` 선택 → 데이터베이스 생성

### 방법 C — 노션에 페이지 Embed

노션 페이지에서 `/embed` → 모음목록 주소 입력.
작업물을 추가하면 노션 안에서도 즉시 갱신됩니다.

## 5. 참고

- 즐겨찾기·최근 방문은 브라우저 `localStorage`에 저장됩니다.
- GitHub 저장소 목록은 `api.github.com`에서 `mjky1014-collab`의 공개 저장소를 실시간으로 불러옵니다.
- 공개 저장소만 표시됩니다. 비공개 저장소·Pages 주소는 `WORKS` 배열에 직접 추가하세요.
