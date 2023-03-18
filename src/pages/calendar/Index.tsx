import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { axios } from '@/lib/useAxios';
import type { AuthParam } from '@/models/User';
import type { Record } from '@/models/Record';
import type { Task } from '@/models/Task';
import { FloatingActionButton } from '@/components/Buttons/FloatingActionButton';
import { CalendarEvent, CalendarEventDTO, CalendarEventInput } from '@/models/CalendarEvent';
import { FiPlus, FiChevronLeft, FiChevronRight, FiRepeat, FiEdit, FiEdit2 } from 'react-icons/fi';

import CalendarEditForm from '@/components/Calendar/CalendarEditForm';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import type { EventInput, EventClickArg, EventApi, CalendarApi } from '@fullcalendar/core';

import jaLocale from '@fullcalendar/core/locales/ja';
import { Modal, ModalProps } from '@/components/Modals/Modal';

interface EventClickInfo<T> extends EventClickArg {
    el: HTMLElement,
    event: {
        extendedProps: T;
    } & any,
    jsEvent: any,
    view: any,
}

export function Index({ user }: AuthParam) {
    const [events, setEvents] = useState<CalendarEventInput[]>([]);
    const params = Object.fromEntries([...new URL(location.href).searchParams.entries()]);
    const [month, setMonth] = useState(params.start ? new Date(params.start) : (() => { const d = new Date(0); d.setFullYear(new Date().getFullYear()); d.setMonth(new Date().getMonth()); return d; })());
    const [calendarApi, setCalendarApi] = useState<CalendarApi>();
    useEffect(() => {
        const url = encodeURI(`/api/calendar?display_type=month&start=${month.getFullYear()}-${month.getMonth() + 1}`);
        axios.get<CalendarEventDTO[]>(url).then(({ data }) => {
            console.log("fetched:", data, data.map(event => new CalendarEvent(event).toEvent()));
            setEvents(data.map(event => new CalendarEvent(event).toEvent()));
        });
    }, [month]);

    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalAttr, setModalAttr] = useState<Omit<ModalProps, 'close'> & { event?: CalendarEventDTO; }>({ title: '' });

    function getModalText(event: CalendarEventInput) {
		// console.log({event})
        let time = `${event.start.getHours()}:${event.start.getMinutes().toString().padStart(2, "0")}`;
        let duration: number | undefined = undefined;
        if (event.end && event.start < event.end) {
            time += `~${event.end.getHours()}:${event.end.getMinutes().toString().padStart(2, "0")}`;
            duration = (event.end.getHours() * 60 + event.end.getMinutes()) - (event.start.getHours() * 60 + event.start.getMinutes());
        }
        return (
            <>
                <div className='flex justify-end'>
                    <div
                        className='p-2 rounded-md text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                        onClick={() => {
                            setIsEdit(true);
                        }}
                    ><FiEdit /></div>
                </div>
                <div className='flex flex-col'>
                    {time}
                    {duration && <span className='text-xs' >{duration}分</span>}
                </div>
            </>
        );
    }
    function handleEventClick(p: EventClickInfo<CalendarEventInput>) {
		const {event }:{event:CalendarEventInput}=p;
        console.log({ event });
        setModalAttr({ title: event.title, mainText: getModalText(event), event: event.extendedProps?.toFormData() });
        setShowModal(true);
    }
    function nextMonth() {
        if (!calendarApi) return;
        setMonth(month => {
            const next = new Date(month.getTime());
            next.setMonth(month.getMonth() + 1);
            return next;
        });
        calendarApi.next();
    }
    function prevMonth() {
        console.log("prev");
        if (!calendarApi) return;
        setMonth(month => {
            const prev = new Date(month.getTime());
            prev.setMonth(month.getMonth() - 1);
            return prev;
        });
        calendarApi.prev();
    }
    return (<>
    {
        showModal && isEdit
            ? <Modal {...modalAttr} close={() => { setIsEdit(false); setShowModal(false); }} mainText={<CalendarEditForm defaultValues={modalAttr.event??{}} onCancel={() => { setIsEdit(false); setShowModal(false); }} onSuccess={() => { setIsEdit(false); setShowModal(false); }} />} />
            : showModal
                ? <Modal close={() => { setShowModal(false); }} okButton={{ label: 'OK', onClick: () => { setShowModal(false); } }} {...modalAttr} />
                : <></>
    }
        <div className="flex flex-row justify-center gap-8 items-center p-3 bg-white">
            <div onClick={prevMonth} className='p-2 rounded-md active:box-content hover:bg-slate-200 active:bg-slate-300'><FiChevronLeft /></div>
            <div className='p-2 rounded-md text-xl hover:bg-slate-200 active:bg-slate-300'>{`${month.getFullYear()}年${month.getMonth() + 1}月`}</div>
            <div onClick={nextMonth} className='p-2 rounded-md hover:bg-slate-200 active:bg-slate-300'><FiChevronRight /></div>
        </div>

        <div className="m-1 md:m-6 bg-white overflow-hidden shadow-sm rounded-lgm-3 md:p-6">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={handleEventClick as unknown as (info: EventClickInfo<CalendarEvent>) => void}
                viewDidMount={(info) => { console.log("viewDidMount", info); setCalendarApi(info.view.calendar); }}
                locale={jaLocale}
                headerToolbar={false}
                height={"80vh"}
            />
        </div>
        <FloatingActionButton icon={<FiEdit2 />} />

    </>);
}
