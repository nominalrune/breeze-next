interface Param{
    type?: 'submit'|'reset'|'button',
     className?: string,
     disabled?: boolean,
     children?: React.ReactNode,
     onClick?: () => void | Promise<void>,
}

export default function SecondaryButton({ type = 'button', className = '', disabled, children, onClick=()=>{} }:Param ) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                className + " " + `inline-flex items-center justify-center  text-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${
                    disabled ? 'opacity-25' : ""
                } `
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
