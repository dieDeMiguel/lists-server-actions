"use server";
import { prisma } from "../lib/prisma";

export async function getUserById({id}: {id: string}) {
  const numericId = parseInt(id);

  if (!numericId) {
    throw new Error("Invalid form data");
  }

  const user = await prisma.user.findUnique({
    where: { id: numericId },
  });

  return user;
}
