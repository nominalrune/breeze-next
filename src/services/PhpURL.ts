export default class PhpURL{
	constructor(
		private url:string,
		private query?:{[key:string]:string|number|(string|number)[]}
		){}
	toString(){
		return this.toPHPURLQuery();
	}
	toPHPURLQuery(){
		if(!this.query){return this.url;}
		const urlNotEncoded= Object.entries(this.query).reduce((acc,[k,v])=>(
			v instanceof Array
			? `${acc}${v.reduce((_acc,_cur)=>(`${_acc}&${k}[]=${_cur}`),"")}`
			:`${acc}&${k}=${v}`
			),`${this.url}?`);
		return encodeURI(urlNotEncoded);
	}
}
