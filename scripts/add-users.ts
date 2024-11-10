import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
faker.seed(123);

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database");
    for (let i = 0; i < 1000; i++) {
      const firstname = faker.person.firstName();
      const lastname = faker.person.lastName();
      await prisma.user.create({
        data: {
          name: `${firstname} ${lastname}`,
          email: faker.internet.email({ firstName: firstname, lastName: lastname }),
        },
      });
    }
    console.log("Users added successfully");
  } catch (error) {
    console.error("Error adding users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
