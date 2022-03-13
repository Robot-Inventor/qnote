interface QnoteToken {
    type: "qnote";
    raw: string;
    text: string;
    class: string;
    tokens: Array<unknown>;
}

interface Qnote {
    name: string;
    level: "block" | "inline";

    start: (src: string) => number | undefined;
    tokenizer: (src: string) => QnoteToken | void;
    renderer: (token: QnoteToken) => string;

    lexer: {
        blockTokens: (text: string, token: QnoteToken["tokens"]) => void;
    };

    parser: {
        parse: (tokens: Array<unknown>) => string;
    };
}

/**
 * [Marked](https://github.com/markedjs/marked) extension for parsing [Qiita note notation](https://qiita.com/Qiita/items/c686397e4a0f4f11683d#note---%E8%A3%9C%E8%B6%B3%E8%AA%AC%E6%98%8E).
 * @example
 * ```javascript
 * import { marked } from "marked";
 * import { qnote } from "qnote-parser";
 *
 * marked.use({ extensions: [qnote] });
 *
 * const markdown = `Hello.
 *
 * :::note info
 * This is **note** notation.
 *
 * Paragraph is supported.
 * :::
 *
 * Good-bye!`;
 *
 * console.log(marked.parse(markdown));
 * ```
 *
 * result:
 *
 * ```html
 * <p>Hello.</p>
 * <div class="note-info">
 * <div class="note-content">
 * <p>This is <strong>note</strong> notation.</p>
 * <p>Paragraph is supported.</p>
 * </div>
 * </div>
 * <p>Good-bye!</p>
 * ```
 */
// @ts-expect-error プロパティーlexer, parserが存在しないが、Marked側で用意されているため実装する必要はない。
const qnote: Qnote = {
    name: "qnote",
    level: "block",
    start(src: string) {
        // eslint-disable-next-line prefer-named-capture-group
        return src.match(/^:::note (info|warn|alert)\n/u)?.index;
    },
    // eslint-disable-next-line consistent-return
    tokenizer(src: string) {
        // eslint-disable-next-line prefer-named-capture-group
        const rule = /^:::note (info|warn|alert)\n([\s\S]*?)\n:::/u;
        const match = rule.exec(src);
        if (match) {
            const token: QnoteToken = {
                type: "qnote",
                raw: match[0],
                text: match[2].trim(),
                class: match[1],
                tokens: []
            };
            this.lexer.blockTokens(token.text, token.tokens);
            return token;
        }
    },
    renderer(token) {
        return `<div class="note-${token.class}">\n<div class="note-content">\n${this.parser.parse(
            token.tokens
        )}</div>\n</div>\n`;
    }
};

export { qnote };
