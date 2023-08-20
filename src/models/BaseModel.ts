export default interface BaseModel {
	kind: string;
	// fromDTO(DTO: DTO): BaseModel;
	toFormData(): object;
}

