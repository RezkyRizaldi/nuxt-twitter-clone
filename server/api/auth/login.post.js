import bcrypt from 'bcrypt';

import { createRefreshToken } from '~~/server/db/refreshTokens';
import { getUserByUsername } from '~~/server/db/users';
import { userTransformer } from '~~/server/transformers/user';
import { generateTokens, sendRefreshToken } from '~~/server/utils/jwt';

export default defineEventHandler(async (e) => {
	const body = await readBody(e);

	const { password, username } = body;

	if (!username || !password) {
		return sendError(e, createError({ statusCode: 400, statusMessage: 'Invalid credentials.' }));
	}

	const user = await getUserByUsername(username);

	if (!user) {
		return sendError(e, createError({ statusCode: 400, statusMessage: 'Username or password is invalid.' }));
	}

	const passwordMatched = await bcrypt.compare(password, user.password);

	if (!passwordMatched) {
		return sendError(e, createError({ statusCode: 400, statusMessage: 'Username or password is invalid.' }));
	}

	const { accessToken, refreshToken } = await generateTokens(user);

	await createRefreshToken({ token: refreshToken, userId: user.id });

	sendRefreshToken(e, refreshToken);

	return { access_token: accessToken, user: userTransformer(user) };
});
