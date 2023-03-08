import {axios,csrf} from '@/lib/useAxios';
import type { Dispatch } from 'react';

import type { User } from '@/models/User';
import type { Task } from '@/models/Task';


export default async function list() {
    await csrf();
    try {
        const result = await axios.get('/api/tasks');
        // console.log("@list.ts, result",result)
        return result.data;
    } catch (error) {
        console.error(error);
    }
};
