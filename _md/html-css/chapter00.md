---
title: 들어가기 전
date: 2024-04-29
---

:::div{.box .list}
**목차**

1. [수업 전 알아두기](/html-css/chapter00/00-1)
2. [WEB](/html-css/chapter00/00-2)
3. [HTML5? CSS3?](/html-css/chapter00/00-3)

:::

## HTML/CSS 둘다 있는 경우

:::div{.htmlPlay}

```html
<input type="text" />
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga impedit nam
</p>
```

```css
input {
  background: skyblue;
}
```

:::

## HTML만 있는 경우

:::div{.htmlPlay}

```html
<input type="text" />
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga impedit nam
</p>
```

:::

## CSS만 있는 경우

:::div{.htmlPlay}

```css
input {
  background: skyblue;
}
```

:::

## `:::div{.htmlPlay}`내용`:::`로 감싸지 않음

```html
<input type="text" />
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga impedit nam
  quis iusto quod vel architecto exercitationem consequuntur magni aperiam amet
  quas quos officia reiciendis excepturi, molestiae eveniet explicabo quia?
</p>
```

```css
input {
  background: skyblue;
}
```
