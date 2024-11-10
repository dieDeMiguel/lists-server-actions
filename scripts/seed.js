import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
faker.seed(123);

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database");

    const users = [];

    for (let i = 0; i < 1000; i++) {
      const firstname = faker.person.firstName();
      const lastname = faker.person.lastName();
      const email = faker.internet.email({ firstName: firstname, lastName: lastname });

      users.push({
        name: `${firstname} ${lastname}`,
        email,
      });
    }

    const createdUsers = await prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    });

    console.log(`${createdUsers.count} users created successfully`);
  } catch (error) {
    console.error("Error creating users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
