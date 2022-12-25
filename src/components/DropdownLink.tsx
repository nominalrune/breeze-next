import { Link } from "react-router-dom";
import { Menu } from '@headlessui/react'
type Props={
    children?: React.ReactNode,
    [other: string]: any
}
const DropdownLink = ({ children, to,...props }:Props&{to:string}) => (
    <Menu.Item>
        {({ active }) => (
            <Link
            to={to}
                {...props}
                className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${
                    active ? 'bg-gray-100' : ''
                } focus:outline-none transition duration-150 ease-in-out`}>
                {children}
            </Link>
        )}
    </Menu.Item>
)

export const DropdownButton = ({ children, ...props }:Props) => (
    <Menu.Item>
        {({ active }) => (
            <button
                className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${
                    active ? 'bg-gray-100' : ''
                } focus:outline-none transition duration-150 ease-in-out`}
                {...props}>
                {children}
            </button>
        )}
    </Menu.Item>
)

export default DropdownLink
