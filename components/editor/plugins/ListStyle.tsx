import { insertList, removeList } from "@lexical/list";
import { LexicalEditor } from "lexical";
import Button from "./Button";

export type ListType = "ul" | "ol"
type ListProps = {
    editor: LexicalEditor
    name: ListType
    icon: string
    tooltip: string
    active: boolean
}

const ListStyle = (props: ListProps) => {

    const formatter = () => {
        props.active
            ? removeList(props.editor)
            : insertList(props.editor, props.name)
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
export default ListStyle
