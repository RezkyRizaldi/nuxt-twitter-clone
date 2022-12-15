export default () => {
	const usePostTweetModal = () => useState('post_tweet_modal', () => false);
	const useReplyTweet = () => useState('reply_tweet', () => null);

	const setReplyTo = (tweet) => {
		const replyTweet = useReplyTweet();

		replyTweet.value = tweet;
	};

	const openPostTweetModal = (tweet = null) => {
		const postTweetModal = usePostTweetModal();

		postTweetModal.value = true;

		setReplyTo(tweet);
	};

	const closePostTweetModal = () => {
		const postTweetModal = usePostTweetModal();

		postTweetModal.value = false;
	};

	const postTweet = ({ text, mediaFiles, replyTo }) => {
		const form = new FormData();

		form.append('text', text);
		form.append('replyTo', replyTo);

		mediaFiles.forEach((file, i) => {
			form.append(`media_file_${i}`, file);
		});

		return useFetchAPI('/api/user/tweets', { method: 'POST', body: form });
	};

	const getTweets = (params = {}) =>
		new Promise(async (resolve, reject) => {
			try {
				const res = await useFetchAPI('/api/tweets', { method: 'GET', params });

				resolve(res);
			} catch (error) {
				reject(error);
			}
		});

	const getTweetById = (id) =>
		new Promise(async (resolve, reject) => {
			try {
				const res = await useFetchAPI(`/api/tweets/${id}`, { method: 'GET' });

				resolve(res);
			} catch (error) {
				reject(error);
			}
		});

	return {
		closePostTweetModal,
		getTweetById,
		getTweets,
		openPostTweetModal,
		postTweet,
		usePostTweetModal,
		useReplyTweet,
	};
};
