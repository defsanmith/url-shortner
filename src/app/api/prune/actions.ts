"use server";

import { generateShortHash } from "@/lib/generateHash";
import prisma from "@/lib/prisma";

export async function createShortURL(url: string) {
  const shortHash = generateShortHash();

  return prisma.url.create({
    data: {
      url: url,
      slug: shortHash,
    },
  });
}

export const getShortURL = async (slug: string) => {
  return prisma.url.findFirst({ where: { slug } });
};
