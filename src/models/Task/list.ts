import {api,csrf} from '@/hooks/useApi';
import type { Dispatch } from 'react';

import type { UserDTO } from '@/models/User';
import type { TaskDTO } from '@/models/Task';


export default async function list() {
    await csrf();
    try {
        const result = await api.get('/tasks');
        // console.log("@list.ts, result",result)
        return result.data;
    } catch (error) {
        console.error(error);
    }
};
