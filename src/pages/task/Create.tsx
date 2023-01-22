import type {User} from '@/models/User';
import create from '@/models/Task/create';
import { useState } from 'react';
export function Create({ user }: { user: User; }) {
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        status: 0,
        parent_task_id: NaN
    });
    const [errors, setErrors]=useState<any>()
    function handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        create({task:inputs, setErrors});
    }
    return (
        <form>
            <input type="text" name="title" value={inputs.title} onChange={handleChange} />
            <textarea name="description" value={inputs.description} onChange={handleChange}/>
            <input type="number" name="status" value={inputs.status} onChange={handleChange}/>
            <input type="number" name="parent_task_id" value={inputs.parent_task_id} onChange={handleChange}/>
        </form>
    );
}
