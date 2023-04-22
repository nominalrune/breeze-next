import {api,csrf} from '@/hooks/useApi';
import type { Dispatch } from 'react';

import type { UserDTO } from '@/models/User';
import type { TaskDTO, TaskDTO } from '@/models/Task';
type Params = {
    task: Omit<TaskDTO, "id">,
    setErrors?: Dispatch<React.SetStateAction<any>>,
};

export default async function create({ task, setErrors }: Params) {
    await csrf();
    try {
        const result = await api.post<TaskDTO>('/tasks', task);
        return result.data;
    } catch (error) {
        // setErrors(error.response.data.errors);
        console.error(error)
    }
};
