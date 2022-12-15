import bcrypt from 'bcrypt';

import { prisma } from '.';

export const createUser = async (data) => {
	const userData = { ...data, password: bcrypt.hashSync(data.password, 10) };

	return await prisma.user.create({ data: userData });
};

export const getUserByUsername = async (username) => await prisma.user.findUnique({ where: { username } });

export const getUserById = async (id) => await prisma.user.findUnique({ where: { id } });
