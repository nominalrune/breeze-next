export interface Task{
    id: number,
    title:string,
    description: string,
    status:number,
    parent_task_id?:number,
    parent_task?:Task,
}


