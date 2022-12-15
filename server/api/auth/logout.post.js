import { removeRefreshToken } from '~~/server/db/refreshTokens';
import { sendRefreshToken } from '~~/server/utils/jwt';

export default defineEventHandler(async (e) => {
	try {
		const { refresh_token } = parseCookies(e);

		await removeRefreshToken(refresh_token);
	} catch (error) {
		return sendError(e, createError({ statusCode: 500, statusMessage: 'Something went wrong.' }));
	}

	sendRefreshToken(e, null);

	return { message: 'Done' };
});
