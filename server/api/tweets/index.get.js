import { getTweets } from '~~/server/db/tweets';
import { tweetTransformer } from '~~/server/transformers/tweet';

export default defineEventHandler(async (e) => {
	const { q } = getQuery(e);

	let prismaQuery = {
		include: {
			author: true,
			mediaFiles: true,
			replies: { include: { author: true } },
			replyTo: { include: { author: true } },
		},
		orderBy: [{ createdAt: 'desc' }],
	};

	if (!!q) {
		prismaQuery = {
			...prismaQuery,
			where: { text: { contains: q } },
		};
	}

	const tweets = await getTweets(prismaQuery);

	return { tweets: tweets.map(tweetTransformer) };
});
