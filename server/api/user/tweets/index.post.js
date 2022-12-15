import formidable from 'formidable';

import { createMediaFile } from '~~/server/db/mediaFiles';
import { createTweet } from '~~/server/db/tweets';
import { tweetTransformer } from '~~/server/transformers/tweet';
import { uploadToCloudinary } from '~~/server/utils/cloudinary';

export default defineEventHandler(async (e) => {
	const form = formidable({});

	const {
		fields: { text, replyTo },
		files,
	} = await new Promise((resolve, reject) => {
		form.parse(e.node.req, (err, fields, files) => {
			if (err) reject(err);

			resolve({ fields, files });
		});
	});

	const userId = e.context?.auth?.user?.id;
	let tweetData = { text, authorId: userId };

	if (replyTo && replyTo !== 'null' && replyTo !== 'undefined') tweetData.replyToId = replyTo;

	const tweet = await createTweet(tweetData);

	const filePromises = Object.keys(files).map(async (key) => {
		const { filepath } = files[key];

		const { secure_url, public_id } = await uploadToCloudinary(filepath);

		return createMediaFile({
			url: secure_url,
			providerPublicId: public_id,
			userId,
			tweetId: tweet.id,
		});
	});

	await Promise.all(filePromises);

	return { tweet: tweetTransformer(tweet) };
});
