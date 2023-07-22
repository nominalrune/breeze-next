
import {  FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface MonthSelectorProps {
	month: Date;
	onClickPrevious:()=>void;
	onClickNext:()=>void;
}

export default function MonthSelector({month, onClickPrevious, onClickNext}:MonthSelectorProps){

	return (
		<div className="left-0 right-0 flex flex-row justify-center gap-8 items-center p-3 bg-white">
            <div onClick={onClickPrevious} className='p-2 rounded-md active:box-content hover:bg-slate-200 active:bg-slate-300'><FiChevronLeft /></div>
            <div className='p-2 rounded-md text-xl hover:bg-slate-200 active:bg-slate-300'>{`${month.getFullYear()}年${month.getMonth() + 1}月`}</div>
            <div onClick={onClickNext} className='p-2 rounded-md hover:bg-slate-200 active:bg-slate-300'><FiChevronRight /></div>
        </div>
	);
}
