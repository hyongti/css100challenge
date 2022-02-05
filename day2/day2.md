# scss vs. sass

[sass(scss) 완전정복!](https://heropy.blog/2018/01/31/sass/)

웹에서는 `.css` 파일만 읽을 수 있다. 따라서 css 전처리기인 `scss`나 `sass`를 사용하기 위해서는 컴파일러가 필요하다.
여러 도구 중 조금 관심을 가지고 있었던 웹팩을 사용해봤다.

### scss에서는..
- $ 기호와 함께 전역변수 같은 것을 선언할 수 있다.
- 중첩된 css 내부에서는 상위 값을 그대로 가져다 쓸 수 있다.

---

# 웹팩

공식문서를 보면서 스스로 학습해야 하는데.. 결국엔 또 유튜브에서 강의를 찾아봤다. 길지 않아서 그냥 들었다
[생활코딩 - 웹팩](https://www.youtube.com/watch?v=cp_MeXO2fLg&list=PLuHgQVnccGMChcT9IKopFDoAIoTA-03DA)

강의와 공식문서를 보고 조악하게 만든 `webpack.config.js`는 루트 디렉토리에 있다.

---

## 1강 - 웹팩 소개

(웹팩 사진)

웹사이트를 만들다 보면 .js, .css, 이미지 등 수많은 파일들이 생겨난다. 그렇게 완성된 웹사이트를 로딩하면 정말 많은 파일들이 다운로드 된다는 것을 알 수 있다. 이렇게 많은 파일들이 다운로드된다는 것은 서버와의 접속이 많다는 이야기이고, 서버와의 접속이 많으면 페이지가 느려질 수밖에 없다. 그리고 여러 js 패키지들을 사용하다 보면, 서로 다른 패키지들이 같은 이름의 변수나 함수를 사용하면서 예상하지 못한 충돌이 생길 수도 있다.

이러한 문제를 해결하기 위해 등장한 도구가 **bundler**. **Webpack**, **Broserify**, **parcel** 등이 **bundler**에 해당한다.

웹팩을 사용하면 여러가지 모듈들을 하나의 js파일에 모아놓을 수 있고, 성능향상을 위해서 모아놨던 것들을 분리할 수도 있다.

---

## 2강 - 웹팩 이전의 세계와 모듈의 개념

웹팩 이전의 세계를 경험하기 위해 아주 비효율적인 작업을 해볼 것이다. `hello.js`와 `world.js`라는 파일을 만들어서, 각각의 파일에 선언된 변수에 저장된 값을 `id=root`인 `div`의 `innerHTML`에 넣을 것이다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="src/hello.js"></script>
    <script src="src/world.js"></script>
  </head>
  <body>
    <h1>Hello, Webpack</h1>
    <div id="root"></div>
    <script>
      document.querySelector("#root").innerHTML = word;
    </script>
  </body>
</html>
```

`index.html`

```js
let word = "Hello";
```

`src/hello.js`

```js
let word = "World";
```

`src/world.js`

위와 같이 세개의 파일을 만들고 실행시키면, `World` 밖에 안 들어가있는데, 이게 바로 같은 단어를 사용해서 생긴 충돌이다. 규모가 큰 프로젝트에서 변수명의 중복은 심각한 문제가 된다.

이는 마치 데스크톱에서 하나의 폴더 안에 모든 파일을 넣어놓는 것과 같은 상황이다. 같은 이름의 변수라도 다른 폴더에 있으면 문제가 되지 않는데, 이를 해결하기 위한 방법이 모듈이다.

위 코드들을 아래와 같이 수정하면,

```html
<!DOCTYPE html>
<html lang="en">
  <head> </head>
  <body>
    <h1>Hello, Webpack</h1>
    <div id="root"></div>
    <script type="module">
      import hello_word from "./src/hello.js";
      import world_word from "./src/world.js";
      document.querySelector("#root").innerHTML = hello_word + " " + world_word;
    </script>
  </body>
</html>
```

`index.html`

```js
let word = "Hello";
export default word;
```

`src/hello.js`

```js
let word = "World";
export default word;
```

`src/world.js`

문제 없이 돌아간다!

여기에는 문제가 몇개 있는데,

- import, export는 최신 브라우저에서만 동작한다.
- hello.js, world.js라는 파일을 다운로드 받았다. 만약 파일이 수 백개라면, 네트워크 커넥션이 너무 많아질 것이다.

**웹에서 모듈의 기능을 사용하면서 여러개의 파일을 하나로 묶어서 하나의 파일로 제공하면 어떨까?**
라는 생각에서 나온 게 바로 **번들러**

---

## 3강. 웹팩의 도입

```
npm init
npm install -D webpack webpack-cli
```

그 다음에 해야할 일은 html 파일에서 `<script>` 태그로 감쌌던 부분을 별도의 js파일로 분리해야 한다.

```js
import hello_word from "./hello.js";
import world_word from "./world.js";

document.querySelector("#root").innerHTML = hello_word + " " + world_word;
```

`src/index.js`

```html
<!DOCTYPE html>
<html lang="en">
  <head></head>
  <body>
    <h1>Hello, Webpack</h1>
    <div id="root"></div>
    <script type="module" src="public/main.js"></script>
  </body>
</html>
```

`src/index.js`

위 파일을 **엔트리 파일**이라고 한다. 우리 프로젝트의 입구가 되는 것.

이제 웹팩을 사용해서 `hello.js`와 `world.js`파일을 `index.js`파일에 번들링 해볼 것이다.
완성된 파일을 `public`이라는 디렉토리에 생성할 것이다.

프로젝트의 루트 디렉토리에서 다음의 명령어를 실행한다

> 강의랑 달라진 부분이 있으니 공식문서를 보자

```
npx webpack --entry ./src/index.js -o ./public/
```

위 명령어를 실행하면 `public` 디렉토리에 `main.js`라는 파일이 생긴다

```js
(() => {
  "use strict";
  document.querySelector("#root").innerHTML = "Hello World";
})();
```

웹팩은 최신 문법인 `import`나 `export`를 이전 버전에서도 사용할 수 있게 바꿔주는 역할도 한다.

---

## 4강. 설정파일 도입

모두 이 순서로 진행된다!

> input -> process -> output

이 명령어를 계속 쓸 순 없으니,

```
npx webpack --entry ./src/index.js -o ./public/
```

`.config` 파일을 만들자!

> 자세한 내용은 웹팩 공홈의 documentation 참고
> `webpack.config.js` 파일을 참고서처럼 생각하자.

[웹팩 설정파일](https://webpack.kr/configuration/)을 보고 `webpack.config.js`파일을 작성해보자.

```js
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "index_bundle.js",
  },
};
```

`webpack.config.js`

웹팩 config 파일을 작성한 뒤, 터미널에서 아래와 같이 입력하면,

```
npx webpack --config webpack.config.js
```

`public/index_bundle.js` 파일이 생기는 것을 볼 수 있다.

사실 `--config` 옵션이 없어도, 기본적으로 `webpack.config.js` 파일을 참조해서 명령이 실행되므로, 작성한 `webpack.config.js` 파일이 있다면 아래 명령어로도 충분하다.

```
npx webpack
```

---

## 5강. 모드의 도입

위에서와 같이 번들링을 하면 터미널에 다음과 같은 에러메시지가 뜬다.

> The 'mode' option has not been set, webpack will fallback to 'production' for this value.

`mode` 옵션의 기본값은 `production`이다.

만들어진 `index_bundle.js`를 보면 용량을 줄이기 위해 개행도 없고 변수명도 최대한 줄여놓을 것을 볼 수 있는데, `mode` 옵션을 `development`로 바꾸면 그래도 쪼오오오금은 볼만한 코드가 된다.

계속 config 파일을 바꾸기보단, `webpack.config.prod.js`와 같은 파일을 하나 만들어서 `mode` 옵션만 다르게 설정하면 편하다.

---

## 6강. 로더의 도입

**웹팩의 핵심이라고 할 수 있다! 진짜 중요한 개념**

작성하고 있는 `index.html`파일에 스타일을 추가하고 싶을 수 있다. `public/style.css`에 스타일을 추가하고 서버를 돌리면, 네트워크 탭에 css파일을 따로 다운로드 받는 것을 볼 수 있다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- 추가 -->
    <link rel="stylesheet" href="public/style.css" />
  </head>
  <body>
    <h1>Hello, Webpack</h1>
    <div id="root"></div>
    <script type="module" src="public/index_bundle.js"></script>
  </body>
</html>
```

