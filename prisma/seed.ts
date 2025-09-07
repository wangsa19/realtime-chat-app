import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function main() {
  console.log("Start seeding ...");

  const alice = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@chat.io",
      phoneNumber: "081000000001",
      password: await hashPassword("password"),
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@chat.io",
      phoneNumber: "081000000002",
      password: await hashPassword("password"),
    },
  });

  const charlie = await prisma.user.create({
    data: {
      name: "Charlie",
      email: "charlie@chat.io",
      phoneNumber: "081000000003",
      password: await hashPassword("password"),
    },
  });

  const david = await prisma.user.create({
    data: {
      name: "David",
      email: "david@chat.io",
      phoneNumber: "081000000004",
      password: await hashPassword("password"),
    },
  });

  const eve = await prisma.user.create({
    data: {
      name: "Eve",
      email: "eve@chat.io",
      phoneNumber: "081000000005",
      password: await hashPassword("password"),
    },
  });

  console.log("Created 5 users");

  await prisma.contact.createMany({
    data: [
      { requesterId: alice.id, addresseeId: bob.id },

      { requesterId: alice.id, addresseeId: charlie.id },

      { requesterId: david.id, addresseeId: eve.id },
    ],
  });

  console.log("Created contact relationships");

  await prisma.messages.createMany({
    data: [
      {
        sender_id: alice.id,
        receiver_id: bob.id,
        content: "Hai Bob, apa kabar?",
        timestamp: new Date(),
      },
      {
        sender_id: bob.id,
        receiver_id: alice.id,
        content: "Halo Alice! Aku baik, kamu gimana?",
        timestamp: new Date(),
      },
      {
        sender_id: alice.id,
        receiver_id: charlie.id,
        content: "Charlie, jangan lupa meeting jam 3 ya.",
        timestamp: new Date(),
      },
      {
        sender_id: david.id,
        receiver_id: eve.id,
        content: "Eve, project kita gimana progressnya?",
        timestamp: new Date(),
      },
    ],
  });

  console.log("Created dummy messages");
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
