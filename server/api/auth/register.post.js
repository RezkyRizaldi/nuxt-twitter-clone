import { createUser } from '~~/server/db/users';
import { userTransformer } from '~~/server/transformers/user';

export default defineEventHandler(async (e) => {
	const { email, name, password, repeatPassword, username } = await readBody(e);

	if (!email || !name || !password || !repeatPassword || !username) {
		return sendError(e, createError({ statusCode: 422, statusMessage: 'Invalid credentials.' }));
	}

	if (password !== repeatPassword) {
		return sendError(e, createError({ statusCode: 422, statusMessage: 'Password do not match our records.' }));
	}

	const userData = {
		email,
		name,
		username,
		password,
		profileImage: 'https://picsum.photos/200/200',
	};

	const user = await createUser(userData);

	return { user: userTransformer(user) };
});
