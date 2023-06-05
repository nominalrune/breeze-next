import type { RepeatedTaskDTO } from '@/models/RepeatedTask'
import type { RecordDTO } from '@/models/Record'
interface TableParam{
	data: RecordDTO[],
	startDate: Date,
}
export function DailyTable({data, startDate}:TableParam){

	return (
		<table>
			<thead>
				<tr>
					<th>05/01</th>
					<th>05/02</th>
					<th>05/03</th>
					<th>05/04</th>
					<th>05/05</th>
					<th>05/06</th>
					<th>05/07</th>
					<th>05/08</th>
					<th>05/09</th>
					<th>05/10</th>
					<th>05/11</th>
					<th>05/12</th>
					<th>05/13</th>
				</tr>
			</thead>

		</table>
		)
}
