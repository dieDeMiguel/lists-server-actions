"use server";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const parsedData = formSchema.safeParse({ name, email });

  if (!parsedData.success) {
    throw new Error("Invalid form data");
  }

  const newUser = await prisma.user.create({
    data: parsedData.data,
  });
  revalidatePath("/");
  return newUser;
}
