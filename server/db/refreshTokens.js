import { prisma } from '.';

export const createRefreshToken = async (data) => await prisma.refreshToken.create({ data });

export const getRefreshToken = async (token) => await prisma.refreshToken.findUnique({ where: { token } });

export const removeRefreshToken = async (token) => await prisma.refreshToken.delete({ where: { token } });
