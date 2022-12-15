import { getRefreshToken } from '~~/server/db/refreshTokens';
import { getUserById } from '~~/server/db/users';
import { decodeRefreshToken, generateTokens } from '~~/server/utils/jwt';

export default defineEventHandler(async (e) => {
	const { refresh_token } = parseCookies(e);

	if (!refresh_token) {
		return sendError(e, createError({ statusCode: 401, statusMessage: 'Invalid refresh token.' }));
	}

	await getRefreshToken(refresh_token).catch(() => sendError(e, createError({ statusCode: 401, statusMessage: 'Invalid refresh token.' })));

	const token = await decodeRefreshToken(refresh_token).catch(() => sendError(e, createError({ statusCode: 401, statusMessage: 'Invalid refresh token.' })));

	try {
		const user = await getUserById(token?.userId).catch(() => sendError(e, createError({ statusCode: 404, statusMessage: 'User not found.' })));

		const { accessToken } = await generateTokens(user);

		return { access_token: accessToken };
	} catch (error) {
		return sendError(e, createError({ statusCode: 500, statusMessage: error.message }));
	}
});
