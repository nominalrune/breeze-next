import { z } from "zod";
const UserDTOSchema = z.object({
	id: z.number(),
	name: z.string(),
	email: z.string().email(),
	email_verified_at: z.string().datetime().nullish(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime()
});
export default UserDTOSchema;
