import { useId, useRef } from 'react';

export default function usePopover() {
	const ref = useRef<HTMLDivElement>(null);
	return {
		Popover: ({ children, className }: { children: React.ReactNode, className?: string; }) => <div ref={ref} popover='auto' className={className}>{children}</div>,
		toggle: () => {'togglePopover' in ref.current && ref.current?.togglePopover()}
	};
}
