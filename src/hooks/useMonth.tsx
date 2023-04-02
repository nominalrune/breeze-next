import { useState} from 'react';

function getFirstDayOfMonth(date:Date){
	const first = new Date(0);
	first.setFullYear(date.getFullYear());
	first.setMonth(date.getMonth());
	return first;
}

export function useMonth(date?:Date){
	const [month, setMonth]=useState(getFirstDayOfMonth(date?date:new Date()));
	function setNextMonth() {
		setMonth(month => {
			const next = new Date(month.getTime());
			next.setMonth(month.getMonth() + 1);
			return next;
		});
	}
	function setPrevMonth() {
		setMonth(month => {
			const prev = new Date(month.getTime());
			prev.setMonth(month.getMonth() - 1);
			return prev;
		});
	}
	return {month, setNextMonth, setPrevMonth};
}

