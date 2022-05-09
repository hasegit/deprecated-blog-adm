import { $convertToMarkdownString } from "@lexical/markdown";
import { LexicalEditor } from "lexical";
import { marked } from "marked";

type Level = 1 | 2 | 3 | 4 | 5 | 6

export const ExportContent = (editor: LexicalEditor) => {
    editor.update(() => {

        // 一旦markdownとしてExport
        const markdown: string = $convertToMarkdownString();

        // カスタムレンダラーの作成
        let renderer = new marked.Renderer()

        // h1以外の見出しにsectionを付与
        renderer.heading = function (text: string, level: Level) {
            if (level === 1) {
                return `<h${level}>${text}</h${level}>`
            } else {
                return `<section>
                <h${level}>${text}</h${level}></section>`
            }
        }


        document.getElementById("content").innerHTML = marked(markdown, { renderer: renderer })
    });
}
