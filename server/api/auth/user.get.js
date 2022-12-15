import { userTransformer } from '~~/server/transformers/user';

export default defineEventHandler(async (e) => ({
	user: userTransformer(e.context.auth?.user),
}));
