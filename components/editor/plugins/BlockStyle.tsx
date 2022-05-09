import {
    $wrapLeafNodesInElements
} from "@lexical/selection";
import {
    $createParagraphNode, $getSelection,
    $isRangeSelection, LexicalEditor
} from "lexical";
import Button from "./Button";

type BlockProps = {
    editor: LexicalEditor
    name: string
    icon: string
    tooltip: string
    active: boolean
    nodeCreator: any
}

const BlockStyle = (props: BlockProps) => {

    // 指定のBlockTypeとParagraphでToggleするように設定
    const formatter = () => {

        // Activeの場合は解除、非Activeの場合は設定
        const f = props.active ? $createParagraphNode : props.nodeCreator

        // ToDo: selectionがここに入ってきているのは微妙な気がするが、回避方法はあるか不明
        props.editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $wrapLeafNodesInElements(selection, () => f(props.name));
            }
        });
    }

    return (
        <Button
            name={props.name}
            icon={props.icon}
            tooltip={props.tooltip}
            active={props.active}
            func={() => formatter()}
        />
    )
}
export default BlockStyle
