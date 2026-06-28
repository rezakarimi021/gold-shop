import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const db = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  const adminPassword = await bcrypt.hash("admin123456", 12);
  const customerPassword = await bcrypt.hash("customer123456", 12);

  const admin = await db.user.upsert({
    where: { email: "admin@goldshop.ir" },
    update: {},
    create: {
      name: "مدیر سیستم",
      email: "admin@goldshop.ir",
      phone: "09120000001",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  });

  const customer = await db.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      name: "علی رضایی",
      email: "test@example.com",
      phone: "09121234567",
      passwordHash: customerPassword,
      role: "CUSTOMER",
    },
  });

  console.log(`✅ Admin user: ${admin.email}`);
  console.log(`✅ Test customer: ${customer.email}`);
  console.log("\n📋 Test credentials:");
  console.log("   Admin    → admin@goldshop.ir  / admin123456");
  console.log("   Customer → test@example.com   / customer123456");
  console.log("\n🎉 Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
    await pool.end();
  });
