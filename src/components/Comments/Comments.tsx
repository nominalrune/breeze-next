import React, { useState } from "react";
import NestedForm from '@/components/Inputs/NestedForm';
import type { TaskDTO } from "@/models/Task";
import type { Record, RecordDTO } from "@/models/Record";
import type { UserDTO } from "@/models/User";
import { Comment, type CommentDTO, type Commentable } from '@/models/Comment';
import SkeletonLine from '../Skeletons/SkeletonLine';
import toast from 'react-hot-toast';
import { FaRegCommentDots } from 'react-icons/fa';
import SkeletonCard from '../Skeletons/SkeletonCard';

type CommentsParams<T extends Commentable> = {
	className?:string,
	commentable: T,
	loginUser: UserDTO | undefined,
	update: () => void,
	open?: boolean;
};
type CommentBodyParams<T extends Commentable> = {
	className?:string,
	commentable: T,
	loginUser: UserDTO | undefined,
	update: () => void,
	open?: boolean;
};
type CommentButtonParams<T extends Commentable> = {
	className?:string,
	commentable: T,
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


export function Comments<T extends Commentable>({ className='',commentable, loginUser, update, open:_open = false }: CommentsParams<T>) {
	const [open, setOpen] = useState(_open);
	if (!commentable) return (<div className="m-3"><SkeletonLine /></div>);
	return (<>
		<CommentButton className={className} commentable={commentable} setOpen={setOpen} />
		<CommentBody className={className} commentable={commentable} loginUser={loginUser} update={update} open={open} />
		</>
	);
}
export function CommentButton<T extends Commentable>({ className='',commentable,setOpen }: CommentButtonParams<T>) {
	const { comments = [] } = commentable;
	return (<>
	<div onClick={()=>setOpen((open:boolean)=>!open)} className={className+" p-2 inline-flex items-center gap-1 text-slate-500 group-open:text-slate-300 hover:text-slate-900 hover:bg-slate-50 rounded cursor-pointer"}>
					<FaRegCommentDots className="inline" />{comments.length}
				</div>
		</>
	);
}
export function CommentBody<T extends Commentable>({ className='',commentable, loginUser, update, open }: CommentBodyParams<T>) {
	const [editing, setEditing] = useState<number>();
	const { comments = [] } = commentable;
	return (<>
		<details open={open} className={"group "+className} ><summary className='hidden'></summary>
			{
				comments.map((comment) => {
					const date = new Date(comment.updated_at);
					return (
						<div key={comment.id} id={"comment-" + comment.id} className="flex items-start border-b-[1px] border-slate-300 py-2">
							<img className="m-2 row-span-4" src={"/img/user.png"} alt="" width={48} height={48} />

							<div className="w-full">
								<div className="flex justify-between">
									<div className="m-2">{comment.user?.name}</div>
									<div className="m-2">{date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()} {date.getHours()}:{date.getMinutes()}</div>
								</div>

								{editing === comment.id
									? <Edit comment={comment as CommentDTO<T>} commentable={commentable} setEditing={setEditing} update={update} />
									: <div className="m-2 col-span-3 row-span-3 whitespace-pre-wrap relative">
										{loginUser && loginUser.id === comment.user_id && <div className="absolute right-2 cursor-pointer text-slate-400 hover:text-slate-600" onClick={() => setEditing(comment.id)}>編集</div>}
										{comment.body}
									</div>
								}
							</div>
						</div>);
				})
			}
			{loginUser ? <div className="flex items-start">
				<img className="m-2 aspect-square" src={"/img/user.png"} alt="" width={48} height={48} />
				<div className="w-full">
					<div className="m-2">{loginUser.name}</div>
					<Edit commentable={commentable} update={update} />
				</div>
			</div> : <SkeletonCard />}
		</details>
		</>
	);
}
interface EditProp<T extends Commentable> {
	commentable: T,
	className?: string,
	comment?: CommentDTO<T>, setEditing?: (p: any) => void,
	update: () => void;
}
function Edit<T extends Commentable>({ commentable, className, comment, setEditing, update }: EditProp<T>) {
	return (
		<div className={className}>
			<NestedForm
				properties={getProps(commentable, comment)}
				primaryAction={{
					label: "コメントする", onClick: (data) => {
						comment // @ts-expect-error
							? Comment.update({ ...comment, ...data }).then((res) => {
								setEditing?.(undefined);
								update();
								toast.success("コメントを更新しました");
							}, (err) => {
								toast.error("コメントの更新に失敗しました");
							}) // @ts-expect-error
							: Comment.create(data).then((res) => {
								setEditing?.(undefined);
								update();
								toast.success("コメントを追加しました");
							}, (err) => {
								toast.error("コメントの追加に失敗しました");
							});
						return Promise.resolve();
					}
				}}
				cancelAction={{
					label: "キャンセル", onClick: (data) => {
						setEditing && setEditing(undefined);
						return Promise.resolve();
					}
				}}
			/></div>
	);
};

function getProps<T extends Commentable>(commentable: T, comment?: CommentDTO<T>) {
	return [
		{
			name: "id",
			defaultValue: comment?.id,
			type: "hidden",
		},
		{
			name: "commentable_type",
			defaultValue: commentable.kind,
			type: "hidden",
		},
		{
			name: "commentable_id",
			defaultValue: commentable.id,
			type: "hidden",
		},
		{
			name: "body",
			defaultValue: comment?.body,
			type: "textarea",
			attributes: { "placeholder": "コメントを書く..." }
		},
	] as const;
}
