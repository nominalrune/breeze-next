import {axios,csrf} from '@/lib/useAxios';
import type { Dispatch } from 'react';

import type { User } from '@/models/User';
import type { Task, TaskDTO } from '@/models/Task';
type Params = {
    task: Omit<TaskDTO, "id">,
    setErrors?: Dispatch<React.SetStateAction<any>>,
};

export default async function create({ task, setErrors }: Params) {
    await csrf();
    try {
        const result = await axios.post<TaskDTO>('/api/tasks', task);
        return result.data;
    } catch (error) {
        // setErrors(error.response.data.errors);
        console.error(error)
    }
};
