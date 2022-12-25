import type {User} from '@/models/User';
import create from '@/models/Task/create';
import { useState } from 'react';
export function Create({ user }: { user: User; }) {
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        status: 0,
        parent_task: ''
    });
    function handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    return (
        <form>
            <input type="text" name="title" value={inputs.title} onChange={handleChange} />
            <textarea name="description" value={inputs.description} onChange={handleChange}/>
            <input type="number" name="status" value={inputs.status} onChange={handleChange}/>
            <input type="text" name="parent_task" value={inputs.parent_task} onChange={handleChange}/>
        </form>
    );
}
