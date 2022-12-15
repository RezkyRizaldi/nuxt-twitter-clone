import { prisma } from '.';

export const createTweet = async (data) => await prisma.tweet.create({ data });

export const getTweets = async (params) => await prisma.tweet.findMany({ ...params });

export const getTweetById = async (id, params = {}) => await prisma.tweet.findUnique({ ...params, where: { ...params.where, id } });
