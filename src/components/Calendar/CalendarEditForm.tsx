
import EditForm, { Property } from '@/components/Inputs/EditForm';

interface Param {
	defaultValues: {
		[key: string]: string;
	},
	onCancel: () => void,
	onSuccess: (values: {
		[key: string]: string;
	}) => void;
}

export default function CalendarEditForm({ defaultValues, onCancel, onSuccess }: Param) {

	const props: Property[] = [
		{
			propName: "id",
			defaultValue: defaultValues?.id ?? "",
			type: "hidden",
		},
		{
			propName: "event_type",
			label: "予定タイプ",
			type: "select",
			defaultValue: defaultValues?.event_type ?? "授業",
			options: [
				["授業", "lecture"],
			]
		},
		{
			propName: "title",
			label: "タイトル",
			type: "text",
			defaultValue: defaultValues?.title ?? "",
			required: true,
		},
		{
			propName: "date",
			type: "date",
			label: "日付",
			defaultValue: defaultValues?.date ?? new Date().toISOString().replace(/T\d\d:\d\d\:\d\d\.\d+Z/, ""),
		},
		{
			propName: "start_at",
			label: "開始時間",
			type: "time",
			defaultValue: defaultValues?.start_at ?? "00:00",
		},
		{
			propName: "end_at",
			label: "終了時間",
			type: "time",
			defaultValue: defaultValues?.end_at ?? "00:00",
		},
		{
			propName: "description",
			label: "説明",
			type: "textarea",
			defaultValue: defaultValues?.description ?? "",
		},
		{
			propName: "state",
			defaultValue: defaultValues?.state ?? "active",
			type: "hidden",

		},
	];
	return <EditForm
		method="post"
		routeName='calendar.update'
		urlParams={{ calendar_event: defaultValues?.id }}
		properties={props}
		submitLabel="更新"
		cancel={{ label: "キャンセル", handleCancel: onCancel }}
		handleSuccess={onSuccess}
	/>;
}
