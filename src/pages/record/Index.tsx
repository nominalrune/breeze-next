import { FloatingActionButton } from '@/components/Buttons/FloatingActionButton';
import list from '@/models/Task/list';
import type { Task } from '@/models/Task';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export function Index() {
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        list().then(data => {
            console.log({data});
            setTasks(data)
        });
    }, []);
    return (
        <div>
            <h1 className='p-3 text-3xl '>
                Tasks
            </h1>
            {
                tasks?tasks.map(task => (
                    <Link key={"task" + task.id} to={'/tasks/'+task.id} className='block m-6 p-3 bg-white shadow roundeed hover:bg-slate-50'>
                        <h2 className='p-3 text-xl'>{task.title}</h2>
                        <p className='p-1  text-slate-800' >{task.description}</p>
                    </Link>
                )):<>no data found</>
            }
            <Link to={'/tasks/create'}><FloatingActionButton icon="+" /></Link>
        </div>
    );
}
