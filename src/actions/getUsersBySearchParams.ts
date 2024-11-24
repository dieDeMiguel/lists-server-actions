"use server";

import { prisma } from "../lib/prisma";

export async function getUsersBySearchParams({page, search}: {page: number, search: string | undefined}) {
  if (!page) {
    throw new Error("Invalid form data");
  }

  await new Promise(resolve => {
    return setTimeout(resolve, 1500);
  });
  
  const users = await prisma.user.findMany({
    take: 6,
    skip: (page - 1) * 6,
    where: {
      name: {
        contains: search || "",
      },
    },
  });
  return users;
}
