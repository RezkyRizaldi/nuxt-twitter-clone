import human from 'human-time';

import { mediaFileTransformer } from './mediaFiles';
import { userTransformer } from './user';

export const tweetTransformer = ({ id, text, createdAt, mediaFiles, author, replies, replyTo }) => ({
	id,
	text,
	mediaFiles: !!mediaFiles ? mediaFiles.map(mediaFileTransformer) : [],
	author: !!author ? userTransformer(author) : null,
	replies: !!replies ? replies.map(tweetTransformer) : [],
	replyTo: !!replyTo ? tweetTransformer(replyTo) : null,
	repliesCount: !!replies ? replies.length : 0,
	postedAtHuman: human(createdAt),
});
