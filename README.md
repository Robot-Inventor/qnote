# qnote-parser

[Marked](https://github.com/markedjs/marked) extension for parsing [Qiita note notation](https://qiita.com/Qiita/items/c686397e4a0f4f11683d#note---%E8%A3%9C%E8%B6%B3%E8%AA%AC%E6%98%8E).

## Installation

```shell
npm install qnote-parser
```

## Usage

```javascript
import { marked } from "marked";
import { qnote } from "qnote-parser";

marked.use({ extensions: [qnote] });

const markdown = `Hello.

:::note info
This is **note** notation.

Paragraph is supported.
:::

Good-bye!`;

console.log(marked.parse(markdown));
```

result:

```html
<p>Hello.</p>
<div class="note-info">
<div class="note-content">
<p>This is <strong>note</strong> notation.</p>
<p>Paragraph is supported.</p>
</div>
</div>
<p>Good-bye!</p>
```
