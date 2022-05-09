type ButtonProps = {
    name: string
    icon: string
    tooltip: string
    active: boolean
    func: any
}

const Button = (props: ButtonProps) => {

    return (
        <div className="relative flex flex-col items-center group has-tooltip">
            <button
                key={props.name}
                className="hover:bg-slate-300 rounded active p-2 m-0.5"
                onClick={() => props.func()}>
                <i className={`flex h-4 w-4 ${props.icon} ${props.active ? "button-active" : ""}`}></i>
            </button>
            <div className="absolute bottom-2 flex flex-col items-center invisible mb-6 group-hover:visible width-over tooltip">
                <span className="relative z-10 p-2 -mt-9 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg rounded tooltip">{props.tooltip}</span>
                <div className="w-2.5 h-2.5 -mt-2 rotate-45 bg-black"></div>
            </div>
        </div>

    )
}
export default Button
