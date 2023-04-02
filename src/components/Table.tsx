

interface Props<T extends Record<string, React.ReactNode|object>> {
	items:T[]|undefined,
	keys:Extract<keyof T, string>[],
}

export function Table<T extends Record<string, React.ReactNode|object>>({items, keys}:Props<T>) {
	return items?(
		<table className='m-6 bg-white/50 rounded-sm' >
			<thead>
				<tr className='border-b-[1px] border-slate-300'>
					{
						keys.map((key) => (
							<th key={key} scope="col" className='p-2 px-3 border-r-[1px] border-slate-200 last:border-r-0'>{key}</th>
						))
					}
				</tr>
			</thead>
			<tbody>
				{
					items.map((item) => (
						<tr key={'id' in item && item.id||undefined} className='border-b-[1px] border-slate-300 last:border-b-0 hover:bg-white'>
							{
								keys.map((key) => (
									<td key={key} className='p-2 px-3 border-r-[1px] border-slate-200 last:border-r-0'>{item[key]}</td>
								))
							}
							</tr>
					))}
				</tbody>
		</table>
	):<>no data found</>;
}
