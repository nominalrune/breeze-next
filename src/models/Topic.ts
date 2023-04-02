
export interface TopicDTO {
	id: number;
	title: string;
	description?: string;
	image_url?: string;
}

export class Topic {
	public class = "App\\Models\\Topic";
	public id: number;
	public title: string;
	public description?: string;
	public image_url?: string;
	constructor(topic: TopicDTO) {
		this.id = topic.id;
		this.title = topic.title;
		this.description = topic.description;
		this.image_url = topic.image_url;
	}
	public toDTO(): TopicDTO {
		return {
			id: this.id,
			title: this.title,
			description: this.description,
			image_url: this.image_url,
		};
	}
}
