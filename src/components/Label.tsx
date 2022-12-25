type Props={className?:string, children?:React.ReactNode, [other:string]:any}
const Label = ({ className, children, ...props }:Props) => (
    <label
        className={`${className+" " }block font-medium text-sm text-gray-700`}
        {...props}>
        {children}
    </label>
)

export default Label
