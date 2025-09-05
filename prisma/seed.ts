import { PrismaClient, Prisma } from "../app/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function main() {
  // Buat dua user
  const alice = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@chat.io",
      password: await hashPassword("password"),
    },
  });
  
  const bob = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@chat.io",
      password: await hashPassword("password"),
    },
  });

  // Buat pesan dari Alice ke Bob
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
        receiver_id: bob.id,
        content: "Aku juga baik. Lagi ngoding nih.",
        timestamp: new Date(),
      },
    ],
  });

  console.log("Dummy data berhasil dibuat!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
