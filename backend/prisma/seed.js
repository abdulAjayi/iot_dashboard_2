import bcrypt from "bcryptjs";
import { prisma } from "./lib/prismaClient.js";

async function main() {
  const hashedPassword = await bcrypt.hash("ikeja_admin", 10);

  await prisma.user.create({
    data: {
      username: "ikeja_admin",
      password: hashedPassword,
      role: "admin",
      isActive: true,
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
