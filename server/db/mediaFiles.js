import { prisma } from '.';

export const createMediaFile = async (data) => await prisma.mediaFile.create({ data });
