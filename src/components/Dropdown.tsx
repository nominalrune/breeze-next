import React, { useId, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
type Props = {
	align?: string,
	width?: string | number,
	contentClasses?: string,
	trigger?: React.ReactNode,
	children?: React.ReactNode,
};
const Dropdown = ({
	align = 'right',
	width = 48,
	contentClasses = 'py-1 bg-white',
	trigger,
	children,
}: Props) => {
	let alignmentClasses: string;

	switch (align) {
		case 'left':
			alignmentClasses = 'origin-top-left left-0';
			break;
		case 'top':
			alignmentClasses = 'origin-top';
			break;
		case 'right':
		default:
			alignmentClasses = 'origin-top-right right-0';
			break;
	}
	const id = useId();
	return (
		<div className="relative">
			<button
				popovertarget={id}
			>{trigger}</button>
			<div
				id={id}
				popover="auto"
				className={`top-8 left-auto right-8 m-0 w-${width} rounded-md shadow-lg ${alignmentClasses}`}>
					{children}
			</div>
		</div>
	);
};

export default Dropdown;
