import { FORMAT_TEXT_COMMAND, LexicalEditor } from "lexical"
import Button from "./Button"

type TextProps = {
    editor: LexicalEditor
    name: string
    icon: string
    tooltip: string
    active: boolean
}

const TextStyle = (props: TextProps) => {

    const formatter = () => {
        props.editor.dispatchCommand(FORMAT_TEXT_COMMAND, props.name)
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
export default TextStyle