> 그런데 _자바스크립트 안에 style파일 까지 넣을 순 없을까?_

근데 웹팩이 그것을 가능하게 한다. 웹팩의 **로더**가 그런 역할을 한다!

웹팩 공식 홈의 [Asset Management](https://webpack.kr/guides/asset-management/)를 참고하자.

터미널에 아래를 입력한 뒤,

```
npm install --save-dev style-loader css-loader
```

`webpack.config.js`파일도 아래와 같이 수정한다.

```js
onst path = require('path');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   // 추가
  module: {
    rules: [
      {
        // rules 객체 안에 있는 규칙에 맞는 파일을 만나면, use 배열 안에 있는 로더를 활용해서 어떤 작업을 한다.
        test: /\.css$/i,
        use: ['css-loader'],
      },
    ],
  },
 };

```

이렇게 `webpack.config.js` 파일을 수정하면 html에서 css를 불러오는 `<link>` 태그가 필요 없어진다.

대신 `index.js`에서 css를 `import`한다. (`publc`에 있던 css파일을 `src` 디렉토리로 옮기자)

```js
import hello_word from "./hello.js";
import world_word from "./world.js";
import css from "./style.css";

document.querySelector("#root").innerHTML = hello_word + " " + world_word;

console.log("css", css);
```

이러고 콘솔창을 보면, 아래와 같은 출력을 볼 수 있다.
![](./lecture6.png)

위 내용을 조작해서 js 문법을 통해 css를 끼워넣을 수도 있지만, 직접 해주는 loader가 있다. 바로 `style-loader`이다.

```js
...
module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        // 순서를 위와 같이 써야 한다.
        // style-loader를 뒤에 썼더니 빌드가 안 됨..
        // 뒤쪽에 있는 로더가 먼저 실행되기 때문이라고 한다!
      },
    ],
  },
```

`index.js`는 아래와 같이 수정(이제 css는 콘솔로그로 출력해봐도 undefined).

```js
import hello_word from "./hello.js";
import world_word from "./world.js";
import "./style.css";

document.querySelector("#root").innerHTML = hello_word + " " + world_word;
```

---

## 7강. output 설정

'최종적인 파일 이름, 파일을 어떻게 쪼갤 것인지 등등'도 설정할 수 있다!

`about.html`이라는 파일과 `src` 디렉토리 내부에 `about.js`라는 파일을 만들자. `about.js`는 `World Hello`를 출력할 것이다.

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <h1>Hello, About</h1>
    <div id="root"></div>
    <script type="module" src="public/about_bundle.js"></script>
    <a href="./index.html">index</a>
  </body>
</html>
```

`about.html`

```js
import hello_word from "./hello.js";
import world_word from "./world.js";
import "./style.css";

document.querySelector("#root").innerHTML = world_word + " " + hello_word;
```

`src/about.js`

그리고 `index.html`에 `a`태그를 추가하자.

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <h1>Hello, Index</h1>
    <div id="root"></div>
    <script type="module" src="public/index_bundle.js"></script>
    <!-- 추가 -->
    <a href="./about.html">about</a>
  </body>
</html>
```

이제 `webpack.config.js`을 수정하자.

가장 먼저 `entry`를 설정해야 한다. `index.js`와 `about.js`를 모두 번들링해야 하기 때문이다.

> 역시 [공식문서](https://webpack.kr/configuration/entry-context/)를 보는 게 가장 바람직할 것이다.

`entry`를 다음과 같이 수정하자.

```js
...
  entry: {
      index: "./src/index.js",
      about: "./src/about.js",
  },
...
```

그리고 `index.js`와 `about.js`를 번들링한 결과는 `output`에서 설장한다.

```js
...
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name]_bundle.js",
  },
...
```

---

## 8강. 플러그인의 도입

로더는 `input -> process -> output`의 과정에 관여를 한다면, **플러그인**은 output을 가공하는 역할을 한다고 생각하자(역시 자세한 건 공식문서)

8강에서 사용할 플러그인은 [HtmlWebpackPlugin](https://webpack.kr/plugins/html-webpack-plugin)이다.

현재 루트 디렉토리에 있는 `index.html`과 `about.html`은 직접 만든 것이고, 의존성을 가지고 있는 번들링된 js 파일 역시 직접 삽입시키고 있다. 근데 이러한 의존성들을 가지고 있는 html파일을 자동으로 만들고 싶다면? **[HtmlWebpackPlugin](https://webpack.kr/plugins/html-webpack-plugin)**을 사용하면 된다.

```
npm install --save-dev html-webpack-plugin
```

설치하고, `index.html`과 `about.html`을 `src` 디렉토리 내부로 옮기자. `script` 태그는 지울 것이다.

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <h1>Hello, Index</h1>
    <div id="root"></div>
    <a href="./about.html">about</a>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <h1>Hello, About</h1>
    <div id="root"></div>
    <a href="./index.html">index</a>
  </body>
</html>
```

이제 플러그인을 통해 완성된 html 파일을 `public` 디렉토리 안에 만들어보자.

`webpack.config.js` 파일에 플러그인을 삽입할 것이다.

```js
const path = require("path");
// 추가
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    about: "./src/about.js",
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: `[name]_bundle.js`,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // 추가
  plugins: [new HtmlWebpackPlugin()],
};
```

아마 웹팩을 실행하면 `public` 디렉토리 내부에 `index.html` 파일도 생길 것이다. 하지만 우리가 원하는 형태는 아니다. 우리가 원하는 것은, **만들어뒀던 `index.html`과 `about.html`을 템플릿으로 해서 각각의 html 파일에 필요한 번들링된 js 파일을 심어서 `public` 디렉토리 안에 넣어주는 것**이다.

원하는 결과를 위해 `plugins`를 아래와 같이 수정한다.

```js
  plugins: [
    new HtmlWebpackPlugin({
      // 템플릿으로 만들길 원하는 html 파일
      template: "./src/index.html",
      // 만들어질 파일
      filename: "./index.html",
      // 원하는 자바스크립트 파일만 삽입
      chunks: ["index"],
    }),

    // html 파일이 두개니까
    new HtmlWebpackPlugin({
      template: "./src/about.html",
      filename: "./about.html",
      chunks: ["about"],
    }),
  ],
```

이거 말고 여러가지 플러그인이 있으니 공식문서를 잘 살펴보자.

---

## 9강. 선물

```bash
npx webpack
# 대신에
npx webpack --watch
# 를 사용하면 변화된 부분을 캐치해서 다시 컴파일한다.
```

---

## 10강. npm 패키지 사용

npm을 통해서 설치한 여러가지 부품이 될 프로그램을 우리의 어플리케이션으로 가져오는 방법으로써 webpack을 사용해보자.

`lodash`라는 패키지를 사용할 것이다.

```bash
npm insatll lodash
```

`index.js`에서 `import`를 하자.

```js
import hello_word from "./hello.js";
import world_word from "./world.js";
import _ from "lodash";
import "./style.css";

document.querySelector("#root").innerHTML = _.join(
  [hello_word, world_word],
  " "
);
```

> 이건 왜 한 거지..?

---

## 11강. 수업을 마치며

더 알아볼 것
웹팩에서 제공하는 기능

- DevServer
  - live reload
  - hot module replacement
- Code spliiting
- Lazy loading

# webpack
