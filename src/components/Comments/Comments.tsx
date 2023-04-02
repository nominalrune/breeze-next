import React, { useState } from "react";
import NestedForm, { Attr, DataModel } from '@/components/Inputs/NestedForm';
import type { TaskDTO } from "@/models/Task";
import type { Record } from "@/models/Record";
import type { UserDTO } from "@/models/User";
import { Comment, type CommentDTO, type Commentable } from '@/models/Comment';

import toast from 'react-hot-toast';
import { FaRegCommentDots } from 'react-icons/fa';

type CommentsParams<T extends Commentable> = {
	commentable: T,
	loginUser: UserDTO,
	update: () => void,
	open?: boolean;
};

export function Comments<T extends Commentable>({ commentable, loginUser, update, open = false }: CommentsParams<T>) {
	const [editing, setEditing] = useState<number>();
	const { comments = [] } = commentable;
	if (!commentable || !loginUser) return (<>woops</>);
	return (
		<details open={open} className="group mx-3 p-3">
			<summary className="m-1 list-none flex justify-end">
				<div className="p-2 flex items-center gap-1 text-slate-500 group-open:text-slate-300 hover:text-slate-900 hover:bg-slate-50 rounded cursor-pointer">
					<FaRegCommentDots className="inline" />{comments.length}
				</div></summary>
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
									? <Edit comment={comment} commentable={commentable} setEditing={setEditing} update={update} />
									: <div className="m-2 col-span-3 row-span-3 whitespace-pre-wrap relative">
										{loginUser.id === comment.user_id && <div className="absolute right-2 cursor-pointer text-slate-400 hover:text-slate-600" onClick={() => setEditing(comment.id)}>編集</div>}
										{comment.body}
									</div>
								}
							</div>
						</div>);
				})
			}
			<div className="flex items-start">
				<img className="m-2 aspect-square" src={"/img/user.png"} alt="" width={48} height={48} />
				<div className="w-full">
					<div className="m-2">{loginUser.name}</div>
					<Edit commentable={commentable} update={update} />
				</div>
			</div>
		</details>
	);
}
interface EditProp<T> {
	commentable: T, className?: string,
	comment?: CommentDTO<T>, setEditing?: (p: any) => void,
	update: () => void;
}
function Edit<T extends Commentable>({ commentable, className, comment, setEditing, update }: EditProp<T>) {
	return (
		<div className={className}>
			<NestedForm
				properties={getProps(commentable, comment)}
				primaryAction={{
					label: "コメントする", onClick: (data, fn) => {
						comment
							? Comment.update({ ...comment, ...data }).then((res) => {
								setEditing?.(undefined);
								update?.();
								toast.success("コメントを更新しました");
							}, (err) => {
								toast.error("コメントの更新に失敗しました");
							})
							: Comment.create(data).then((res) => {
								fn?.setData("body", "");
								setEditing?.(undefined);
								update?.();
								toast.success("コメントを追加しました");
							}, (err) => {
								toast.error("コメントの追加に失敗しました");
							});
					}
				}}
				cancelAction={{
					label: "キャンセル", onClick: (data, fn) => {
						fn?.setData("body", "");
						setEditing && setEditing(undefined);
					}
				}}
			/></div>
	);
};

function getProps<T extends Commentable>(commentable: T, comment?: CommentDTO<T>): Attr[] {
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
	];
}
