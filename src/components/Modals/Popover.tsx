import { useId } from "react";
type Props = {
	className?: string,
	trigger: React.ReactNode,
	children: React.ReactNode,
};
export default function Popover({ className, trigger, children }: Props) {
	const id = useId();
	return <>
		<button //@ts-expect-error
			popovertarget={id}
			type='button'
		>{trigger}</button>
		<div
			className={'overflow-visible p-0 ' + className ?? ''}
			id={id} //@ts-expect-error
			popover="auto">
			{children}
		</div>
	</>;
}
