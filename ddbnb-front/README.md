# 프론트엔드

본 문서는 프로젝트의 코딩 컨벤션을 위한 문서이다.

본 문서는 프로젝트 종료 후 폭파할 예정이다.

## 작성규칙
- 폴더
    - 폴더명은 소문자로 작성한다.
    - 폴더명을 단수로 작성한다.

- 파일
    - 파일명은 camel case를 지키되, 화면 구성을 위한 파일은 첫 글자를 대문자로 작성한다.
        - 예) 메인 페이지의 파일명은 MainPage.js, 메인 페이지의 css는 main.css 또는 mainPage.css
    - 파일명과 화면의 함수명을 동일하게 작성
    - 이미지 파일은 /public/img에 저장한다.
        - 이미지 파일의 주소는 /img/*.*이다.

- 변수
    - 변수명은 camel case를 지켜 작성한다. 
        - 대문자로 시작하지 말 것!
        - snake case 지양할 것!
    - 카테고리가 같은 변수가 많을 경우 object로 만들어서 사용한다.
        - 예) 게시판 작성 시 작성정보(제목, 주소, 기간, 이미지 등)를 저장할 목적으로 여러 개의 변수를 만들지 말고 object로 간단하게 만들 것

- 함수 
    - 함수명은 시작을 대문자로 작성하면서 camel case를 지켜 작성한다.

## 위치
- 기존 위치와 다른 부분이 있을 수 있음
    - 노션 화면목록에 바뀐 위치와 이름을 작성해 두었으니 참고해 주세요