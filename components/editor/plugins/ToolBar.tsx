import { $createCodeNode, $isCodeNode, getCodeLanguages, getDefaultCodeLanguage } from "@lexical/code";
import {
    $isListNode, ListNode
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode, $createQuoteNode, $isHeadingNode } from "@lexical/rich-text";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
    $createParagraphNode, $getNodeByKey, $getSelection, $isRangeSelection, CLICK_COMMAND, LexicalEditor, SELECTION_CHANGE_COMMAND
} from "lexical";
import { useCallback, useEffect, useMemo, useState } from "react";
import BlockStyle from "./BlockStyle";
import Divider from "./Divider";
import { ExportContent } from "./ExportContent";
import ListStyle, { ListType } from "./ListStyle";
import { GetPrismLanguages } from "./PrismLanguages";
import TextStyle from "./TextStyle";

const Dada = (editor: LexicalEditor) => {
    ExportContent(editor)
}

const ToolBar = () => {

    // BlockStyle系のセットアップ
    const [isParagraph, setIsParagraph] = useState(false)
    const [isH1, setIsH1] = useState(false)
    const [isH2, setIsH2] = useState(false)
    const [isH3, setIsH3] = useState(false)
    const [isQuote, setIsQuote] = useState(false)
    const [isCodeBlock, setIsCodeBlock] = useState(false)
    const blockStyles: {
        name: string, icon: string, tooltip: string, active: boolean, creator: any
    }[] = [
            { name: "paragraph", icon: "bi-text-paragraph", tooltip: "段落", active: isParagraph, creator: $createParagraphNode },
            { name: "h1", icon: "bi-type-h1", tooltip: "見出し1", active: isH1, creator: $createHeadingNode },
            { name: "h2", icon: "bi-type-h2", tooltip: "見出し2", active: isH2, creator: $createHeadingNode },
            { name: "h3", icon: "bi-type-h3", tooltip: "見出し3", active: isH3, creator: $createHeadingNode },
            { name: "quote", icon: "bi-quote", tooltip: "引用", active: isQuote, creator: $createQuoteNode },
            { name: "codeq", icon: "bi-code-square", tooltip: "コードブロック", active: isCodeBlock, creator: $createCodeNode },
            //{ name: "code", icon: "bi-code", tooltip: "コードブロック", active: isCodeBlock, creator: $createCustomCodeNode },
        ]

    // ListStyle系のセットアップ
    const [isUnorderedList, setIsUnorderedList] = useState(false)
    const [isOrderedList, setIsOrderedList] = useState(false)
    const listStyles: {
        name: ListType, icon: string, tooltip: string, active: boolean
    }[] = [
            { name: "ul", icon: "bi-list-ul", tooltip: "リスト", active: isUnorderedList },
            { name: "ol", icon: "bi-list-ol", tooltip: "番号付きリスト", active: isOrderedList },
        ]

    // TextStyle系のセットアップ
    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)
    const [isUnderline, setIsUnderline] = useState(false)
    const [isStrikethrough, setIsStrikethrough] = useState(false)
    const [isCode, setIsCode] = useState(false)
    const textStyles: { name: string, icon: string, tooltip: string, active: boolean }[] = [
        { name: "bold", icon: "bi-type-bold", tooltip: "太字", active: isBold },
        { name: "italic", icon: "bi-type-italic", tooltip: "斜体", active: isItalic },
        { name: "underline", icon: "bi-type-underline", tooltip: "下線", active: isUnderline },
        { name: "strikethrough", icon: "bi-type-strikethrough", tooltip: "取り消し線", active: isStrikethrough },
        { name: "code", icon: "bi-code-slash", tooltip: "コード", active: isCode },
    ]

    const [editor] = useLexicalComposerContext();
    const [selectedElementKey, setSelectedElementKey] = useState(null);

    const [codeLanguage, setCodeLanguage] = useState("");
    const [codeLanguages, setCodeLanguages] = useState([""])
    useEffect(() => {
        (async () => {
            // getCodeLanguagesだと必要なものが返ってこないので、
            // ここで定義する
            const languages = await GetPrismLanguages()
            setCodeLanguages(languages)
        })();
    }, []);

    const updateToolbar = useCallback(() => {
        console.log("--- UPDATE TOOL BAR START ---")
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const anchorNode = selection.anchor.getNode();
            const element =
                anchorNode.getKey() === "root"
                    ? anchorNode
                    : anchorNode.getTopLevelElementOrThrow();

            const elementKey = element.getKey();
            const elementDOM = editor.getElementByKey(elementKey);

            if (elementDOM !== null) {
                setSelectedElementKey(elementKey);
                if ($isListNode(element)) {
                    const parentList = $getNearestNodeOfType(anchorNode, ListNode);
                    const type = parentList ? parentList.getTag() : element.getTag();

                    // Listのstateを設定
                    setIsUnorderedList(type === "ul")
                    setIsOrderedList(type === "ol")
                } else {
                    const type = $isHeadingNode(element)
                        ? element.getTag()
                        : element.getType();

                    // ここに入った時点でListではないのでListを解除
                    setIsUnorderedList(false)
                    setIsOrderedList(false)

                    // ToDo: 途中でTrueになったらそれ以降はやらなくても良い
                    setIsParagraph(type === "paragraph")
                    setIsH1(type === "h1")
                    setIsH2(type === "h2")
                    setIsH3(type === "h3")
                    setIsQuote(type === "quote")
                    setIsCodeBlock(type === "code")

                    if ($isCodeNode(element)) {
                        console.log("CODE!!!!")
                        setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
                        console.log(codeLanguage)
                    }
                }
            }

            // TextStyleの情報をアップデート
            setIsBold(selection.hasFormat("bold"))
            setIsItalic(selection.hasFormat("italic"))
            setIsUnderline(selection.hasFormat("underline"))
            setIsStrikethrough(selection.hasFormat("strikethrough"))
            setIsCode(selection.hasFormat("code"))

        }
    }, [editor]);

    const codeLanguges = useMemo(() => getCodeLanguages(), []);
    const onCodeLanguageSelect = useCallback(
        (e) => {
            editor.update(() => {
                if (selectedElementKey !== null) {
                    console.log(selectedElementKey)
                    const node = $getNodeByKey(selectedElementKey);
                    if ($isCodeNode(node)) {
                        node.setLanguage(e.target.value);
                    }
                }
            });
        },
        [editor, selectedElementKey]
    );

    // ToDo: この辺よくわかっていないので勉強が必要
    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    updateToolbar();
                    console.log("RegisterUpdate")
                });
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                (_payload, newEditor) => {
                    console.log("selection_change_command!!")
                    updateToolbar();
                    return false;
                },
                1
            ),
            editor.registerCommand(
                CLICK_COMMAND,
                (_payload, newEditor) => {
                    updateToolbar();
                    return false;
                },
                1
            ),
        );
    }, [editor, updateToolbar])

    return (
        <div className="flex flex-row">
            {blockStyles.map((style) => {
                return <BlockStyle
                    key={style.icon}
                    editor={editor}
                    name={style.name}
                    icon={style.icon}
                    tooltip={style.tooltip}
                    active={style.active}
                    nodeCreator={style.creator}
                />
            })}
            <Divider />
            {listStyles.map((style) => {
                return <ListStyle
                    key={style.icon}
                    editor={editor}
                    name={style.name}
                    icon={style.icon}
                    tooltip={style.tooltip}
                    active={style.active}
                />
            })}
            <Divider />

            {textStyles.map((style) => {
                return <TextStyle
                    key={style.icon}
                    editor={editor}
                    name={style.name}
                    icon={style.icon}
                    tooltip={style.tooltip}
                    active={style.active}
                />
            })}


            <Divider />
            <Select
                className="toolbar-item code-language"
                onChange={onCodeLanguageSelect}
                options={codeLanguages}
                value={codeLanguage}
            />
            <Divider />
            <button onClick={() => Dada(editor)}><i className="bi-download" /></button>
        </div>
    )
}
export default ToolBar

function Select({ onChange, className, options, value }) {
    return (
        <select className={className} onChange={onChange} value={value}>
            <option hidden={true} value="" />
            {options.map((option) => (
                <option key={Object.keys(option)[0]} value={Object.keys(option)[0]}>
                    {option[Object.keys(option)[0]]}
                </option>
            ))}
        </select>
    );
}
