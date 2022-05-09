import { addClassNamesToElement } from "@lexical/utils";
import {
    EditorConfig, LexicalNode, NodeKey, TextNode
} from "lexical";

export class CustomCodeNode extends TextNode {
    __language: string;

    constructor(text: string, language: string, key?: NodeKey) {
        super(text, key);
        this.__language = language;
    }

    static getType(): string {
        return 'customcode';
    }

    static clone(node: CustomCodeNode): CustomCodeNode {
        return new CustomCodeNode(node.__language, node.__key);
    }

    createDOM(config: EditorConfig<{}>): HTMLElement {
        /*
        console.log("createDOM")
        const pre = document.createElement("pre")
        const code = document.createElement("code")
        addClassNamesToElement(code, "language-js");
        pre.appendChild(code)
        return pre;
        */
        const element = document.createElement('code');
        addClassNamesToElement(element, "language-js");
        element.setAttribute('spellcheck', 'false');
        const language = "javascript"

        if (language) {
            element.setAttribute('data-highlight-language', language);
        }

        const a = document.createElement("pre")
        const b = document.createElement("code")
        a.appendChild(b)
        b.classList.add("language-js")

        console.log(a)
        return a;
    }

    updateDOM(
        prevNode: CustomCodeNode,
        dom: HTMLElement,
    ): boolean {

        if (prevNode.__language !== this.__language) {
            console.log(this.__language);
        }
        return false;
    }
}

export function $createCustomCodeNode(text: string, language: string): CustomCodeNode {
    return new CustomCodeNode(text, language);
}

export function $isColoredNode(node: LexicalNode): boolean {
    return node instanceof CustomCodeNode;
}
