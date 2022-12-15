import URLPattern from 'url-pattern';

import { getUserById } from '~~/server/db/users';
import { decodeAccessToken } from '~~/server/utils/jwt';

export default defineEventHandler(async (e) => {
	const endpoints = ['/api/auth/user', '/api/user/tweets', '/api/tweets', '/api/tweets/:id'];
	const isHandled = endpoints.some((endpoint) => {
		const pattern = new URLPattern(endpoint);

		return pattern.match(e.node.req.url);
	});

	if (!isHandled) return;

	const token = e.node.req.headers['authorization']?.split(' ')[1];

	if (!token) {
		return sendError(e, createError({ statusCode: 401, statusMessage: 'Unauthorized.' }));
	}

	const { userId } = await decodeAccessToken(token);

	if (!userId) {
		return sendError(e, createError({ statusCode: 401, statusMessage: 'Unauthorized.' }));
	}

	try {
		const user = await getUserById(userId);

		if (!user) {
			return sendError(e, createError({ statusCode: 404, statusMessage: 'User not found.' }));
		}

		e.context.auth = { user };
	} catch (error) {
		return sendError(e, createError({ statusCode: 404, statusMessage: error.message }));
	}
});
