export const userTransformer = ({ id, name, email, username, profileImage }) => ({
	id,
	name,
	email,
	username,
	profileImage,
	handle: `@${username}`,
});
