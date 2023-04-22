import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { api } from '@/hooks/useApi';
import type { AuthParam } from '@/models/User';
import type { RecordDTO } from '@/models/Record';
import type { TaskDTO } from '@/models/Task';
import { FloatingActionButton } from '@/components/Buttons/FloatingActionButton';
import type { CalendarEvent, CalendarEventDTO, CalendarEventInput } from '@/models/CalendarEvent';
import {  FiChevronLeft, FiChevronRight, FiEdit, FiEdit2 } from 'react-icons/fi';
import type { CalendarEntry } from '@/models/CalendarEntry';
import CalendarEditForm from '@/components/Calendar/CalendarEditForm';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import type { EventInput, EventClickArg, EventApi, CalendarApi } from '@fullcalendar/core';
import MonthSelector from '@/components/MonthSelector';
import { useMonth } from '@/hooks/useMonth';

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
    const [events, setEvents] = useState<CalendarEntry[]>([]);
    const params = Object.fromEntries([...new URL(location.href).searchParams.entries()]);
    const {month, setNextMonth, setPrevMonth} = useMonth(params.start ? new Date(params.start) : new Date());
    const [calendarApi, setCalendarApi] = useState<CalendarApi>();
    useEffect(() => {
        const url = encodeURI(`/calendar?display_type=month&start=${month.getFullYear()}-${month.getMonth() + 1}`);
        api.get<CalendarEntry[]>(url).then(({ data }) => {
            console.log("fetched:", data);
            setEvents(data);
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
        setModalAttr({ title: event.title, mainText: getModalText(event), event: event.extendedProps });
        setShowModal(true);
    }
    function nextMonth() {
        if (!calendarApi) return;
        setNextMonth();
        calendarApi.next();
    }
    function prevMonth() {
        console.log("prev");
        if (!calendarApi) return;
        setPrevMonth();
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
        <MonthSelector month={month} onClickNext={nextMonth} onClickPrevious={prevMonth} />

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
