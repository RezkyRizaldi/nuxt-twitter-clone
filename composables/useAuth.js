import jwt_decode from 'jwt-decode';

import useFetchAPI from './useFetchAPI';

export default () => {
	const useAuthToken = () => useState('auth_token');
	const useAuthUser = () => useState('auth_user');
	const useAuthLoading = () => useState('auth_loading', () => true);

	const setToken = (token) => {
		const authToken = useAuthToken();

		authToken.value = token;
	};

	const setUser = (user) => {
		const authUser = useAuthUser();

		authUser.value = user;
	};

	const setIsLoading = (value) => {
		const authLoading = useAuthLoading();

		authLoading.value = value;
	};

	const login = ({ username, password }) =>
		new Promise(async (resolve, reject) => {
			try {
				const { access_token, user } = await $fetch('/api/auth/login', {
					method: 'POST',
					body: { username, password },
				});

				setToken(access_token);
				setUser(user);
				resolve(true);
			} catch (error) {
				reject(error);
			}
		});

	const refreshToken = () =>
		new Promise(async (resolve, reject) => {
			try {
				const { access_token } = await $fetch('/api/auth/refresh');

				setToken(access_token);
				resolve(true);
			} catch (error) {
				reject(error);
			}
		});

	const getUser = () =>
		new Promise(async (resolve, reject) => {
			try {
				const { user } = await useFetchAPI('/api/auth/user');

				setUser(user);
				resolve(true);
			} catch (error) {
				reject(error);
			}
		});

	const reRefreshAccessToken = () => {
		const authToken = useAuthToken();

		if (!authToken.value) return;

		const jwt = jwt_decode(authToken.value);

		const refreshTime = jwt.exp - 60000;

		setTimeout(async () => {
			await refreshToken();
			reRefreshAccessToken();
		}, refreshTime);
	};

	const initAuth = () =>
		new Promise(async (resolve, reject) => {
			setIsLoading(true);

			try {
				await refreshToken();
				await getUser();
				reRefreshAccessToken();
				resolve(true);
			} catch (error) {
				reject(error);
			} finally {
				setIsLoading(false);
			}
		});

	const logout = () =>
		new Promise(async (resolve, reject) => {
			try {
				await useFetchAPI('/api/auth/logout', { method: 'POST' });
				setToken(null);
				setUser(null);
				resolve();
			} catch (error) {
				reject(error);
			}
		});

	return {
		initAuth,
		login,
		logout,
		useAuthLoading,
		useAuthToken,
		useAuthUser,
	};
};
