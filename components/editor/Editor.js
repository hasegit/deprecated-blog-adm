import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { CustomCodeNode } from "./plugins/CustomCodeNode";
import LexicalComposer from "@lexical/react/LexicalComposer";
import ContentEditable from "@lexical/react/LexicalContentEditable";
import RichTextPlugin from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import ToolBar from "./plugins/ToolBar";
import StandardTheme from "./themes/StandardTheme";


const Editor = () => {
    return (
        <div className="border rounded m-3">
            <LexicalComposer initialConfig={{
                theme: StandardTheme, onError(error) {
                    throw error;
                },
                nodes: [
                    HeadingNode,
                    ListNode,
                    ListItemNode,
                    QuoteNode,
                    CodeNode,
                    CodeHighlightNode,
                    TableNode,
                    TableCellNode,
                    TableRowNode,
                    AutoLinkNode,
                    LinkNode,
                    CustomCodeNode,
                ]
            }}>
                <ToolBar />
                <div className="border-t">

                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable
                                id="editor-container"
                                className="
                                custom-min-h
                                resize-none
                                text-sm
                                caret-zinc-500
                                px-4 py-3
                                outline-none
                                "
                            />
                        }
                    />

                </div>

            </LexicalComposer>
                    <div id="content"></div>
        </div>
    )
}
export default Editor
