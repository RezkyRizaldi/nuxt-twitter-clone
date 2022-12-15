import jwt from 'jsonwebtoken';

const generateAccessToken = async ({ id }) => {
	const config = useRuntimeConfig();

	return await jwt.sign({ userId: id }, config.jwtAccessSecret, { expiresIn: '10m' });
};

const generateRefreshToken = async ({ id }) => {
	const config = useRuntimeConfig();

	return await jwt.sign({ userId: id }, config.jwtRefreshSecret, { expiresIn: '4h' });
};

export const decodeRefreshToken = async (token) => {
	const config = useRuntimeConfig();

	try {
		return await jwt.verify(token, config.jwtRefreshSecret);
	} catch (error) {
		console.error(error);
	}
};

export const decodeAccessToken = async (token) => {
	const config = useRuntimeConfig();

	try {
		return await jwt.verify(token, config.jwtAccessSecret);
	} catch (error) {
		console.error(error);
	}
};

export const generateTokens = async (user) => {
	const accessToken = await generateAccessToken(user);
	const refreshToken = await generateRefreshToken(user);

	return { accessToken, refreshToken };
};

export const sendRefreshToken = (e, token) => setCookie(e, 'refresh_token', token, { httpOnly: true, sameSite: true });
