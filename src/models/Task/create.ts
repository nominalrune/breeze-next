import useSWR from 'swr';
import axios from '@/lib/axios';
import type { Dispatch } from 'react';

import type { User } from '@/models/User';
import type { Task } from '@/models/Task';
type Params = {
    task: Omit<Task, "id">,
    setErrors: Dispatch<React.SetStateAction<any>>,
};

export default async function create({ task, setErrors }: Params) {
    const csrf = () => axios.get('/sanctum/csrf-cookie');
    await csrf();
    try {
        const result = await axios.post('/api/tasks', task);
        return result.data;
    } catch (error) {
        setErrors(error.response.data.errors);
    }
};
