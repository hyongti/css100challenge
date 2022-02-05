[px - em - rem에 대해](https://medium.com/watcha/watcha-%EA%B0%9C%EB%B0%9C-%EC%A7%80%EC%8B%9D-px-em-rem-f569c6e76e66)

# em vs. rem

## em

[플래시 이미지 출처](https://medium.com/watcha/watcha-%EA%B0%9C%EB%B0%9C-%EC%A7%80%EC%8B%9D-px-em-rem-f569c6e76e66)

- 작동방식
  ![em](https://miro.medium.com/max/1400/1*cExHZLEHJR1Yl2ivVQhlIA.gif)

- 작동방식
  ![em](https://miro.medium.com/max/1400/1*E4m3kjnO1UyxaU9loL2FGw.gif)

## rem

![rem](https://miro.medium.com/max/1400/1*O2bP7XWaNiat814gBWQPZA.gif)

브라우저 기본 설정 기준 기본 16픽셀이므로 1rem은 16px.

따라서 html 태그에 다음과 같은 설정을 해주면 1rem을 10px로 맞출 수 있다.

```css
html {
  font-size: 62.5%;
}
```

px, em, rem, % 무엇을 쓸지는 잘 고민해봐야겠다.

# position

포지션은 기본적으로 `position: static;`, `static`으로 설정된 값은 `top, right, bottom, left`에 영향을 받지 않음

`position: relative;`는 `static`포지션으로부터 얼마나 떨어져있을지 결정할 수 있음

그렇다면 absolute와 static은?

> Whereas the position and dimensions of an element with position:absolute are relative to its containing block, the position and dimensions of an element with position:fixed are always relative to the initial containing block. This is normally the viewport: the browser window or the paper’s page box.

- `position: absolute;`는 바로 상위 컨테이너의 위치에 상대적
- `position: fixed;`는 최상위 컨테이너 위치에 상대적

# background, box-shadow

- background는 기본적으로 transparent
- 디자인이 심심할 때에는 box-shadow를 사용해보자

투명한 글자를 만들기 위해서는,

```css
. {
  /* background는 해주든지, 명시적으로 transparent 써주든지 */
  border: 2.4rem solid #fff;
  /* 원이라면 */
  border-radius: 50%;
}
```

# text uppercase

컨테이너 안의 글자를 모두 대문자로 만드는 속성은?

```css
. {
  text-transform: uppercase;
}
```
